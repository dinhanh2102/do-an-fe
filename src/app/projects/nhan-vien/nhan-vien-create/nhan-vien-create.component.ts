import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FileProcess, AppSetting, MessageService, Constants, Configuration, DateUtils } from 'src/app/shared';
import { ComboboxService } from 'src/app/shared/services/combobox.service';
import { FileService } from 'src/app/shared/services/file.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { FormControl, Validators } from '@angular/forms';
import { NhanVienService } from '../service/nhan-vien.service';

@Component({
  selector: 'app-nhan-vien-create',
  templateUrl: './nhan-vien-create.component.html',
  styleUrls: ['./nhan-vien-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NhanVienCreateComponent implements OnInit {
  @ViewChild('grid')
  public grid!: TreeGridComponent;
  NhanVienname: FormControl;
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
    private service: NhanVienService,
    private router: Router,
    private fileService: FileService,
    private translate: TranslateService,
    private lgService: LanguageService,
    private comboboxService: ComboboxService
  ) {
    this.translate.use(this.lgService.getLanguage());
    this.NhanVienname = new FormControl('', [
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
    this.translate.use(this.lgService.getLanguage())
    const today = new Date();
    this.maxDateDOB = {
      year: today.getFullYear() - 18,
      month: today.getMonth() + 1,
      day: today.getDate()
    };
    this.maxDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate()
    };
    this.minDate = {
      year: today.getFullYear() - 100,
      month: today.getMonth() + 1,
      day: today.getDate()
    };

  }

  height = 0;
  @ViewChild('treegrid')
  
  public treegrid: TreeGridComponent;

  @Input() isView: boolean;
  id: string;
  type: string;
  filedata = null;
  minDateNotificationV: NgbDateStruct;
  isAction: boolean = false;
  listFunction: any[] = [];
  listPermission: any[] = [];
  listNhanVienGroup: any[] = [];
  maxDateDOB: NgbDateStruct
  maxDate: NgbDateStruct
  minDate: NgbDateStruct
  isSelectAll = false;
  listFunctionIndex = 0;

  //Khởi tạo model
  model: any = {
    gioiTinh: 1,
  }

  // modelDelteFile: any = {
  //   anh: '',
  // }

  isIndeterminate = false;
  checkAll: boolean = false;
  groupSelect: any = {};
  groupSelectIndex: number = 0;
  listPhongBan: any[] = [];
  listChucDanh: any[] = [];
  listNganHang: any[] = [];
  listDonVi: any[] = [];
  listTrinhDo: any[] = [];
  listBaoHiem: any[] = [];
  groupUser : string;
  videoRef: any;
  ngOnInit(): void {
    //Hứng sự kiện thay đổi ngôn ngữ để load lại Component
    this.groupUser = JSON.parse(localStorage.getItem('CurrentUser')).userGroupId;
    
    this.lgService.onLanguageChanged.pipe().subscribe(languageCode => {
      if (languageCode) {
        this.translate.use(languageCode);
      }
    });

    this.fileProcess.fileModel = {};
    this.fileProcess.FileDataBase = null;
    this.id = this.routeA.snapshot.paramMap.get('id');
    this.height = window.innerHeight - 620;
    this.getGroupUser()
    if (this.id && !this.isView) {
      this.appSetting.PageTitle = 'Chỉnh sửa nhân viên';
      this.getNhanVienById();
    } else if (this.id && this.isView) {
      this.appSetting.PageTitle = 'Xem nhân viên';
      this.getNhanVienById();
    } else {
      this.appSetting.PageTitle = "Thêm mới nhân viên";
    }
    this.getDonVi();
    this.getTrinhDo();
    this.getListNganHang();
  }
  getListNganHang(){
      this.service.getListNganHang().subscribe(data => {
        this.listNganHang = data.data;
      }, error => {
        this.messageService.showError(error);
      })
    
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
  setupCamera() {
    navigator.mediaDevices.getUserMedia({
      video: {width: 300, height: 250}, 
      audio: false
    }).then(stram => {
      console.log(stram);
      this.videoRef.srcObject = stram;
    })
  }

  listData = [];
  pathFile: string;

  //Lấy thong tin người dùng theo id
  getNhanVienById() {
    this.service.getNhanVienById(this.id).subscribe(
      data => {
        if (data.isStatus) {
          this.model = data.data;
          this.getPhongBan();
          this.getChucDanh();
          //Xử lý ghép link avatar
          if (data.data.avatar != null && data.data.avatar != '') {
            this.filedata = this.config.ServerApi + data.data.avatar;
          }
          if (this.model.dob) {
            this.model.ngaySinh = this.dateUtils.convertDateToObject(this.model.dob);
          }
          console.log(this.model);
          
        }
      }, error => {
        this.messageService.showError(error);
      }
    );
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
    this.model.dob = null;
    if (this.model.ngaySinh) {
      this.model.dob = this.dateUtils.convertObjectToDate(this.model.ngaySinh);
    }
    //Kiểm tra email
    if (this.model.email) {
      if (!regex.test(this.model.email)) {

        this.messageService.showMessage("E-mail không hợp lệ!");
        return;
      }
    }

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
      this.fileService.uploadFile(this.fileProcess.FileDataBase, 'NhanVien/Image').subscribe(
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

  //Them mới nhân viên
  create(isContinue: any) {
    this.service.createNhanVien(this.model).subscribe(
      result => {
        if (result.isStatus) {
          this.messageService.showSuccess('Thêm mới nhân viên thành công!');
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

  //Cập nhật nhân viên
  update() {
    this.service.updateNhanVien(this.id, this.model).subscribe(
      result => {
        if (result.isStatus) {
          this.messageService.showSuccess('Cập nhập nhân viên thành công!');
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

    this.model = {}
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

  getDonVi() {
    this.comboboxService.getDonVi().subscribe(data => {
      this.listDonVi = data.data;
    })
  }
  getPhongBan() {
    this.comboboxService.getPhongBanByIdDonVi(this.model.idDonVi).subscribe(data => {
      this.listPhongBan = data.data;
    })
  }
  getChucDanh() {
    this.comboboxService.getChucDanhByIdPhongBan(this.model.idPhongBan).subscribe(data => {
      this.listChucDanh = data.data;
    })
  }
  getTrinhDo() {
    this.comboboxService.getTrinhDo().subscribe(data => {
      this.listTrinhDo = data.data;
    })
  }
  getBaoHiem() {
    this.comboboxService.getBaoHiem().subscribe(data => {
      this.listBaoHiem = data.data;
    })
  }
  getNganHang() {
    this.comboboxService.getNganHang().subscribe(data => {
      this.listNganHang = data.data;
    })
  }

  OnChangeDonVi($event) {
    this.listPhongBan = []
    this.listChucDanh = []
    this.model.idChucDanh = null
    this.model.idPhongBan = null
    this.model.idDonVi = $event.id
    this.getPhongBan();
  }
  OnChangePhongBan($event) {
    this.listChucDanh = []
    // this.isPhuTrachPhongBan = $event.isCheck;
    // this.idPhuTrachPhongBan = $event.objectId
    // this.tenPhuTrachPhongBan = $event.code;
    this.model.idChucDanh = null
    this.model.idPhongBan = $event.id
    this.getChucDanh();
  }

  //Đóng modal
  closeModal(isOK: boolean) {
    if (this.fileProcess.fileModel.DataURL != undefined) {
      this.fileProcess.fileModel.DataURL = null;
    }
    this.router.navigate(['/nhan-vien/manage']);
  }
 
  
  
}
