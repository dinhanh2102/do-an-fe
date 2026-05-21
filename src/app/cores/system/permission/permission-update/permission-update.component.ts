import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbActiveModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FileProcess, AppSetting, MessageService, Constants, Configuration, DateUtils } from 'src/app/shared';
import { LanguageService } from 'src/app/shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { PermissionService } from '../../service/permission.service';

@Component({
  selector: 'app-permission-update',
  templateUrl: './permission-update.component.html',
  styleUrls: ['./permission-update.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PermissionUpdateComponent implements OnInit {

  constructor(
    public fileProcess: FileProcess,
    public appSetting: AppSetting,
    private messageService: MessageService,
    public constant: Constants,
    public config: Configuration,
    public dateUtils: DateUtils,
    private translate: TranslateService,
    private lgService: LanguageService,
    private activeModal: NgbActiveModal,
    private permissionService: PermissionService
  ) {
    this._unsubscribeAll = new Subject();
    this.translate.use(this.lgService.getLanguage());
  }

  height = 0;
  startIndex = 1;
    ; @ViewChild('treegrid')
  public treegrid: TreeGridComponent;
  code: string;
  namePermission: string;
  _unsubscribeAll: Subject<any>;
  listUser = [];
  totalUser: any = 0;
  searchModel = {
    pageSize: 10,
    pageNumber: 1,
    code: ''
  }
  
  isAction: boolean = false;
  isAddUser: boolean = false;
  ngOnInit(): void {
    this.searchModel.code = this.code
    //Hứng sự kiện thay đổi ngôn ngữ để load lại Component
    this.lgService.onLanguageChanged.pipe().subscribe(languageCode => {
      if (languageCode) {
        this.translate.use(languageCode);
      }
    });

    this.getUser();
  }

  getUser() {
    this.permissionService.getUser(this.searchModel).subscribe(
      result => {
        if (result.isStatus) {
          setTimeout(() => {
            this.listUser = result.data.dataResults;
            this.totalUser = this.listUser.length;
          }, 200);

        }
      }, error => {
        this.messageService.showError(error);
      }
    );

  }

  deletePermision(id: string) {
    this.permissionService.deletePermision(id).subscribe(
      result => {
        if (result.isStatus) {
          this.messageService.showSuccess('Xóa quyền của người dùng thành công!');
          this.getUser();
        }
      }, error => {
        this.messageService.showError(error);
      }
    );
  }

  closeModal(isOK: boolean) {
    this.activeModal.close(isOK ? isOK : this.isAction);
  }
}