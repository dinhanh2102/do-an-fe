import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

import { Observable, OperatorFunction, Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { ChangePasswordComponent } from 'src/app/cores/auth/change-password/change-password.component';
import { AuthenticationService } from 'src/app/cores/auth/services';
import { NotifyService } from 'src/app/cores/notify/services/notify.service';
import { UserInfoComponent } from 'src/app/cores/system/user/user-info/user-info.component';

import { AppSetting, Configuration, Constants, MessageService } from 'src/app/shared'
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopBarComponent implements OnInit {

  constructor(
    public appSetting: AppSetting,
    private notifyService: NotifyService,
    private authenticationService: AuthenticationService,
    public config: Configuration,
    private router: Router,
    private constant: Constants,
    private modalService: NgbModal,
    private messageService: MessageService,
    public translate: TranslateService,
    public lgService: LanguageService
  ) {
    this.translate.use(this.lgService.getLanguage());
  }

  fileTemplate = this.config.ServerApi + this.config.UrlUserManual;
  fullName: string;
  account: string;
  user: any;
  public filedata: string;
  modelConfig: any = {
    softwareName: '',
    isUseMultiLanguage: false,
    isUseCaptcha: false,
    filePathLogo: '',
    filePathIcon: '',
    iShowLogoTopBar: false,
    logo: '',
    menuType: 1
  }

  ngOnInit(): void {
    //lấy thông tin cấu hình giao diện   
    let config = JSON.parse(localStorage.getItem('configInterface'));
    if (config) {
      this.modelConfig = config;
    }
    let userString = localStorage.getItem('CurrentUser');
    if (userString) {
      this.user = JSON.parse(userString);
      if (this.user.fullName)
        this.fullName = this.user.fullName;
      else
        this.fullName = this.user.name;
      if (this.user.avatar != null && this.user.avatar != '') {
        this.filedata = this.config.ServerApi + this.user.avatar;
      }
    }
  }

  switchLang(lang: string) {
    if (this.lgService.getLanguage() != lang) {
      this.translate.use(lang);
      this.lgService.setLanguage(lang);
      this.translate.currentLang = lang;
    }
  }

  menuChatToggle(type: string) {
    if (type == 'menu') {
      this.appSetting.MenuFolded = !this.appSetting.MenuFolded;
    }
  }

  navToggle() {
     this.appSetting.MenuFolded = !this.appSetting.MenuFolded;
  }

  showNotify(){
    this.notifyService.showNotify(true);
  }

  colorConfig() {
    this.notifyService.showTheme(true);
  }

  logout() {
    this.authenticationService.logout().subscribe(
      result => {
        if (result.isStatus) {
          localStorage.removeItem('CurrentUser');
          this.router.navigate(['/auth/dang-nhap']);
        }
        else {
          this.messageService.showListMessage(result.message);
        }
      }, error => {
        this.messageService.showError(error);
      }
    );
  }

  fnChangePassword() {
    let activeModal = this.modalService.open(ChangePasswordComponent, { container: 'body' });
    activeModal.result.then((result) => {

    }, (reason) => {

    });
  }

  dowloadFile() {
    // var link = document.createElement('a');
    // link.setAttribute("type", "hidden");
    // link.href = this.fileTemplate;
    // link.download = 'Download.zip';
    // document.body.appendChild(link);
    // // link.focus();
    // link.click();
    // document.body.removeChild(link);

    var redirectWindow = window.open(this.fileTemplate, '_blank');
    redirectWindow.location;
  }

  showCreateUpdate() {
    let activeModal = this.modalService.open(UserInfoComponent, { container: 'body', windowClass: 'user-info-model', backdrop: 'static' })
    activeModal.componentInstance.id = this.user.userId;
    activeModal.result.then((result: any) => {
      if (result) {
        this.fullName = activeModal.componentInstance.model.fullName;
        if (activeModal.componentInstance.model.avatar != null && activeModal.componentInstance.model.avatar != '') {
          this.filedata = this.config.ServerApi + activeModal.componentInstance.model.avatar;
        }
        //this.logout();
      }
    });
  }
}
