import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { AuthenticationService } from '../services';
import { Configuration, Constants, MessageService } from 'src/app/shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/services/language.service';
import { ForgotPasswordComponent } from '../../system/user/forgot-password/forgot-password.component';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, OnDestroy {
  message: string = '';
  returnUrl: string = '';
  model: any = {
  }
  captcha_input: any = null;
  typeCaptcha: any;
  code: any = null;
  resultCode: any = null;
  type = 1;//1: captcha nhập chữ và số, 2: captcha phép tính
  server = '';
  logo = '.src/assets/img/OIG1.jpg';
  //                           
  modelConfig: any = {
    softwareName: 'Tên phần mềm mặc định',
    isUseMultiLanguage: false,
    isUseCaptcha: false,
    filePathLogo: '',
    filePathIcon: './assets/img/logo-min.png',
    iShowLogoTopBar: false,
    logo: '',
    menuType: 1
  }

  public lang: string;
  constructor(
    public config: Configuration,
    private router: Router,
    private titleService: Title,
    private constant: Constants,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private messageService: MessageService,
    private authenticationService: AuthenticationService,
    public translate: TranslateService,
    public lgService: LanguageService,
  ) {
    translate.addLangs(['vi', 'en']);
    this.lang = this.lgService.getLanguage();
    if (!this.lang) {
      this.lang = "vi";
      this.lgService.setLanguage(this.lang);
    }
    this.translate.use(this.lgService.getLanguage());
  }

  switchLang(lang: string) {
    if (this.lgService.getLanguage() != lang) {
      this.translate.use(lang);
      this.lgService.setLanguage(lang);
      this.translate.currentLang = lang;
    }
  }
  ngOnInit(): void {
    this.getConfig();
    //Hứng sự kiện thay đổi ngôn ngữ để load lại Component
    this.lgService.onLanguageChanged.pipe().subscribe(languageCode => {
      if (languageCode) {
        this.translate.use(languageCode);
      }
    });

    // this.createCaptcha();//tạo captchaimage

    this.translate.get('ProductName').subscribe((value: string) => {
      this.titleService.setTitle(value);
    });

    document.body.classList.add('body-login');

    $(".toggle-password").click(function () {
      $(this).toggleClass("fa-eye fa-eye-slash");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
        return;
      } else {
        input.attr("type", "password");
        return;
      }
    });

    // reset login status
    localStorage.removeItem('CurrentUser');

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.server = this.config.ServerApi;
  }

  ngOnDestroy() {
    document.body.classList.remove('body-login');
  }
  resolved(captchaResponse: string) {
    if (captchaResponse) {
      this.modelConfig.isUseCaptcha = false;
    }
  }
  //lấy thông tin cấu hình giao diện
  getConfig() {
    this.authenticationService.getConfig().subscribe(
      (data: any) => {
        if (data.data) {
          localStorage.setItem('configInterface', JSON.stringify(data.data));
          this.modelConfig = data.data;
          if (this.modelConfig.filePathLogo) {
            this.logo = this.server + this.modelConfig.filePathLogo;
          } else {
            this.logo = './assets/img/logo.png';
          }

        }
      },
      error => {
        this.messageService.showError(error);
      });
  }
  login() {
    //check captcha chữ
    // if (this.modelConfig.isUseCaptcha) {
    //   if (this.captcha_input != this.resultCode) {
    //    // this.createCaptcha();       
    //    this.captcha_input = '';
    //    this.messageService.showMessage("Captcha không hợp lệ!");

    //   } else {
    //     this.modelConfig.isUseCaptcha = false;
    //     this.loginApi();
    //   }
    // } else {
    //   this.loginApi();

    // }
    this.loginApi();

  }
  loginApi() {
    // this.model.password = this.constant.b64EncodeUnicode(this.model.password);
    this.authenticationService.login(this.model)
      .subscribe(
        result => {
          if (result.isStatus) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            result.data.LoginDate = new Date();
            localStorage.setItem('CurrentUser', JSON.stringify(result.data));
            localStorage.setItem("jwt", result.data.token);
            localStorage.setItem("refreshToken", result.data.refreshToken);
            this.router.navigate(['/nhan-vien/manage']);
          }
        },
        error => {
          this.messageService.showError(error);
          this.model.password = null;
          // if (!this.modelConfig.isUseCaptcha) {
          //   this.modelConfig.isUseCaptcha = true;
          //   this.captcha_input = '';
          //   this.createCaptcha();
          // }
        }
      );

  }

  forgotPassword() {
    let activeModal = this.modalService.open(ForgotPasswordComponent, { container: 'body', windowClass: 'forgot-password-model', backdrop: 'static' })
    activeModal.result.then((result: any) => {
      if (result) {
        //this.logout();
      }
    });
  }


  //tạo captcha nhập chữ
  // createCaptcha() {

  //   switch (this.type) {
  //     case 1: // only alpha numaric degits to type

  //       let char =
  //         Math.random()
  //           .toString(24)
  //           .substring(2, 6) +
  //         Math.random()
  //           .toString(24)
  //           .substring(2, 4);
  //       this.code = this.resultCode = char.toUpperCase();
  //       break;
  //     case 2: // solve the calculation 
  //       let num1 = Math.floor(Math.random() * 99);
  //       let num2 = Math.floor(Math.random() * 9);
  //       let operators = ['+', '-'];
  //       let operator = operators[(Math.floor(Math.random() * operators.length))];
  //       this.code = num1 + operator + num2 + '=?';
  //       this.resultCode = (operator == '+') ? (num1 + num2) : (num1 - num2);
  //       break;
  //   }


  //   setTimeout(() => {
  //     let captcahCanvas: any = document.getElementById("captcahCanvas");
  //     var ctx = captcahCanvas.getContext("2d");
  //     ctx.fillStyle = "#f2efd2";
  //     ctx.fillRect(0, 0, captcahCanvas.width, captcahCanvas.height);

  //     ctx.beginPath();

  //     captcahCanvas.style.letterSpacing = 15 + "px";
  //     ctx.font = "40px Arial";
  //     ctx.fillStyle = "black";
  //     ctx.textBaseline = "middle";
  //     ctx.fillText(this.code, 40, 50);
  //     for (var i = 0; i < 150; i++) {
  //       ctx.moveTo(Math.random() * 300, Math.random() * 300);
  //       ctx.lineTo(Math.random() * 300, Math.random() * 300);
  //     }
  //     ctx.stroke();
  //   }, 100);
  // }
}

