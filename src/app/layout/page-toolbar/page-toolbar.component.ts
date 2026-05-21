import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, OperatorFunction, Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/cores/auth/services';
import { NotifyService } from 'src/app/cores/notify/services/notify.service';

import { AppSetting, Configuration, Constants, MessageService } from 'src/app/shared'
import { SearchGlobalService } from 'src/app/shared/common/search-global.service';
import { Menu } from 'src/app/shared/models';
import { MenuOptions } from 'src/app/shared/models/menu-options.model';


@Component({
  selector: 'app-page-toolbar',
  templateUrl: './page-toolbar.component.html',
  styleUrls: ['./page-toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PageToolbarComponent implements OnInit, OnDestroy {

  constructor(
    public appSetting: AppSetting,
    private notifyService: NotifyService,
    private searchGlobalService: SearchGlobalService,
    private authenticationService: AuthenticationService,
    public config: Configuration,
    private router: Router,
    private constant: Constants,
    private messageService: MessageService,
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // Private
  private _unsubscribeAll: Subject<any>;

  menuOptions: MenuOptions
  menuExports: Menu[] = [
    {
      iconCss: 'fas fa-file-excel',
      iconUrl: '',
      title: '',
      tooltip: 'Xuất excel',
      isDisplay: false,
      click: (menu: Menu) => {
        this.exportExcel(menu);
      }
    },
    {
      iconCss: 'fas fa-file-pdf',
      iconUrl: '',
      title: '',
      tooltip: 'Xuất pdf',
      isDisplay: false,
      click: (menu: Menu) => {
        this.exportPdf(menu);
      }
    }
  ];

  data: any = {
    statusSearch: 1,
    searchData: {

    }
  }

  fullName: string;
  linkImage: string;
  account: string;
  year: number;
  date = new Date;
  listYear: any[] = [];
  ngOnInit(): void {
    this.year = this.date.getFullYear();
    this.getYear();
    let currentUser = JSON.parse(localStorage.getItem('CurrentUser'));
    this.fullName = 'Administrator';
    if (currentUser) {
      // if (currentUser.imageLink) {
      //   this.linkImage = this.config.ServerImage + currentUser.imageLink;
      // }

      this.fullName = currentUser.name;
      this.account = currentUser.account;

    }

    this.searchGlobalService.onConfigChange.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
      if (data) {
        this.menuOptions = data;
        if (this.menuOptions.isSearch) {
          this.search();
        }
      }
      else {
        this.menuOptions = new MenuOptions();
      }

      this.setMenuExport();
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

  search() {
    this.menuOptions.searchModel.pageNumber = 1;
    this.searchGlobalService.search(this.menuOptions.searchModel);
  }

  refresh() {
    this.searchGlobalService.refresh();
  }

  exportExcel(menu?: Menu) {
    this.searchGlobalService.exportExcel();
  }

  exportPdf(menu?: Menu) {
    this.searchGlobalService.exportPdf();
  }

  searchDate() {
    this.searchGlobalService.searchDate(this.year);
  }

  menuDynamicClick(menu?: Menu) {
    this.searchGlobalService.menuClick(menu);
  }

  menuClick(menu) {

  }

  setMenuExport() {
    this.menuExports[0].isDisplay = this.menuOptions.isExcel;
    this.menuExports[1].isDisplay = this.menuOptions.isPDF;
  }

  getYear() {
    this.listYear = [];
    for (let index = 2000; index <= this.date.getFullYear(); index++) {
      this.listYear.push(index);
    }
  }
}
