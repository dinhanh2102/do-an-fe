import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FileProcess, AppSetting, MessageService, Constants, Configuration, DateUtils } from 'src/app/shared';
import { ComboboxService } from 'src/app/shared/services/combobox.service';
import { FileService } from 'src/app/shared/services/file.service';
import { UserService } from '../../service/user.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserCreateComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('grid')
  public grid!: TreeGridComponent;
  username: FormControl;
  password: FormControl;
  confirmationPassword: FormControl;
  constructor(
    public fileProcess: FileProcess,
    private routeA: ActivatedRoute,
    public appSetting: AppSetting,
    private messageService: MessageService,
    public constant: Constants,
    public config: Configuration,
    public dateUtils: DateUtils,
    private userService: UserService,
    private router: Router,
    private fileService: FileService,
    private translate: TranslateService,
    private lgService: LanguageService,
    private comboboxService: ComboboxService
  ) {
    this.translate.use(this.lgService.getLanguage());
    this.username = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z0-9_]*')
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')
    ]);
    this.confirmationPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')
    ]);
  }

  height = 0;
  @ViewChild('treegrid')
  public treegrid: TreeGridComponent;

  @ViewChild('scrollPracticeMaterial') scrollPracticeMaterial: ElementRef;
  @ViewChild('scrollPracticeMaterialHeader') scrollPracticeMaterialHeader: ElementRef;

  @ViewChild('scrollPermession', { static: false }) scrollPermession: ElementRef;
  @ViewChild('scrollPermessionHeader', { static: false }) scrollPermessionHeader: ElementRef;
  id: string;
  type: string;
  filedata = null;
  minDateNotificationV: NgbDateStruct;
  isAction: boolean = false;
  listFunction: any[] = [];
  listPermission: any[] = [];
  listUserGroup: any[] = [];
  groupFunctions: any[] = [];

  isSelectAll = false;
  listFunctionIndex = 0;

  //Khởi tạo model
  model: any = {
    userName: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    avatar: '',
    password: '',
    lockoutEnabled: 'false',
    description: '',
    isChecked: false,
    userGroupId: null,
    type: null,
    permissions: [],
    confirmationPassword: ''
  }

  modelDelteFile: any = {
    anh: '',
  }

  isIndeterminate = false;
  checkAll: boolean = false;
  groupSelect: any = {};
  groupSelectIndex: number = 0;

  ngOnInit(): void {
    //Hứng sự kiện thay đổi ngôn ngữ để load lại Component
    this.lgService.onLanguageChanged.pipe().subscribe(languageCode => {
      if (languageCode) {
        this.translate.use(languageCode);
      }
    });

    this.fileProcess.fileModel = {};
    this.fileProcess.FileDataBase = null;
    this.id = this.routeA.snapshot.paramMap.get('id');
    this.height = window.innerHeight - 620;
    this.getListGroupuser();
    if (this.id != null) {
      this.appSetting.PageTitle = "Cập nhật tài khoản";
      this.getUserById();
    } else {
      this.appSetting.PageTitle = "Thêm mới tài khoản";

    }
  }

  ngAfterViewInit() {
    this.scrollPracticeMaterial.nativeElement.addEventListener('ps-scroll-x', (event: any) => {
      this.scrollPracticeMaterialHeader.nativeElement.scrollLeft = event.target.scrollLeft;
    }, true);

    this.scrollPermession.nativeElement.addEventListener('ps-scroll-x', (event: any) => {
      this.scrollPermessionHeader.nativeElement.scrollLeft = event.target.scrollLeft;
    }, true);
  }

  ngOnDestroy() {
    this.scrollPracticeMaterial.nativeElement.removeEventListener('ps-scroll-x', null);
    this.scrollPermession.nativeElement.removeEventListener('ps-scroll-x', null);
  }

  listData = [];
  pathFile: string;

  //Lấy danh sách nhóm người dùng
  getListGroupuser() {
    this.comboboxService.getListGroupuser().subscribe(
      (data: any) => {
        if (data.isStatus) {
          this.listUserGroup = data.data;
        }
      }
    );
  }

  //Lấy thong tin người dùng theo id
  getUserById() {
    this.userService.getUserById(this.id).subscribe(
      data => {
        if (data.isStatus) {
          this.model = data.data;
          this.model.lockoutEnabled = this.model.lockoutEnabled.toString();

          //Xử lý ghép link avatar
          if (data.data.avatar != null && data.data.avatar != '') {
            this.filedata = this.config.ServerApi + data.data.avatar;
          }

          if (this.model.userGroupId != null) {
            setTimeout(() => {
              this.groupFunctions = data.data.listGroupFunction;
            }, 200);
            //Xử lý check quyền

            this.groupSelectIndex = 0;
            for (let i = 0; i < this.groupFunctions.length; i++) {
              let checkCount = this.groupFunctions[i].checkCount;
              let length = this.groupFunctions[i].permissions.length;
              if (checkCount == 0) {
                this.groupFunctions[i].isIndeterminate = false;
              }
              else {
                if (checkCount < length) {
                  this.groupFunctions[i].isIndeterminate = true;
                }
                else {
                  this.groupFunctions[i].isIndeterminate = false;
                  this.isSelectAll = this.groupFunctions[i].checkCount == this.groupFunctions[i].permissions.length;
                  this.groupFunctions[i].isChecked = this.isSelectAll;
                }
              }
            }
          }
          // console.log(this.model.userGroupId);


        }
      }, error => {
        this.messageService.showError(error);
      }
    );
  }

  //Danh sách 
  getPermission(groupuserid: string) {
    this.userService.getPermission(groupuserid).subscribe(
      result => {
        if (result.isStatus) {
          setTimeout(() => {
            this.groupFunctions = result.data;
          }, 200);
          this.groupSelectIndex = 0;
          for (let i = 0; i < this.groupFunctions.length; i++) {
            let checkCount = this.groupFunctions[i].checkCount;
            let length = this.groupFunctions[i].permissions.length;
            if (checkCount == 0) {
              this.groupFunctions[i].isIndeterminate = false;
            }
            else {
              if (checkCount < length) {
                this.groupFunctions[i].isIndeterminate = true;
              }
              else {
                this.groupFunctions[i].isIndeterminate = false;
                this.isSelectAll = this.groupFunctions[i].checkCount == this.groupFunctions[i].permissions.length;
                this.groupFunctions[i].isChecked = this.isSelectAll;
              }
            }
          }
        }
      }, error => {
        this.messageService.showError(error);
      }
    );
  }

  //Slect một dòng quyền
  rowSelected($event: any) {
    this.listPermission = $event.data.permissions;
    this.model.permissions = this.listPermission;
  }

  //Thay đổi nhóm quyền
  changeGroupFunctionCheck(group, index) {
    group.permissions.forEach(permission => {
      if (permission.isChecked && !group.isChecked) {
        group.checkCount--;
      }
      if (!permission.isChecked && group.isChecked) {
        group.checkCount++;
      }
      permission.isChecked = group.isChecked;
    });

    if (index == this.groupSelectIndex) {
      this.isSelectAll = group.isChecked;
    }
    this.groupFunctions[index].isIndeterminate = false;
  }

  //Chọn quyền
  selectPermission(permission) {
    if (!permission.isChecked) {
      this.groupFunctions[this.groupSelectIndex].checkCount--;
    }
    else {
      this.groupFunctions[this.groupSelectIndex].checkCount++;
    }

    let checkCount = this.groupFunctions[this.groupSelectIndex].checkCount;
    let length = this.groupFunctions[this.groupSelectIndex].permissions.length;
    if (checkCount == 0) {
      this.groupFunctions[this.groupSelectIndex].isChecked = false;
      this.groupFunctions[this.groupSelectIndex].isIndeterminate = false;
      this.isSelectAll = false;
    }
    else {
      if (checkCount < length) {
        this.groupFunctions[this.groupSelectIndex].isIndeterminate = true;
        this.isSelectAll = false;
      }
      else {
        this.groupFunctions[this.groupSelectIndex].isIndeterminate = false;
        this.isSelectAll = this.groupFunctions[this.groupSelectIndex].checkCount == this.groupFunctions[this.groupSelectIndex].permissions.length;
        this.groupFunctions[this.groupSelectIndex].isChecked = this.isSelectAll;
      }
    }

  }

  //Thay đổi nhóm quyền
  changeGroupUser(event: any) {
    this.model.userGroupId = event;
    if (this.model.userGroupId) {
      this.getPermission(this.model.userGroupId);
    }
  }

  //Thay đổi loại tài khoản
  changeLoaiTK(event: any) {
    this.model.userGroupId = event;
    if (this.model.userGroupId) {
      this.getPermission(this.model.userGroupId);
    }
  }

  //CHọn file
  onFileChange($event) {
    this.fileProcess.onAFileChange($event);
  }

  //Lưu và tiếp tục
  saveAndContinue() {
    this.save(true);
  }

  //Lưu người dùng
  save(isContinue: boolean) {
    let regex = this.constant.validEmailRegEx;

    //Kiểm tra email
    if (this.model.email) {
      if (!regex.test(this.model.email)) {

        this.messageService.showMessage("E-mail không hợp lệ!");
        return;
      }
    }

    this.model.listGroupFunction = this.groupFunctions;

    //Trường hợp không có file upload
    if (this.fileProcess.FileDataBase == null) {
      if (this.id) {
        this.update();
      }
      else {
        this.create(isContinue);
      }
    } else if (this.fileProcess.FileDataBase) {
      //Thực hiện upload file
      this.fileService.uploadFile(this.fileProcess.FileDataBase, 'User/Image').subscribe(
        result => {
          //Gán url file cho avatar
          this.model.avatar = result.data.fileUrl;
          //Nếu có id thì cập nhật
          if (this.id) {
            this.update();
          }
          else {
            this.create(isContinue);
          }
        },
        error => {
          this.messageService.showError(error);
        });
    }
  }

  //Them mới tài khoản
  create(isContinue: any) {
    this.userService.createUser(this.model).subscribe(
      result => {
        if (result.isStatus) {
          this.messageService.showSuccess('Thêm mới tài khoản thành công!');
          //Thêm xong và ở lại giao diện
          if (isContinue) {
            this.isAction = true;
            this.clear();
          } else {
            this.closeModal(true);
          }
        }
      },
      error => {
        this.messageService.showError(error);
      }
    );
  }

  //Cập nhật tài khoản
  update() {
    this.userService.updateUser(this.id, this.model).subscribe(
      result => {
        if (result.isStatus) {
          this.messageService.showSuccess('Cập nhập tài khoản thành công!');
          this.closeModal(true);
        }
      },
      error => {
        this.messageService.showError(error);
      }
    );
  }

  //Clear dữ liệu
  clear() {
    this.fileProcess.fileModel = {};
    this.fileProcess.FileDataBase = null;

    this.model = {
      userName: '',
      fullName: '',
      email: '',
      phoneNumber: '',
      anh: '',
      password: '',
      confirmationPassword: '',
      status: 1,
      description: '',
      isChecked: false,
      groupId: null,
      idChucVu: null,
    }
  }

  //Xác nhận xóa
  showComfirmDeleteFile() {
    this.messageService.showConfirm("Bạn có chắc muốn xóa ảnh này không?").then(
      data => {
        this.model.anh = null;
        this.filedata = null;
        this.fileProcess.fileModel = {};
        this.fileProcess.FileDataBase = null;
      }
    );
  }

  //Xóa người dùng
  deleteFile(anh: any) {
    this.modelDelteFile.anh = anh;
    if (this.modelDelteFile.anh != null && this.modelDelteFile.anh != '') {
      // this.fileService.deleteFile(anh).subscribe(
      //   data => {
      //     if (data.statusCode == this.constant.StatusCode.Success) {
      //       this.model.anh = null;
      //       this.update();
      //     }
      //     else {
      //       this.messageService.showMessage(data.message,data.exception);
      //     }
      //   }
      //);
    }
    if (this.fileProcess.FileDataBase != null && anh == null) {
      this.filedata = null;
      this.fileProcess.fileModel.DataURL = null;
    }
  }

  //Đóng modal
  closeModal(isOK: boolean) {
    if (this.fileProcess.fileModel.DataURL != undefined) {
      this.fileProcess.fileModel.DataURL = null;
    }
    this.router.navigate(['/nguoi-dung/tai-khoan']);
  }

  fieldTextType: boolean;
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  showMK: boolean = false;
  showMKXN: boolean = false;
  toggleMK(type: number) {
    if (type == 1)
      this.showMK = !this.showMK;
    else if (type == 2)
      this.showMKXN = !this.showMKXN;
  }

  //Select nhóm
  rowGroupSelected($event: any) {
    this.groupSelectIndex = $event.rowIndex;
    this.groupSelect = $event.data;
    //kiểm tra nếu collapsable thì set  Permission = []
    if (this.groupSelect.children == 0) {
      this.listPermission = $event.data.permissions;
    } else {
      this.listPermission = [];
    }

    //Kiểm tra để chek all
    var permissionsCheck = this.listPermission.filter(s => s.isChecked);
    if (this.listPermission.length > 0 && this.listPermission.length == permissionsCheck.length) {
      this.checkAll = true;
    } else {
      this.checkAll = false;
    }
  }

  //Chuyển trạng thái check all
  selectAll() {
    this.listPermission.forEach(itemFunc => {
      itemFunc.isChecked = this.checkAll;
    });

    var itemsChoose = this.listPermission.filter(a => a.isChecked);
    this.changeDataSub(this.groupFunctions, itemsChoose.length);

    //refresh tree
    this.treegrid.refresh();
    setTimeout(() => {
      this.treegrid.selectRow(this.groupSelectIndex);
    }, 100);
  }

  //Chek quyền
  checkItem(permission) {
    var itemsChoose = this.listPermission.filter(a => a.isChecked);
    if (itemsChoose.length == this.listPermission.length)
      this.checkAll = true;
    else
      this.checkAll = false;

    this.changeDataSub(this.groupFunctions, itemsChoose.length);

    //refresh tree
    this.treegrid.refresh();
    setTimeout(() => {
      this.treegrid.selectRow(this.groupSelectIndex);
    }, 100);
  }

  //Thay đổi dữ liệu nhóm con
  changeDataSub(listSub: any[], totalChoose: number) {
    listSub.forEach(item => {
      if (this.groupSelect.id == item.id)
        item.checkCount = totalChoose;

      if (item.children.length > 0)
        this.changeDataSub(item.children, totalChoose);
    });
  }
}
