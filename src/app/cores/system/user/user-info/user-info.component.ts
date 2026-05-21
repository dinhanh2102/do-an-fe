import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Constants, MessageService, FileProcess, Configuration, ComboboxService } from 'src/app/shared';
import { FileService } from 'src/app/shared/services/file.service';
import { UserService } from '../../service/user.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserInfoComponent implements OnInit {

  constructor(
    public constant: Constants,
    public config: Configuration,
    public fileProcess: FileProcess,
    private activeModal: NgbActiveModal,
    private messageService: MessageService,
    private fileService: FileService,
    private userService: UserService,
    private translate: TranslateService,
    private lgService: LanguageService
  ) { this.translate.use(this.lgService.getLanguage()); }

  modalInfo = {
    Title: '',
    SaveText: ''
  };

  //Khởi tạo  model
  model: any = {
    id: '',
    userName: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    imageLink: '',
    password: '',
    description: '',
    isChecked: false,
  }

  id: any;
  isAction: boolean = false;
  filedata = null;
  isCheck = "";

  modelDelteFile: any = {
    avatar: '',
  }
  user: any;

  ngOnInit(): void {
    //Hứng sự kiện thay đổi ngôn ngữ để load lại Component
    this.lgService.onLanguageChanged.pipe().subscribe(languageCode => {
      if (languageCode) {
        this.translate.use(languageCode);
      }
    });

    this.fileProcess.fileModel = {};
    this.fileProcess.FileDataBase = null;
    if (this.id) {
      this.modalInfo.Title = "Cập nhật thông tin";
      this.modalInfo.SaveText = 'Lưu';
      this.getUserInfo();
    }
  }

  //Chọn file
  onFileChange($event: any) {
    this.fileProcess.onAFileChange($event);

  }

  //Xác nhạn xóa file
  showComfirmDeleteFile() {
    this.messageService.showConfirm("Bạn có chắc muốn xóa ảnh này không?").then(
      data => {
        this.model.imageLink = null;
        this.filedata = null;
        this.fileProcess.fileModel = {};
        this.fileProcess.FileDataBase = null;
      }
    );
  }

  //Lây thông tin người dùng
  getUserInfo() {
    this.userService.getUserInfo(this.id).subscribe(
      result => {
        if (result.isStatus) {
          this.model = result.data;
          this.isCheck = this.model.idChucVu;

          if (result.data.avatar != null && result.data.avatar != '') {
            this.filedata = this.config.ServerApi + result.data.avatar;
          }
        }
      }, error => {
        this.messageService.showError(error);
      }
    );
  }

  update() {
    //Trường hợp không có file upload
    if (this.fileProcess.FileDataBase == null) {
      this.userService.updateUserInfo(this.id, this.model).subscribe(
        result => {
          if (result.isStatus) {
            this.messageService.showSuccess('Cập nhập tài khoản thành công!');

            this.user = JSON.parse(localStorage.getItem('CurrentUser'));
            if (this.user) {
              this.user.fullName = this.model.fullName;
              this.user.avatar = this.model.avatar;
            }
            localStorage.setItem('CurrentUser', JSON.stringify(this.user));

            this.closeModal(true);
          }
        },
        error => {
          this.messageService.showError(error);
        });
    }
    else {
      //Trường hợp có file upload
      this.fileService.uploadFile(this.fileProcess.FileDataBase, 'User/Image').subscribe(
        result => {
          //Gán lại url ảnh
          this.model.avatar = result.data.fileUrl;
          //Thực hiện cập nhật
          this.userService.updateUserInfo(this.id, this.model).subscribe(
            result => {
              if (result.isStatus) {
                this.messageService.showSuccess('Cập nhập tài khoản thành công!');

                this.user = JSON.parse(localStorage.getItem('CurrentUser'));
                if (this.user) {
                  this.user.fullName = this.model.fullName;
                  this.user.avatar = this.model.avatar;
                }
                localStorage.setItem('CurrentUser', JSON.stringify(this.user));

                this.closeModal(true);
              }
            },
            error => {
              this.messageService.showError(error);
            }
          );
        },
        error => {
          this.messageService.showError(error);
        });


    }
  }

  //Đóng modal
  closeModal(isOK: boolean) {
    this.activeModal.close(isOK ? isOK : this.isAction);
  }
}
