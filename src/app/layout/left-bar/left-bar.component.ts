import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { AppSetting, Configuration, MessageService } from 'src/app/shared'
import { NtsNavigationService } from '../navigation/navigation.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/services/language.service';
import { MenuService } from 'src/app/cores/systemconfig/service/menu.service';

@Component({
  selector: 'app-left-bar',
  templateUrl: './left-bar.component.html',
  styleUrls: ['./left-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LeftBarComponent implements OnInit, OnDestroy {

  constructor(public appSetting: AppSetting,
    public config: Configuration,
    private _ntsNavigationService: NtsNavigationService,
    private router: Router,
    private lgService: LanguageService,
    public translate: TranslateService,
    private menuService: MenuService,
    private messageService: MessageService,
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();

  }
  navigation: any;
  navigationItem: any;
  urlLogo = '';
  url: any;
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

  // Private
  private _unsubscribeAll: Subject<any>;

  ngOnInit(): void {
    //lấy thông tin cấu hình giao diện   
    let config = JSON.parse(localStorage.getItem('configInterface'));
    if (config) {
      this.modelConfig = config;
      this.urlLogo = this.config.ServerApi + this.modelConfig.filePathLogo;
    }
    this.appSetting.Breadcrumb = [];
    //Hứng sự kiện thay đổi ngôn ngữ để load lại Component
    this.lgService.onLanguageChanged.pipe().subscribe(languageCode => {
      if (languageCode) {
        this.translate.use(languageCode);
        this.navigationItem = this.getNavigationByUrl(this.url);
        if (this.navigationItem) {
          this.getBreadcrumb(this.navigationItem, true);
          this.appSetting.Breadcrumb = this.appSetting.Breadcrumb.reverse();

          this.translate.get(this.navigationItem.titleDefault).subscribe((value: string) => {
            this.appSetting.PageTitle = value;
          });
        }
      }
    });

    this.menuService.getMenu().subscribe(
      (data: any) => {
        localStorage.setItem('menu', JSON.stringify(data.data));
        this.navigation = data.data;
        this._ntsNavigationService.register('menu', data.data);
        this._ntsNavigationService.setCurrentNavigation('menu');

        if (this._ntsNavigationService.isCurrentNavigation()) {
          this.navigation = data.data;
        }

        this._ntsNavigationService.onNavigationChanged
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(() => {
            this.navigation = data.data;
          });

        //Load trang thì lấy url
        this.url = this.router.url;
        this.navigationItem = this.getNavigationByUrl(this.url);
        if (this.navigationItem) {
          this.getBreadcrumb(this.navigationItem, true);
          this.appSetting.Breadcrumb = this.appSetting.Breadcrumb.reverse();

          this.translate.get(this.navigationItem.titleDefault).subscribe((value: string) => {
            this.appSetting.PageTitle = value;
          });
        }

        //Khi url thay đổi
        this.router.events.pipe(
          filter(event => event instanceof NavigationEnd)
        ).subscribe((event: NavigationEnd) => {
          this.url = event.url;
          this.navigationItem = this.getNavigationByUrl(this.url);
          if (this.navigationItem) {
            this.getBreadcrumb(this.navigationItem, true);
            this.appSetting.Breadcrumb = this.appSetting.Breadcrumb.reverse();

            this.translate.get(this.navigationItem.titleDefault).subscribe((value: string) => {
              this.appSetting.PageTitle = value;
            });
          }
        });
      }, error => {
        this.messageService.showError(error);
      });
  }

  getNavigationByUrl(currentUrl: string) {
    for (const item of this.navigation) {
      var urlCurrent = `/${currentUrl.split('/').slice(0, 3).join('/')}`.replace('//', '/');
      var urlItem = `/${item.url.split('/').slice(0, 3).join('/')}`.replace('//', '/');
      if (urlItem === urlCurrent) {
        return item;
      }
      if (item.children) {
        for (const subItem of item.children) {
          var urlItemSub = `/${subItem.url.split('/').slice(0, 3).join('/')}`.replace('//', '/');
          if (urlItemSub === urlCurrent) {
            return subItem;
          }
          if (subItem.children) {
            for (const subItem1 of subItem.children) {
              var urlItemSub1 = `/${subItem1.url.split('/').slice(0, 3).join('/')}`.replace('//', '/');
              if (urlItemSub1 === urlCurrent) {
                return subItem1;
              }
            }
          }
        }
      }
    }
  }

  //Get liên kết các menu
  getBreadcrumb(navigationSelect: any, isGetMenu: boolean) {
    if (isGetMenu) {
      this.appSetting.Breadcrumb = [];
      this.appSetting.Breadcrumb.push(navigationSelect);
    }
    this.navigation.forEach(item => {
      if (navigationSelect.parentId && navigationSelect.parentId == item.id) {
        this.appSetting.Breadcrumb.push(item);
        if (item.parentId) {
          this.getBreadcrumb(item, false);
        } else {
          return;
        }
      }

      if (item.children) {
        this.getSubBreadcrumb(item.children, navigationSelect);
      }
    });
  }

  getSubBreadcrumb(listSub: any, navigationSelect: any) {
    listSub.forEach(item => {
      if (navigationSelect.parentId && navigationSelect.parentId == item.id) {
        this.appSetting.Breadcrumb.push(item);
        if (item.parentId) {
          this.getBreadcrumb(item, false);
        } else {
          return;
        }
      }
    });
  }

  /**
     * On destroy
     */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
