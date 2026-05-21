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
import { ChucDanhService } from '../chuc-danh.service';
import { ComponentService } from 'src/app/shared/services/component.service';
import { ChucDanhCreateComponent } from '../chuc-danh-create/chuc-danh-create.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-chuc-danh',
  templateUrl: './chuc-danh.component.html',
  styleUrls: ['./chuc-danh.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChucDanhComponent implements OnInit {

  constructor(
    public constant: Constants,
    private chucDanhService: ChucDanhService,
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
  searchModel: any = {};

  user: any;
  userId: string;
  userType: number;
  keyCaheSearch: string;

  listChucDanh: any[] = [];

  ngOnInit(): void {
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

    this.searchGlobalService.onDataChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
      if (data) {
        this.searchModel.pageNumber = data.pageNumber;
        this.searchModel.tenChucDanh = data.tenChucDanh;
        this.searchModel.idDonVi = data.idDonVi;
        this.searchModel.idPhongBan = data.idPhongBan;
        this.searchChucDanh();
        localStorage.setItem(this.keyCaheSearch, JSON.stringify(this.searchModel));
      }
    });

    this.searchGlobalService.onRefreshData.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
      if (data) {
        this.clearData();
      }
    });

    this.clearData();
    this.setToolbarConfig();
    this.searchChucDanh();

  }

  searchChucDanh() {
    this.chucDanhService.searchChucDanh(this.searchModel).subscribe(
      (data: any) => {
        setTimeout(() => {
          if (data.isStatus) {
            this.startIndex = ((this.searchModel.pageNumber - 1) * this.searchModel.pageSize + 1);
            this.listChucDanh = data.data.result.dataResults;
            this.searchModel.totalItems = data.data.result.totalItems;
          }
        }, 200);
      }
    );
  }

  showCreateUpdate(id: string, type: any) {
    let activeModal = this.modalService.open(ChucDanhCreateComponent, { container: 'body', windowClass: 'chuc-danh-create', backdrop: 'static' })
    activeModal.componentInstance.id = id;
    activeModal.result.then((result) => {
      if (result) {
        this.searchChucDanh();
      }
      this.searchChucDanh();
    }, (reason) => {
    });
  }

  showConfirmDelete(id: string, type: any) {
    this.messageService.showConfirm("Bạn có muốn xoá chức danh này không?").then(
      (data) => {
        this.deleteChucDanh(id);
      },
      (error) => { }
    );
  }

  deleteChucDanh(id: string) {
    this.chucDanhService.deleteChucDanh(id).subscribe(
      data => {
        if (data.isStatus) {
          this.messageService.showSuccess('Xóa chức danh thành công!');
          this.searchChucDanh();
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
        FieldContentName: 'tenChucDanh',
        Placeholder: 'Tìm kiếm tên chức danh',
        Items: [
          // {
          //   FieldName: 'tenChucDanh',
          //   Name: 'Tên chức danh ',
          //   Type: 'text',
          //   Placeholder: 'Tên chức danh '
          // },
          {
            FieldName: 'idDonVi',
            Name: 'Đơn vị',
            Type: 'ngselect',
            Placeholder: 'Chọn đơn vị',
            DisplayName: 'name',
            ValueName: 'id',
            IsRelation: true,
            RelationIndexTo: 1,
            GetData: (): Observable<any> => {
              return this.comboboxService.getDonVi();
            }
          },
          {
            FieldName: 'idPhongBan',
            Name: 'Phòng ban',
            Type: 'ngselect',
            Placeholder: 'Chọn phòng ban',
            DisplayName: 'name',
            ValueName: 'id',
            RelationIndexFrom: 0,
            GetData: (donVi: any): Observable<any> => {
              if (!donVi) {
                return of([]);
              }
              return this.comboboxService.getPhongBanByIdDonVi(donVi);
            }
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
  showView(id: string) {
    // this.router.navigate(['/chuc-danh/view/' + id + '/' + 'view']);
    let activeModal = this.modalService.open(ChucDanhCreateComponent, { container: 'body', windowClass: 'chuc-danh-create', backdrop: 'static' })
    activeModal.componentInstance.id = id;
    activeModal.componentInstance.isView = true;
    activeModal.result.then((result) => {
      this.searchChucDanh();
    }, (reason) => { });
  }
}
