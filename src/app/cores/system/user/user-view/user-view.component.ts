import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FileProcess, AppSetting, MessageService, Constants, Configuration, DateUtils } from 'src/app/shared';
import { ComboboxService } from 'src/app/shared/services/combobox.service';
import { FileService } from 'src/app/shared/services/file.service';
import { UserService } from '../../service/user.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  @ViewChild('grid')
  public grid!: TreeGridComponent;
  constructor(
    public fileProcess: FileProcess,
    private routeA: ActivatedRoute,
    public appSetting: AppSetting,
    private messageService: MessageService,
    public constant: Constants,
    public config: Configuration,
    public dateUtils: DateUtils,
    private userService: UserService,
    private translate:TranslateService,
    private lgService:LanguageService,
  ) {  this.translate.use(this.lgService.getLanguage());}

  height = 0;
   @ViewChild('scrollPracticeMaterial') scrollPracticeMaterial: ElementRef;
  @ViewChild('scrollPracticeMaterialHeader') scrollPracticeMaterialHeader: ElementRef;

  @ViewChild('scrollPermession', { static: false }) scrollPermession: ElementRef;
  @ViewChild('scrollPermessionHeader', { static: false }) scrollPermessionHeader: ElementRef;
  id: string;
  type: string;
  filedata = null;
  minDateNotificationV: NgbDateStruct;
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
    imageLink: '',
    password: '',
    lockoutEnabled: 'false',
    description: '',
    isChecked: false,
    nameGroupUser: ''
  }
  isIndeterminate = false;
  groupSelectIndex = -1;

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
    this.height = window.innerHeight - 450;
    if (this.id != null) {
      this.appSetting.PageTitle = "Xem thông tin tài khoản";
      this.getUserById();
    } 
  }

  //Lấy chi tiết tài khoản
  getUserById() {
    this.userService.getUserById(this.id).subscribe(
      data => {
        if (data.isStatus) {
          this.model = data.data;
          this.model.lockoutEnabled = this.model.lockoutEnabled.toString();
          this.groupFunctions = data.data.listGroupFunction;         
          if (this.model.avatar != null && this.model.avatar != '') {
            this.filedata = this.config.ServerApi + this.model.avatar;
          }
        }
      }, error => {
        this.messageService.showError(error);
      }
    );
  }

  //Slect nhóm quyền
  rowSelected($event: any) {
    this.listPermission = $event.data.permissions;
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


}
