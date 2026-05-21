import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Constants, MessageService, Configuration, ComboboxService } from 'src/app/shared';
import { SearchGlobalService } from 'src/app/shared/common/search-global.service';
import { MenuOptions } from 'src/app/shared/models';
import { UserService } from '../../service/user.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/services/language.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from 'src/app/cores/auth/change-password/change-password.component';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserManageComponent implements OnInit {

  constructor(
    public constant: Constants,
    private userService: UserService,
    private messageService: MessageService,
    public config: Configuration,
    private router: Router,
    private searchGlobalService: SearchGlobalService,
    private comboboxService: ComboboxService,
    private translate: TranslateService,
    private lgService: LanguageService,
    private modalService: NgbModal,
  ) {
    this._unsubscribeAll = new Subject();
    this.translate.use(this.lgService.getLanguage());
  }

  users: any[] = [];
  startIndex = 1;
  _unsubscribeAll: Subject<any>;
  searchModel: any;

  user: any;
  userId: string;
  userType: number;
  keyCacheSearch: string;

  ngOnInit(): void {
    //Hứng sự kiện thay đổi ngôn ngữ để load lại Component
    this.lgService.onLanguageChanged.pipe().subscribe(languageCode => {
      if (languageCode) {
        this.translate.use(languageCode);
      }
    });

    this.user = JSON.parse(localStorage.getItem('CurrentUser'));
    if (this.user) {
      this.userId = this.user.userId;
      // this.userType = this.user.type;
    }
    //key cache search
    this.keyCacheSearch = this.router.url + "/" + this.userId;

    //Khởi tạo model tìm kiếm
    this.initModelSearch();

    let cacheSearch = JSON.parse(localStorage.getItem(this.keyCacheSearch));
    if (cacheSearch) {
      this.searchModel = cacheSearch;
    }

    //Sét giá trị tìm kiếm và thực hiện tìm kiếm khi thao tác trên tool search
    this.searchGlobalService.onDataChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
      if (data) {
        this.searchModel.userName = data.userName;
        this.searchModel.lockoutEnabled = data.lockoutEnabled;
        this.searchModel.pageNumber = data.pageNumber;
        this.searchModel.fullName = data.fullName;
        this.search();
        localStorage.setItem(this.keyCacheSearch, JSON.stringify(this.searchModel));
      }
    });

    //Làm mới dữ liệu
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
      totalItems: 0,
      pageNumber: 1,
      userName: '',
      fullName: '',
      lockoutEnabled: 'false',
      orderBy: '',
      orderType: ''
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
        FieldContentName: 'userName',
        Placeholder: 'Tìm kiếm tên tài khoản',
        Items: [
          {
            FieldName: 'fullName',
            Name: 'Họ và tên',
            Type: 'text',
            DisplayName: 'fullName',
            Placeholder: 'Họ và tên',
            ValueName: 'fullName',
          },
          {
            FieldName: 'lockoutEnabled',
            Name: 'Tình trạng',
            Type: 'ngselect',
            DisplayName: 'Name',
            ValueName: 'Id',
            Data: this.constant.User_Status
          }
        ]
      }
    };

    this.searchGlobalService.setConfig(meuOptions);
  }

  //Click sắp xếp dữ liệu theo trường thông tin
  clickOrderBy(orderBy: any) {
    this.searchModel.orderBy = orderBy;
    if (this.searchModel.orderType == "ASC") {
      this.searchModel.orderType = "DESC";
    } else {
      this.searchModel.orderType = "ASC";
    }
    this.search();
  }

  //Tìm kiếm tài khoản
  search() {
    this.userService.searchUser(this.searchModel).subscribe(
      (data: any) => {
        this.startIndex = ((this.searchModel.pageNumber - 1) * this.searchModel.pageSize + 1);
        this.users = data.data.dataResults;
        this.searchModel.totalItems = data.data.totalItems;
      }, error => {
        this.messageService.showError(error);
      }
    );
  }

  //Show chức năng cập nhật
  showUpdate(id: string) {
    this.router.navigate(['/nguoi-dung/tai-khoan/chinh-sua/' + id]);
  }

  //Show chức nawg thêm mới
  showCreate() {
    this.router.navigate(['/nguoi-dung/tai-khoan/them-moi']);
  }

  //Show xem chi tiết
  showViewUser(id: string) {
    this.router.navigate(['/nguoi-dung/tai-khoan/xem-tai-khoan/' + id]);
  }

  //Xác nhận xóa
  showConfirmDelete(id: string) {
    this.messageService.showConfirm("Bạn có chắc muốn xoá tài khoản này không?").then(
      data => {
        this.deleteUser(id);
      }
    );
  }

  //Xóa tài khoản
  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(
      data => {
        if (data.isStatus) {
          this.messageService.showSuccess('Xóa tài khoản thành công!');
          this.search();
        }
      },
      error => {
        this.messageService.showError(error);
      });
  }

  //Xác nhận xóa
  showConfirmLockUser(id: string) {
    this.messageService.showConfirm("Bạn có chắc muốn khóa tài khoản này không?").then(
      data => {
        this.lockUser(id);
      }
    );
  }

  //Mở/Khóa tài khoản
  lockUser(id: string) {
    this.userService.userAdminLockOrUnlock(id, true).subscribe(
      data => {
        if (data.isStatus) {
          this.search();
          this.messageService.showSuccess('Khóa tài khoản thành công!');
        }
      },
      error => {
        this.messageService.showError(error);
      });
  }

  //Xác nhận mở/khóa tài khoản
  showConfirmUnLockUser(id: string) {
    this.messageService.showConfirm("Bạn có chắc muốn mở khóa tài khoản này không?").then(
      data => {
        this.unLockUser(id);
      }
    );
  }

  //Mở/khóa tài khoản
  unLockUser(id: string) {
    this.userService.userAdminLockOrUnlock(id, false).subscribe(
      data => {
        if (data.isStatus) {
          this.search();
          this.messageService.showSuccess('Mở khóa tài khoản thành công!');
        }
      },
      error => {
        this.messageService.showError(error);
      });
  }

  //Xác nhận Reset mật khẩu
  showConfirmResetPassword(id: string) {
    this.changePassword(id, true);
  }

  //Thay đổi mật khẩu
  changePassword(idChange: string, ischange: boolean) {
    let activeModal = this.modalService.open(ChangePasswordComponent, { container: 'body' });
    activeModal.componentInstance.idChange = idChange;
    activeModal.componentInstance.ischange = ischange;
    activeModal.result.then((result) => {

    }, (reason) => {

    });
  }

  //Làm mới tìm kiếm
  clearData() {
    //Khởi tạo model tìm kiếm
    this.initModelSearch();
    localStorage.removeItem(this.keyCacheSearch);
    this.setToolbarConfig();
  }
}
