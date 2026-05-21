import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Constants, MessageService, Configuration, FileProcess, ComboboxService, DateUtils } from 'src/app/shared';
import { SearchGlobalService } from 'src/app/shared/common/search-global.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/services/language.service';
import { Router } from '@angular/router';
import { BeforeOpenCloseEventArgs } from '@syncfusion/ej2-inputs';
import { ToolbarItems, SearchSettingsModel, TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { MenuEventArgs } from '@syncfusion/ej2-angular-navigations';
import { MenuOptions } from 'src/app/shared/models';
import { Observable } from 'rxjs';
import { ComponentService } from 'src/app/shared/services/component.service';
import { QueryCellInfoEventArgs } from '@syncfusion/ej2-angular-grids';
import { Tooltip } from '@syncfusion/ej2-popups';
import { PhuCapService } from '../phu-cap.service';
import { PhuCapCreateComponent } from '../phu-cap-create/phu-cap-create.component';
import { PhuCapNhanVienCreateComponent } from '../phu-cap-nhan-vien-create/phu-cap-nhan-vien-create.component';

@Component({
  selector: 'app-phu-cap',
  templateUrl: './phu-cap.component.html',
  styleUrls: ['./phu-cap.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PhuCapComponent implements OnInit {
  @ViewChild('treegrid') public treegrid: TreeGridComponent;
  @Input() id: string;
  constructor(
    public constant: Constants,
    private service: PhuCapService,
    private messageService: MessageService,
    public config: Configuration,
    private router: Router,
    private searchGlobalService: SearchGlobalService,
    private comboboxService: ComboboxService,
    private translate: TranslateService,
    private lgService: LanguageService,
    private modalService: NgbModal,
    private serviceComponet: ComponentService,
  ) {
    this._unsubscribeAll = new Subject();
    this.translate.use(this.lgService.getLanguage());
  }

  startIndex = 1;
  _unsubscribeAll: Subject<any>;
  public contexmenuttems?: Object[];
  public toolbarOptions?: ToolbarItems[];
  public searchSettings?: SearchSettingsModel;
  searchModel: any = {
    idPhuCap: '',
    objectId: ''
  };

  user: any;
  userId: string;
  userType: number;
  keyCaheSearch: string;

  listPhuCapNhanVien: any[] = [];
  clickPhuCap: string;
  phuCapList: any[] = [];

  ngOnInit(): void {
    this.toolbarOptions = ['Search'];
    this.searchSettings = { fields: ['name'] }

    //Hứng sự kiện thay đổi ngôn ngữ để load lại Component
    this.lgService.onLanguageChanged.pipe().subscribe(languageCode => {
      if (languageCode) {
        this.translate.use(languageCode);
      }
    });

    this.user = JSON.parse(localStorage.getItem('BKContech_CurrentUser'));
    if (this.user) {
      this.userId = this.user.userId;
      // this.userType = this.user.type;
    }
    //key cache search
    this.keyCaheSearch = this.router.url + "/" + this.userId;

    //Khởi tạo model tìm kiếm
    this.initModelSearch();

    let cacheSearch = JSON.parse(localStorage.getItem(this.keyCaheSearch));
    if (cacheSearch) {
      this.searchModel = cacheSearch;
    }

    // this.searchGlobalService.onDataChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
    //   if (data) {
    //     this.searchModel.pageNumber = data.pageNumber;
    //     this.searchModel.nameNhanVien = data.nameNhanVien;
    //     this.searchPhuCapNhanVien();
    //     localStorage.setItem(this.keyCaheSearch, JSON.stringify(this.searchModel));
    //   }
    // });

    this.searchGlobalService.onRefreshData.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
      if (data) {
        this.clearData();
      }
    });

    // this.setToolbarConfig();
    // this.searchPhuCapNhanVien();
    this.searchPhuCap();
    this.contexmenuttems = [
      { text: 'Thêm mới', iconCss: 'e-icons e-plus' },
      { text: 'Sửa', iconCss: 'e-icons e-edit' },
      { text: 'Xoá', iconCss: 'e-icons e-delete' },
    ];

  }

  searchPhuCapNhanVien() {
    if (this.clickPhuCap) {
      this.searchModel.idPhuCap = this.clickPhuCap;
    }
    this.service.searchPhuCapNhanVien(this.searchModel).subscribe(
      (data: any) => {
        setTimeout(() => {
          if (data.isStatus) {
            this.startIndex = ((this.searchModel.pageNumber - 1) * this.searchModel.pageSize + 1);
            this.listPhuCapNhanVien = data.data.result.dataResults;
            this.listPhuCapNhanVien.forEach(e => {
              e.tenViTri = e.viTri.join(", ");
            })
            this.searchModel.totalItems = data.data.result.totalItems;
          }
        }, 200);
      }
    );
  }

  searchPhuCap() {
    let all = { id: '', name: 'TẤT CẢ' };
    this.service.searchPhuCap().subscribe(
      (result: any) => {
        setTimeout(() => {
          if (result.data.result.totalItems > 0) {
            result.data.result.dataResults.unshift(all);
          }
          this.phuCapList = result.data.result.dataResults;
          this.searchPhuCapNhanVien();
        }, 200);
      }, error => {
        this.messageService.showError(error);
      }
    );
  }

  onClickPhuCap(phuCapList) {
    var itemIdPhuCap = phuCapList.data.id;
    if (itemIdPhuCap == '') {
      this.clickPhuCap = '';
      this.clearData();
      this.searchPhuCapNhanVien();
    } else {
      this.clickPhuCap = itemIdPhuCap;
      this.searchPhuCapNhanVien();
      this.searchModel.idPhuCap = '';
    }
  }

  showCreateUpdate(id: string, type: any) {
    if (type == 1) {
      let activeModal = this.modalService.open(PhuCapCreateComponent, { container: 'body', windowClass: 'phu-cap-create', backdrop: 'static' })
      activeModal.componentInstance.id = id;
      // activeModal.componentInstance.idPhuCap = this.clickPhuCap;
      activeModal.result.then((result) => {
        if (result) {
          this.searchPhuCap();
        }
        this.searchPhuCap();
      }, (reason) => {
      });
      // } else if (type == 2) {
      //   let activeModal = this.modalService.open(PhuCapUpdateComponent, { container: 'body', windowClass: 'phu-cap-update', backdrop: 'static' })
      //   activeModal.componentInstance.id = id;
      //   activeModal.result.then((result) => {
      //     if (result) {
      //       this.searchPhuCap();
      //     }
      //     this.searchPhuCap();
      //   }, (reason) => {
      //   });
    } else if (type == 3) {
      let activeModal = this.modalService.open(PhuCapNhanVienCreateComponent, { container: 'body', windowClass: 'phu-cap-nhan-vien-create', backdrop: 'static' })
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.idPhuCap = this.clickPhuCap;
      activeModal.result.then((result) => {
        if (result) {
          this.searchPhuCap();
        }
        this.searchPhuCap();
      }, (reason) => {
      });
    }
  }

  showConfirmDelete(id: string, type: any) {
    if (type == 1) {
      this.messageService.showConfirm("Bạn có muốn xoá phụ cấp này không?").then(
        (data) => {
          this.deletePhuCap(id);
        },
        (error) => { }
      );
    } else if (type == 2) {
      this.messageService.showConfirm("Bạn có muốn xoá phụ cấp nhân viên này không?").then(
        (data) => {
          this.deletePhuCapNhanVien(id);
        },
        (error) => { }
      );
    }
  }

  deletePhuCap(id: string) {
    this.service.deletePhuCap(id).subscribe(
      data => {
        if (data.isStatus) {
          this.messageService.showSuccess('Xóa phụ cấp thành công!');
          this.searchPhuCap();
        }
      },
      error => {
        this.messageService.showError(error);
      });
  }

  deletePhuCapNhanVien(id: string) {
    this.service.deletePhuCapNhanVien(id).subscribe(
      data => {
        if (data.isStatus) {
          this.messageService.showSuccess('Xóa phụ cấp nhân viên thành công!');
          this.searchPhuCap();
        }
      },
      error => {
        this.messageService.showError(error);
      });
  }


  //Khởi tạo model tìm kiếm
  initModelSearch() {
    this.searchModel = {
      pageSize: 10,
      totalItems: 0,
      pageNumber: 1,
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.searchGlobalService.setConfig(null);
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  //cấu hình khởi tạo trình tìm kiếm
  // setToolbarConfig() {
  //   let meuOptions: MenuOptions = {
  //     isExcel: false,
  //     isPDF: false,
  //     isSearch: true,
  //     searchModel: this.searchModel,
  //     searchOptions: {
  //       FieldContentName: 'nameNhanVien',
  //       Placeholder: 'Tìm kiếm tên phụ cấp nhân viên',
  //       Items: [
  //         {
  //           FieldName: 'nameNhanVien',
  //           Name: 'Tên phụ cấp nhân viên ',
  //           Type: 'text',
  //           Placeholder: 'Tên phụ cấp nhân viên '
  //         },
  //       ]
  //     }
  //   };
  //   this.searchGlobalService.setConfig(meuOptions);
  // }

  clearData() {
    //Khởi tạo model tìm kiếm
    this.initModelSearch();
    localStorage.removeItem(this.keyCaheSearch);
    // this.setToolbarConfig();
  }

  contextMenuClick(args: MenuEventArgs): void {
    if ((args as BeforeOpenCloseEventArgs | any).rowInfo.rowData) {
      if ((args as MenuEventArgs).element.innerHTML == "<span class=\"e-menu-icon e-icons e-edit\"></span>Sửa") {
        this.showCreateUpdate((args as MenuEventArgs | any).rowInfo.rowData.id, 1);
      } else if ((args as MenuEventArgs).element.innerHTML == "<span class=\"e-menu-icon e-icons e-delete\"></span>Xoá") {
        this.showConfirmDelete((args as MenuEventArgs | any).rowInfo.rowData.id, 1);
      } else if ((args as MenuEventArgs).element.innerHTML == "<span class=\"e-menu-icon e-icons e-plus\"></span>Thêm mới") {
        this.showCreateUpdate('', 1);
      }
    }
  }

  contextMenuOpen(args?: BeforeOpenCloseEventArgs): void {
    if ((args as BeforeOpenCloseEventArgs | any).rowInfo.rowData) {
      if ((args as BeforeOpenCloseEventArgs | any).rowInfo.rowData.id == '') {
        (this.treegrid as TreeGridComponent).grid.contextMenuModule.contextMenu.enableItems(['Sửa'], false);
        (this.treegrid as TreeGridComponent).grid.contextMenuModule.contextMenu.enableItems(['Xoá'], false);
        (this.treegrid as TreeGridComponent).grid.contextMenuModule.contextMenu.enableItems(['Thêm mới'], true);
      } else {
        (this.treegrid as TreeGridComponent).grid.contextMenuModule.contextMenu.enableItems(['Sửa'], true);
        (this.treegrid as TreeGridComponent).grid.contextMenuModule.contextMenu.enableItems(['Xoá'], true);
        (this.treegrid as TreeGridComponent).grid.contextMenuModule.contextMenu.enableItems(['Thêm mới'], true);
      }
    }
  }

  tooltip(args: QueryCellInfoEventArgs | any) {
    if (args.data && args.column && args.column.field && args.data.name != 'TẤT CẢ') {
      const tooltip: Tooltip = new Tooltip({
        content: args.data[args.column.field].toString()
      }, args.cell as HTMLTableCellElement);
    }
  }
}
