import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MessageService, Constants, FileProcess, Configuration, ComboboxService } from 'src/app/shared';
import { SearchGlobalService } from 'src/app/shared/common/search-global.service';
import { MenuOptions } from 'src/app/shared/models';
import { LanguageService } from 'src/app/shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NhanVienService } from '../service/nhan-vien.service';

@Component({
  selector: 'app-nhan-vien-manager',
  templateUrl: './nhan-vien-manager.component.html',
  styleUrls: ['./nhan-vien-manager.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NhanVienManagerComponent implements OnInit {

  constructor(
    private messageService: MessageService,
    public fileProcess: FileProcess,
    private service: NhanVienService,
    public constant: Constants,
    private searchGlobalService: SearchGlobalService,
    private translate: TranslateService,
    private lgService: LanguageService,
    private router: Router,
    private config: Configuration,
    private comboboxService: ComboboxService
  ) {
    this._unsubscribeAll = new Subject();
    this.translate.use(this.lgService.getLanguage());
  }

  _unsubscribeAll: Subject<any>;
  searchModel: any;
  height = 0;
  listNhanVien: any[] = [];
  totalItems: 0;

  ngOnInit(): void {
    this.height = window.innerHeight - 380;
    this.fileProcess.FileDataBase = null;
    //Hứng sự kiện thay đổi ngôn ngữ để load lại Component
    this.lgService.onLanguageChanged.pipe().subscribe(languageCode => {
      if (languageCode) {
        this.translate.use(languageCode);
      }
    });
    //Khởi tạo model search
    this.initModelSearch();
    this.searchGlobalService.onDataChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
      if (data) {
        this.searchModel.pageNumber = data.pageNumber;
        this.searchModel.tenNhanVien = data.tenNhanVien;
        this.searchModel.idDonVi = data.idDonVi
        this.searchModel.idPhongBan = data.idPhongBan
        this.searchModel.idChucDanh = data.idChucDanh
        this.search();
      }
    });

    this.searchGlobalService.onRefreshData.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
      if (data) {
        this.clearData();
      }
    });

    this.setToolbarConfig();
  }

  //Khởi tạo model tìm kiếm
  initModelSearch() {
    this.searchModel = {
      pageSize: 10,
      pageNumber: 1,
      orderBy: '',
      orderType: '',
      id: '',
      tenNhanVien: '',
      maNhanVien: '',
      email: '',
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.searchGlobalService.setConfig(null);
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();

  }
  setToolbarConfig() {
    let meuOptions: MenuOptions = {
      isExcel: false,
      isPDF: false,
      isSearch: true,
      searchModel: this.searchModel,
      searchOptions: {
        FieldContentName: 'tenNhanVien',
        Placeholder: 'Tìm kiếm theo tên/ mã nhân viên',
        Items: [
          // {
          //   FieldName: 'idDonVi',
          //   Name: 'Đơn vị',
          //   Type: 'ngselect',
          //   DisplayName: 'name',
          //   ValueName: 'id',
          //   GetData: (): Observable<any> => {
          //     return this.comboboxService.getDonVi();
          //   }
          // },
          // {
          //   FieldName: 'idPhongBan',
          //   Name: 'Phòng ban',
          //   Type: 'ngselect',
          //   DisplayName: 'name',
          //   ValueName: 'id',
          //   GetData: (): Observable<any> => {
          //     return this.comboboxService.getPhongBan();
          //   }
          // },
          // {
          //   FieldName: 'idChucDanh',
          //   Name: 'Chức danh',
          //   Type: 'ngselect',
          //   DisplayName: 'name',
          //   ValueName: 'id',
          //   GetData: (): Observable<any> => {
          //     return this.comboboxService.getChucDanh();
          //   }
          // },
        ]
      }
    };
    this.searchGlobalService.setConfig(meuOptions);
  }
  startIndex = 0;
  clickOrderBy(orderBy: any) {
    this.searchModel.orderBy = orderBy;
    if (this.searchModel.orderType == "ASC") {
      this.searchModel.orderType = "DESC";
    } else {
      this.searchModel.orderType = "ASC";
    }
    this.search();
  }
  search() {
    this.service.searchNhanVien(this.searchModel).subscribe((data: any) => {
      if (data.isStatus) {
        this.startIndex = ((this.searchModel.pageNumber - 1) * this.searchModel.pageSize + 1);
        this.listNhanVien = data.data.result.dataResults;
        this.totalItems = data.data.result.totalItems;
      }
    }, error => {
      this.messageService.showError("Có lỗi xảy ra!");
    });
  }
  clearData() {
    //Khởi tạo model tìm kiếm
    this.initModelSearch();
    this.setToolbarConfig();
  }

  showConfirmDelete(id: string, maNhanVien: string) {
    this.messageService.showConfirm("Bạn có chắc muốn xoá nhân viên này không?").then(
      data => {
        this.delete(id, maNhanVien);

      }
    );
  }

  delete(id: string, maNhanVien: string) {
    this.service.deleteNhanVien(id).subscribe(
      data => {
        if (data.isStatus) {
          this.messageService.showSuccess('Xóa nhân viên thành công!');

          this.search();
          this.delete_file(maNhanVien);

        }
      },
      error => {
        this.messageService.showError(error);
      });
  }

  delete_file(id: string) {
    this.service.delete_video(id).subscribe(
      data => {
        if (data.isStatus) {
          this.messageService.showSuccess('Xóa video thành công!');
        }
      },
      error => {
        this.messageService.showError(error);
      });
  }

  showCreateUpdate(id: string) {
    if (id) {
      this.router.navigate(['/nhan-vien/manage/chinh-sua/' + id]);
    } else {
      this.router.navigate(['/nhan-vien/manage/them-moi']);
    }
  }

  showView(id: string) {
    this.router.navigate(['/nhan-vien/manage/view/' + id + '/' + 1]);
  }
  addVideo(id: string, maNhanVien: string) {
    this.checkGuongMatCuaNhanVien(id, maNhanVien);


  }


  checkGuongMatCuaNhanVien(id: string, maNhanVien: string) {
    this.service.checkEmployee(maNhanVien).subscribe(
      data => {
        if (data.exists) {
          this.messageService.showSuccess('Nhân viên này đã có gương mặt trong hệ thống!');
          return true
        } else {
          // this.messageService.showWarning('Nhân viên này chưa có gương mặt trong hệ thống!');
          this.router.navigate(['/nhan-vien/manage/them-video/' + id]);
          return false
        }
      },
      error => {
        this.messageService.showError(error);
      });
  }

}
