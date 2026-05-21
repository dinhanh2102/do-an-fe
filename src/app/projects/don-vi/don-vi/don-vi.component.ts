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
import { DonViService } from '../don-vi.service';
import { DonViCreateComponent } from '../don-vi-create/don-vi-create.component';
import { DonViUpdateComponent } from '../don-vi-update/don-vi-update.component';
import { PhongBanCreateComponent } from '../phong-ban-create/phong-ban-create.component';
@Component({
  selector: 'app-don-vi',
  templateUrl: './don-vi.component.html',
  styleUrls: ['./don-vi.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DonViComponent implements OnInit {
  @ViewChild('treegrid') public treegrid: TreeGridComponent;
  @Input() id: string;
  constructor(
    public constant: Constants,
    private donviService: DonViService,
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
  groupUser: string;
  startIndex = 1;
  _unsubscribeAll: Subject<any>;
  public contexmenuttems?: Object[];
  public toolbarOptions?: ToolbarItems[];
  public searchSettings?: SearchSettingsModel;
  searchModel: any = {
    idDonVi: '',
    objectId: ''
  };

  user: any;
  userId: string;
  userType: number;
  keyCaheSearch: string;

  listPhongBan: any[] = [];
  clickDonVi: string;
  donViList: any[] = [];

  ngOnInit(): void {
    this.groupUser = JSON.parse(localStorage.getItem('CurrentUser')).userGroupId;

    this.toolbarOptions = ['Search'];
    this.searchSettings = { fields: ['maDonVi', 'tenDonVi'] }

    //Hứng sự kiện thay đổi ngôn ngữ để load lại Component
    this.lgService.onLanguageChanged.pipe().subscribe(languageCode => {
      if (languageCode) {
        this.translate.use(languageCode);
      }
    });
    this.getGroupUser()
    
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

    this.searchGlobalService.onDataChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
      if (data) {
        this.searchModel.pageNumber = data.pageNumber;
        this.searchModel.tenPhongBan = data.tenPhongBan;
        this.searchPhongBan();
        localStorage.setItem(this.keyCaheSearch, JSON.stringify(this.searchModel));
      }
    });

    this.searchGlobalService.onRefreshData.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
      if (data) {
        this.clearData();
      }
    });

    this.setToolbarConfig();
    // this.searchPhongBan();
    this.searchDonVi();
    this.contexmenuttems = [
      { text: 'Thêm mới', iconCss: 'e-icons e-plus' },
      { text: 'Sửa', iconCss: 'e-icons e-edit' },
      { text: 'Xoá', iconCss: 'e-icons e-delete' },
    ];

  }
  groupUserInfo: any;
  getGroupUser() {
    this.comboboxService.getGroupUser(this.groupUser).subscribe(
      (data: any) => {
        this.groupUserInfo = data.data[0];
        console.log(this.groupUserInfo);
        
      },
      error => {
        this.messageService.showError(error);
      }
    );
  }
  searchPhongBan() {
    if (this.clickDonVi) {
      this.searchModel.idDonVi = this.clickDonVi;
    }
    this.donviService.searchPhongBan(this.searchModel).subscribe(
      (data: any) => {
        setTimeout(() => {
          if (data.isStatus) {
            this.startIndex = ((this.searchModel.pageNumber - 1) * this.searchModel.pageSize + 1);
            this.listPhongBan = data.data.result.dataResults;
            this.searchModel.totalItems = data.data.result.totalItems;
          }
        }, 200);
      }
    );
  }

  // nameDonVi: any;
  // donViCount: 0;
  // modelDonVi: any = {
  //   ten: '',
  // };
  searchDonVi() {
    // this.modelDonVi.ten = this.nameDonVi
    let all = { id: '', tenDonVi: 'TẤT CẢ' };
    this.donviService.searchDonVi().subscribe(
      (result: any) => {
        setTimeout(() => {
          if (result.data.result.totalItems > 0) {
            result.data.result.dataResults.unshift(all);
          }
          this.donViList = result.data.result.dataResults;
          // this.donViCount = result.data.totalItems;
          this.searchPhongBan();
        }, 200);
      }, error => {
        this.messageService.showError(error);
      }
    );
  }

  onClickDonVi(donViList) {
    var itemIdDonVi = donViList.data.id;
    if (itemIdDonVi == '') {
      this.clickDonVi = '';
      this.clearData();
      this.searchPhongBan();
    } else {
      this.clickDonVi = itemIdDonVi;
      this.searchPhongBan();
      this.searchModel.idDonVi = '';
    }
  }

  showCreateUpdate(id: string, type: any) {
    if (type == 1) {
      let activeModal = this.modalService.open(DonViCreateComponent, { container: 'body', windowClass: 'don-vi-create', backdrop: 'static' })
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.idDonVi = this.clickDonVi;
      activeModal.result.then((result) => {
        if (result) {
          this.searchDonVi();
        }
        this.searchDonVi();
      }, (reason) => {
      });
    } else if (type == 2) {
      let activeModal = this.modalService.open(DonViUpdateComponent, { container: 'body', windowClass: 'don-vi-update', backdrop: 'static' })
      activeModal.componentInstance.id = id;
      activeModal.result.then((result) => {
        if (result) {
          this.searchDonVi();
        }
        this.searchDonVi();
      }, (reason) => {
      });
    } else if (type == 3) {
      let activeModal = this.modalService.open(PhongBanCreateComponent, { container: 'body', windowClass: 'phong-ban-create', backdrop: 'static' })
      activeModal.componentInstance.id = id;
      activeModal.componentInstance.idDonVi = this.clickDonVi;
      activeModal.result.then((result) => {
        if (result) {
          this.searchDonVi();
        }
        this.searchDonVi();
      }, (reason) => {
      });
    }
  }

  showConfirmDelete(id: string, type: any) {
    if (type == 1) {
      this.messageService.showConfirm("Bạn có muốn xoá đơn vị này không?").then(
        (data) => {
          this.deleteDonVi(id);
        },
        (error) => { }
      );
    } else if (type == 2) {
      this.messageService.showConfirm("Bạn có muốn xoá phòng ban này không?").then(
        (data) => {
          this.deletePhongBan(id);
        },
        (error) => { }
      );
    }
  }

  deleteDonVi(id: string) {
    this.donviService.deleteDonVi(id).subscribe(
      data => {
        if (data.isStatus) {
          this.messageService.showSuccess('Xóa đơn vị thành công!');
          this.searchDonVi();
        }
      },
      error => {
        this.messageService.showError(error);
      });
  }

  deletePhongBan(id: string) {
    this.donviService.deletePhongBan(id).subscribe(
      data => {
        if (data.isStatus) {
          this.messageService.showSuccess('Xóa phòng ban thành công!');
          this.searchDonVi();
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
  setToolbarConfig() {
    let meuOptions: MenuOptions = {
      isExcel: false,
      isPDF: false,
      isSearch: true,
      searchModel: this.searchModel,
      searchOptions: {
        FieldContentName: 'tenPhongBan',
        Placeholder: 'Tìm kiếm tên phòng ban',
        Items: [
          {
            FieldName: 'tenPhongBan',
            Name: 'Tên phòng ban ',
            Type: 'text',
            Placeholder: 'Tên phòng ban '
          },
        ]
      }
    };
    this.searchGlobalService.setConfig(meuOptions);
  }

  clearData() {
    //Khởi tạo model tìm kiếm
    this.initModelSearch();
    localStorage.removeItem(this.keyCaheSearch);
    this.setToolbarConfig();
  }

  contextMenuClick(args: MenuEventArgs): void {
    if ((args as BeforeOpenCloseEventArgs | any).rowInfo.rowData) {
      if ((args as MenuEventArgs).element.innerHTML == "<span class=\"e-menu-icon e-icons e-edit\"></span>Sửa") {
        this.showCreateUpdate((args as MenuEventArgs | any).rowInfo.rowData.id, 2);
      } else if ((args as MenuEventArgs).element.innerHTML == "<span class=\"e-menu-icon e-icons e-delete\"></span>Xoá") {
        this.showConfirmDelete((args as MenuEventArgs | any).rowInfo.rowData.id, 1);
      } else if ((args as MenuEventArgs).element.innerHTML == "<span class=\"e-menu-icon e-icons e-plus\"></span>Thêm mới") {
        this.showCreateUpdate((args as MenuEventArgs | any).rowInfo.rowData.id, 1);
      }
    }
  }

  contextMenuOpen(args?: BeforeOpenCloseEventArgs): void {
    if (this.groupUserInfo.name == this.constant.NhanVienGroup) {
      args.cancel = true;
    }
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
    if (args.data && args.column && args.column.field && args.data.tenDonVi != 'TẤT CẢ') {
      const tooltip: Tooltip = new Tooltip({
        content: args.data[args.column.field].toString()
      }, args.cell as HTMLTableCellElement);
    }
  }

}
