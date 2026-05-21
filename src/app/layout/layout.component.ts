import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppSetting } from '../shared';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [
    // slideInAnimation
    // animation triggers go here
  ]
})
export class LayoutComponent implements OnInit {
  public lang: string;
  public isMobile: boolean = false;
  constructor(
    public appSetting: AppSetting,
    public translate: TranslateService
  ) {
    translate.addLangs(['vi', 'en']);
    this.lang = localStorage.getItem("lang");
    if (!this.lang) {
      this.lang = "vi";
      localStorage.setItem("lang", this.lang);
    }
    translate.currentLang = this.lang;
    translate.setDefaultLang(this.lang);
  }

  ngOnInit() {
    if (window.innerWidth <= 767) {
      this.appSetting.MenuFolded = true;
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  onResize(event) {
    if (event.target.innerWidth <= 767) {
      this.appSetting.MenuFolded = true;
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }
}
