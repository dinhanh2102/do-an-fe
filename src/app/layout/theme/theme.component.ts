import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { trigger, transition, state, animate, style, AnimationEvent } from '@angular/animations';

import { Subject, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Constants } from 'src/app/shared';
import { NotifyService } from '../../cores/notify/services/notify.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        width: '600px',

      })),
      state('closed', style({
        width: '0px'
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
  encapsulation: ViewEncapsulation.None
})
export class ThemeComponent implements OnInit {

  constructor(private notifyService: NotifyService,
    public constant: Constants,) {
    this._unsubscribeAll = new Subject();
  }

  private _unsubscribeAll: Subject<any>;

  themes: any = [
    // {
    //   name: 'Mặc định',
    //   bodyBackground: "#f5f5f5",
    //   bodyFontsize: "13",
    //   contentWrapperPadding: "15px 15px 15px 15px",

    //   topbarLogoBackground: "#364E43",
    //   topbarLogoColor: "#fff",
    //   topbarLogoSize: 20,

    //   topbarBackground: "#fff",
    //   topbarColor: "#39424E",
    //   topbarSize: 28,
    //   topbarSearchBackground: "#f1f1f1 ",
    //   topbarSearchColor: "#495057",
    //   topbarSearchIconColor: "#495057",
    //   topbarSearchSize: 13,

    //   leftbarBackground: "#364E43",
    //   leftbarTextColor: "#ffffff",
    //   leftbarIconColor: "rgba(255, 255, 255, 0.7)",
    //   leftbarHoverBackground: "#004d2d",
    //   leftbarHoverColor: "#fff",
    //   leftbarHoverShadow: "#9c1f1f",
    //   leftbarActiveBackground: "#004d2d",
    //   leftbarActiveColor: "#fff",
    //   leftbarActiveShadow: "#9c1f1f",
    //   leftbarTextsize: 16,
    //   leftbarIconsize: 24,
    //   leftbarItemPadding: "10px 20px 10px 25px",

    //   infoFooterBackground: "#fff",
    //   infoFooterColor: "#000",
    //   infoFooterSize: 12,
    //   tableHeaderBackground: "#364E43",
    //   tableHeaderColor: "#fff",
    //   tableHeaderPadding: "8px",
    //   tableBodyHoverBackgroundColor: "#f2f4fa",
    //   tableBodyHoverColor: "#000",
    //   tableBodyPadding: "5px",
    //   tableBodySelectedBackgroundColor: "#f2f4fa",
    //   tableBodySelectedColor: "#000",
    //   tableBorderColor: "#dee2e6",
    //   boxMarginTop: 15,
    //   boxHeaderBackgroundColor: "#fff",
    //   boxHeaderColor: "#39424E",
    //   boxHeaderSize: 16,
    //   boxHeaderHeight: 40,
    //   boxHeaderPadding: "0 15px 0 15px",
    //   boxBodyBackgroundColor: "#fff",
    //   boxBodyPadding: "0 15px 15px 15px",
    //   boxRadius: 5,

    //   pageToolbarBackgroundColor: "#f5f5f5",
    //   pageToolbarTitleColor: "#134427",
    //   pageToolbarTitleSize: 16,
    //   pageToolbarTitleWeight: 600,
    //   pageToolbarIconColor: "#31a67e",
    //   pageToolbarIconHoverColor: "#28a745",

    //   modalHeaderBackgroudColor: "#067849",
    //   modalHeaderColor: "#fff",
    //   modalHeaderCloseColor: "#fff",
    //   modalHeaderPadding: "10px",
    //   modalHeaderSize: 18,
    //   modalBodyPadding: "15px",
    //   modalFooterPackgroudColor: "#fff",
    //   modalFooterPadding: "10px",

    //   groupInfoHeaderBackgroudColor: "#31a67e",
    //   groupInfoHeaderColor: "#fff",
    //   groupInfoHeaderPadding: "5px 5px 5px 10px",
    //   groupInfoHeaderSize: 16,

    //   ntsImageBackgroudColor: "#f4f4f4",

    //   successColor: "#fff",
    //   successBackgroundColor: "#04A3FC",
    //   successBorderColor: "#04A3FC",
    //   successHoverColor: "#fff",
    //   successHoverBackgroundColor: "#218838",
    //   successHoverBorderColor: "#1e7e34",

    //   infoColor: "#fff",
    //   infoBackgroundColor: "#17a2b8",
    //   infoBorderColor: "#17a2b8",
    //   infoHoverColor: "#fff",
    //   infoHoverBackgroundColor: "#138496",
    //   infoHoverBorderColor: "#117a8b",

    //   warningColor: "#fff",
    //   warningBackgroundColor: "#ffc107",
    //   warningBorderColor: "#ffc107",
    //   warningHoverColor: "#fff",
    //   warningHoverBackgroundColor: "#e0a800",
    //   warningHoverBorderColor: "#d39e00",

    //   dangerColor: "#fff",
    //   dangerBackgroundColor: "#ee0033",
    //   dangerBorderColor: "#ee0033",
    //   dangerHoverColor: "#fff",
    //   dangerHoverBackgroundColor: "#c82333",
    //   dangerHoverBorderColor: "#bd2130",

    //   primaryColor: "#fff",
    //   primaryBackgroundColor: "#007bff",
    //   primaryBorderColor: "#007bff",
    //   primaryHoverColor: "#fff",
    //   primaryHoverBackgroundColor: "#0069d9",
    //   primaryHoverBorderColor: "#0062cc",

    //   secondaryColor: "#fff",
    //   secondaryBackgroundColor: "#6c757d",
    //   secondaryBorderColor: "#6c757d",
    //   secondaryHoverColor: "#fff",
    //   secondaryHoverBackgroundColor: "#5a6268",
    //   secondaryHoverBorderColor: "#545b62",
    // },
    {
      name: "Mặc định",
      bodyBackground: "#f5f5f5",
      bodyFontsize: "14",
      contentWrapperPadding: "15px 15px 0 15px",

      topbarLogoBackground: "#ee0033",
      topbarLogoColor: "#fff",
      topbarLogoSize: 20,

      topbarBackground: "#fff",
      topbarColor: "#ee0033",
      topbarSize: 20,
      topbarSearchBackground: "#f1f1f1 ",
      topbarSearchColor: "#495057",
      topbarSearchIconColor: "#495057",
      topbarSearchSize: 13,

      leftbarBackground: "#ee0033",
      leftbarTextColor: "rgba(255, 255, 255, 0.7)",
      leftbarIconColor: "rgba(255, 255, 255, 0.7)",
      leftbarHoverBackground: "#ea6464",
      leftbarHoverColor: "#fff",
      leftbarHoverShadow: "#9c1f1f",
      leftbarActiveBackground: "#ea6464",
      leftbarActiveColor: "#fff",
      leftbarActiveShadow: "#9c1f1f",
      leftbarTextsize: 16,
      leftbarIconsize: 24,
      leftbarItemPadding: "10px 20px 10px 25px",

      infoFooterBackground: "#fff",
      infoFooterColor: "#000",
      infoFooterSize: 12,

      tableHeaderBackground: "#ee0033",
      tableHeaderColor: "#fff",
      tableHeaderPadding: "8px",
      tableBodyHoverBackgroundColor: "transparent",
      tableBodyHoverColor: "#495057",
      tableBodyPadding: "3px",
      tableBodySelectedBackgroundColor: "#f2f4fa",
      tableBodySelectedColor: "#fff",
      tableBorderColor: "#dee2e6",
      boxMarginTop: 15,
      boxHeaderBackgroundColor: "#fff",
      boxHeaderColor: "#6c757d",
      boxHeaderSize: 13,
      boxHeaderHeight: 40,
      boxHeaderPadding: "0 15px 0 15px",
      boxBodyBackgroundColor: "#fff",
      boxBodyPadding: "0 15px 15px 15px",
      boxRadius: 5,

      pageToolbarBackgroundColor: "#fafafa",
      pageToolbarTitleColor: "#333",
      pageToolbarTitleSize: 16,
      pageToolbarTitleWeight: 400,
      pageToolbarIconColor: "#ee0033",
      pageToolbarIconHoverColor: "#28a745",

      modalHeaderBackgroudColor: "#ee0033",
      modalHeaderColor: "#fff",
      modalHeaderCloseColor: "#fff",
      modalHeaderPadding: "10px",
      modalHeaderSize: 18,
      modalBodyPadding: "15px",
      modalFooterPackgroudColor: "#fff",
      modalFooterPadding: "10px",

      groupInfoHeaderBackgroudColor: "green",
      groupInfoHeaderColor: "#fff",
      groupInfoHeaderPadding: "5px 5px 5px 10px",
      groupInfoHeaderSize: 16,

      ntsImageBackgroudColor: "#f4f4f4",

      successColor: "#fff",
      successBackgroundColor: "#28a745",
      successBorderColor: "#28a745",
      successHoverColor: "#fff",
      successHoverBackgroundColor: "#218838",
      successHoverBorderColor: "#1e7e34",

      infoColor: "#fff",
      infoBackgroundColor: "#17a2b8",
      infoBorderColor: "#17a2b8",
      infoHoverColor: "#fff",
      infoHoverBackgroundColor: "#138496",
      infoHoverBorderColor: "#117a8b",

      warningColor: "#fff",
      warningBackgroundColor: "#ffc107",
      warningBorderColor: "#ffc107",
      warningHoverColor: "#fff",
      warningHoverBackgroundColor: "#e0a800",
      warningHoverBorderColor: "#d39e00",

      dangerColor: "#fff",
      dangerBackgroundColor: "#ee0033",
      dangerBorderColor: "#ee0033",
      dangerHoverColor: "#fff",
      dangerHoverBackgroundColor: "#c82333",
      dangerHoverBorderColor: "#bd2130",

      primaryColor: "#fff",
      primaryBackgroundColor: "#007bff",
      primaryBorderColor: "#007bff",
      primaryHoverColor: "#fff",
      primaryHoverBackgroundColor: "#0069d9",
      primaryHoverBorderColor: "#0062cc",

      secondaryColor: "#fff",
      secondaryBackgroundColor: "#6c757d",
      secondaryBorderColor: "#6c757d",
      secondaryHoverColor: "#fff",
      secondaryHoverBackgroundColor: "#5a6268",
      secondaryHoverBorderColor: "#545b62",
    }
  ];

  isOpen = false;
  themeSelect: any = null;
  height = 400;

  ngOnInit(): void {
    this.height = window.innerHeight - 60;

    var saveTheme = localStorage.getItem('ntsThemeDefault');

    if (saveTheme) {
      this.themes.push(JSON.parse(saveTheme));
      this.themeSelect = this.themes[this.themes.length - 1];
    } else {
      this.themeSelect = this.themes[0];
    }

    // this.changeTheme();

    this.notifyService.onShowThemeChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        this.isOpen = data;
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  changeBodyBackground() {
    this.changeValueCss('-Body-background', this.themeSelect.bodyBackground);
  }

  changeBodyFontsize() {
    this.changeValueCss('--body-fontsize', this.themeSelect.bodyFontsize + 'px');
  }

  changeContentWrapperPadding() {
    this.changeValueCss('--content-wrapper-padding', this.themeSelect.contentWrapperPadding);
  }

  changeTopbarLogoBackground() {
    this.changeValueCss('--topbar-logo-background', this.themeSelect.topbarLogoBackground);
  }

  changeTopbarLogoColor() {
    this.changeValueCss('--topbar-logo-color', this.themeSelect.topbarLogoColor);
  }

  changeTopbarLogoSize() {
    this.changeValueCss('--topbar-logo-size', this.themeSelect.topbarLogoSize + 'px');
  }

  changeTopbarBackground() {
    this.changeValueCss('--topbar-background', this.themeSelect.topbarBackground);
  }

  changeTopbarColor() {
    this.changeValueCss('--topbar-color', this.themeSelect.topbarColor);
  }

  changeTopbarSize() {
    this.changeValueCss('--topbar-size', this.themeSelect.topbarSize + 'px');
  }

  changeTopbarSearchBackground() {
    this.changeValueCss('--topbar-search-background', this.themeSelect.topbarSearchBackground);
  }

  changeTopbarSearchColor() {
    this.changeValueCss('--topbar-search-color', this.themeSelect.topbarSearchColor);
  }

  changeTopbarSearchSize() {
    this.changeValueCss('--topbar-search-size', this.themeSelect.topbarSearchSize + 'px');
  }

  changeTopbarSearchIconColor() {
    this.changeValueCss('--topbar-search-icon-color', this.themeSelect.topbarSearchIconColor);
  }



  changeLeftbarBackground() {
    this.changeValueCss('--leftbar-background', this.themeSelect.leftbarBackground);
  }

  changeLeftbarTextColor() {
    this.changeValueCss('--leftbar-text-color', this.themeSelect.leftbarTextColor);
  }

  changeLeftbarIconColor() {
    this.changeValueCss('--leftbar-icon-color', this.themeSelect.leftbarIconColor);
  }

  changeLeftbarBackgroundHover() {
    this.changeValueCss('--leftbar-hover-background', this.themeSelect.leftbarHoverBackground);
  }

  changeLeftbarHoverColor() {
    this.changeValueCss('--leftbar-hover-color', this.themeSelect.leftbarHoverColor);
  }

  changeLeftbarHoverShadow() {
    this.changeValueCss('--leftbar-hover-shadow', this.themeSelect.leftbarHoverShadow);
  }

  changeLeftbarActiveBackground() {
    this.changeValueCss('--leftbar-active-background', this.themeSelect.leftbarActiveBackground);
  }

  changeLeftbarActiveColor() {
    this.changeValueCss('--leftbar-active-color', this.themeSelect.leftbarActiveColor);
  }

  changeLeftbarActiveShadow() {
    this.changeValueCss('--leftbar-active-shadow', this.themeSelect.leftbarActiveShadow);
  }

  changeLeftbarTextsize() {
    this.changeValueCss('--leftbar-text-size', this.themeSelect.leftbarTextsize + 'px');
  }

  changeLeftbarIconsize() {
    this.changeValueCss('--leftbar-icon-size', this.themeSelect.leftbarIconsize + 'px');
  }

  changeLeftbarItemPadding() {
    this.changeValueCss('--leftbar-item-padding', this.themeSelect.leftbarItemPadding);
  }

  changeTableHeaderBackground() {
    this.changeValueCss('--table-header-background', this.themeSelect.tableHeaderBackground);
  }

  changeTableHeaderColor() {
    this.changeValueCss('--table-header-color', this.themeSelect.tableHeaderColor);
  }

  changeTableHeaderPadding() {
    this.changeValueCss('--table-header-padding', this.themeSelect.tableHeaderPadding);
  }

  changeTableBodyHoverBackgroundColor() {
    this.changeValueCss('--table-body-hover-background-color', this.themeSelect.tableBodyHoverBackgroundColor);
  }

  changeTableBodyHoverColor() {
    this.changeValueCss('--table-body-hover-color', this.themeSelect.tableBodyHoverColor);
  }

  changeTableBodyPadding() {
    this.changeValueCss('--table-body-padding', this.themeSelect.tableBodyPadding);
  }

  changeTableBodySelectedBackgroundColor() {
    this.changeValueCss('--table-body-selected-background-color', this.themeSelect.tableBodySelectedBackgroundColor);
  }

  changeTableBodySelectedColor() {
    this.changeValueCss('--table-body-selected-color', this.themeSelect.tableBodySelectedColor);
  }

  changeTableBorderColor() {
    this.changeValueCss('--table-border-color', this.themeSelect.tableBorderColor);
  }


  changeBoxMarginTop() {
    this.changeValueCss('--box-margin-top', this.themeSelect.boxMarginTop + 'px');
  }

  changeBoxHeaderBackgroundColor() {
    this.changeValueCss('--box-header-background-color', this.themeSelect.boxHeaderBackgroundColor);
  }

  changeBoxHeaderColor() {
    this.changeValueCss('--box-header-color', this.themeSelect.boxHeaderColor);
  }

  changeBoxHeaderSize() {
    this.changeValueCss('--box-header-size', this.themeSelect.boxHeaderSize + 'px');
  }

  changeBoxHeaderHeight() {
    this.changeValueCss('--box-header-height', this.themeSelect.boxHeaderHeight + 'px');
  }

  changeBoxHeaderPadding() {
    this.changeValueCss('--box-header-padding', this.themeSelect.boxHeaderPadding);
  }

  changeBoxBodyBackgroundColor() {
    this.changeValueCss('--box-body-background-color', this.themeSelect.boxBodyBackgroundColor);
  }

  changeBoxBodyPadding() {
    this.changeValueCss('--box-body-padding', this.themeSelect.boxBodyPadding);
  }

  changeBoxRadius() {
    this.changeValueCss('--box-radius', this.themeSelect.boxRadius + "px");
  }

  changePageToolbarBackgroundColor() {
    this.changeValueCss('--page-toolbar-background-color', this.themeSelect.pageToolbarBackgroundColor);
  }

  changePageToolbarTitleColor() {
    this.changeValueCss('--page-toolbar-title-color', this.themeSelect.pageToolbarTitleColor);
  }

  changePageToolbarTitleSize() {
    this.changeValueCss('--page-toolbar-title-size', this.themeSelect.pageToolbarTitleSize + 'px');
  }

  changePageToolbarTitleWeight() {
    this.changeValueCss('--page-toolbar-title-weight', this.themeSelect.pageToolbarTitleWeight);
  }

  changePageToolbarIconColor() {
    this.changeValueCss('--page-toolbar-icon-color', this.themeSelect.pageToolbarIconColor);
  }

  changePageToolbarIconHoverColor() {
    this.changeValueCss('--page-toolbar-icon-hover-color', this.themeSelect.pageToolbarIconHoverColor);
  }

  changeModalHeaderBackgroudColor() {
    this.changeValueCss('--modal-header-background-color', this.themeSelect.modalHeaderBackgroudColor);
  }

  changeModalHeaderColor() {
    this.changeValueCss('--modal-header-color', this.themeSelect.modalHeaderColor);
  }

  changeModalHeaderCloseColor() {
    this.changeValueCss('--modal-header-close-color', this.themeSelect.modalHeaderCloseColor);
  }

  changeModalHeaderPadding() {
    this.changeValueCss('--modal-header-padding', this.themeSelect.modalHeaderPadding);
  }

  changeModalHeaderSize() {
    this.changeValueCss('--modal-header-size', this.themeSelect.modalHeaderSize + "px");
  }

  changeModalBodyPadding() {
    this.changeValueCss('--modal-body-padding', this.themeSelect.modalBodyPadding);
  }

  changeModalFooterBackgroudColor() {
    this.changeValueCss('--modal-footer-background-color', this.themeSelect.modalFooterBackgroudColor);
  }

  changeModalFooterPadding() {
    this.changeValueCss('--modal-footer-padding', this.themeSelect.modalFooterPadding);
  }


  changeGroupInfoHeaderBackgroudColor() {
    this.changeValueCss('--group-info-header-background-color', this.themeSelect.groupInfoHeaderBackgroudColor);
  }

  changeGroupInfoHeaderColor() {
    this.changeValueCss('--group-info-header-color', this.themeSelect.groupInfoHeaderColor);
  }

  changeGroupInfoHeaderPadding() {
    this.changeValueCss('--group-info-header-padding', this.themeSelect.groupInfoHeaderPadding);
  }

  changeGroupInfoHeaderSize() {
    this.changeValueCss('--group-info-header-size', this.themeSelect.groupInfoHeaderSize + "px");
  }


  changentsImageBackgroudColor() {
    this.changeValueCss('--ntsimage-background-color', this.themeSelect.ntsImageBackgroudColor);
  }

  changentCSSControl() {
    this.changeValueCss('--success-color', this.themeSelect.successColor);
    this.changeValueCss('--success-background-color', this.themeSelect.successBackgroundColor);
    this.changeValueCss('--success-border-color', this.themeSelect.successBorderColor);
    this.changeValueCss('--success-hover-color', this.themeSelect.successHoverColor);
    this.changeValueCss('--success-hover-background-color', this.themeSelect.successHoverBackgroundColor);
    this.changeValueCss('--success-hover-border-color', this.themeSelect.successHoverBorderColor);

    this.changeValueCss('--info-color', this.themeSelect.infoColor);
    this.changeValueCss('--info-background-color', this.themeSelect.infoBackgroundColor);
    this.changeValueCss('--info-border-color', this.themeSelect.infoBorderColor);
    this.changeValueCss('--info-hover-color', this.themeSelect.infoHoverColor);
    this.changeValueCss('--info-hover-background-color', this.themeSelect.infoHoverBackgroundColor);
    this.changeValueCss('--info-hover-border-color', this.themeSelect.infoHoverBorderColor);

    this.changeValueCss('--warning-color', this.themeSelect.warningColor);
    this.changeValueCss('--warning-background-color', this.themeSelect.warningBackgroundColor);
    this.changeValueCss('--warning-border-color', this.themeSelect.warningBorderColor);
    this.changeValueCss('--warning-hover-color', this.themeSelect.warningHoverColor);
    this.changeValueCss('--warning-hover-background-color', this.themeSelect.warningHoverBackgroundColor);
    this.changeValueCss('--warning-hover-border-color', this.themeSelect.warningHoverBorderColor);

    this.changeValueCss('--danger-color', this.themeSelect.dangerColor);
    this.changeValueCss('--danger-background-color', this.themeSelect.dangerBackgroundColor);
    this.changeValueCss('--danger-border-color', this.themeSelect.dangerBorderColor);
    this.changeValueCss('--danger-hover-color', this.themeSelect.dangerHoverColor);
    this.changeValueCss('--danger-hover-background-color', this.themeSelect.dangerHoverBackgroundColor);
    this.changeValueCss('--danger-hover-border-color', this.themeSelect.dangerHoverBorderColor);

    this.changeValueCss('--primary-color', this.themeSelect.primaryColor);
    this.changeValueCss('--primary-background-color', this.themeSelect.primaryBackgroundColor);
    this.changeValueCss('--primary-border-color', this.themeSelect.primaryBorderColor);
    this.changeValueCss('--primary-hover-color', this.themeSelect.primaryHoverColor);
    this.changeValueCss('--primary-hover-background-color', this.themeSelect.primaryHoverBackgroundColor);
    this.changeValueCss('--primary-hover-border-color', this.themeSelect.primaryHoverBorderColor);

    this.changeValueCss('--secondary-color', this.themeSelect.secondaryColor);
    this.changeValueCss('--secondary-background-color', this.themeSelect.secondaryBackgroundColor);
    this.changeValueCss('--secondary-border-color', this.themeSelect.secondaryBorderColor);
    this.changeValueCss('--secondary-hover-color', this.themeSelect.secondaryHoverColor);
    this.changeValueCss('--secondary-hover-background-color', this.themeSelect.secondaryHoverBackgroundColor);
    this.changeValueCss('--secondary-hover-border-color', this.themeSelect.secondaryHoverBorderColor);
  }

  changeTheme() {

    this.changeBodyBackground();
    this.changeBodyFontsize();
    this.changeContentWrapperPadding();


    this.changeTopbarLogoBackground();
    this.changeTopbarLogoColor();
    this.changeTopbarLogoSize();
    this.changeTopbarBackground();
    this.changeTopbarColor();
    this.changeTopbarSize();
    this.changeTopbarSearchBackground();
    this.changeTopbarSearchColor();
    this.changeTopbarSearchSize();
    this.changeTopbarSearchIconColor();

    this.changeLeftbarBackground();
    this.changeLeftbarTextColor();
    this.changeLeftbarIconColor();
    this.changeLeftbarBackgroundHover();
    this.changeLeftbarActiveBackground();
    this.changeLeftbarActiveColor();
    this.changeLeftbarTextsize();
    this.changeLeftbarIconsize();
    this.changeLeftbarHoverColor();
    this.changeLeftbarItemPadding();

    this.changeTableHeaderBackground();
    this.changeTableHeaderColor();
    this.changeTableHeaderPadding();
    this.changeTableBodyHoverBackgroundColor();
    this.changeTableBodyHoverColor();
    this.changeTableBodyPadding();
    this.changeTableBodySelectedBackgroundColor();
    this.changeTableBodySelectedColor();
    this.changeTableBorderColor();

    this.changeBoxMarginTop();
    this.changeBoxHeaderBackgroundColor();
    this.changeBoxHeaderColor();
    this.changeBoxHeaderSize();
    this.changeBoxHeaderHeight();
    this.changeBoxHeaderPadding();
    this.changeBoxBodyBackgroundColor();
    this.changeBoxBodyPadding();
    this.changeBoxRadius();

    this.changePageToolbarBackgroundColor();
    this.changePageToolbarIconColor();
    this.changePageToolbarIconHoverColor();
    this.changePageToolbarTitleColor();
    this.changePageToolbarTitleSize();
    this.changePageToolbarTitleWeight();

    this.changeModalHeaderBackgroudColor();
    this.changeModalHeaderColor();
    this.changeModalHeaderCloseColor();
    this.changeModalHeaderPadding();
    this.changeModalHeaderSize();
    this.changeModalFooterBackgroudColor();
    this.changeModalFooterPadding();

    this.changentsImageBackgroudColor();
  }

  downloadTheme() {
    var link = document.createElement("a");
    link.href = "data:application/json;charset=UTF-8," + encodeURIComponent(JSON.stringify(this.themeSelect));;

    link.setAttribute("download", "theme.json");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  changeValueCss(key: string, value: string) {
    document.documentElement.style.setProperty(key, value);
  }

  saveTheme() {
    var saveTheme = Object.assign({}, this.themeSelect);
    saveTheme.Name = "Save theme";
    localStorage.setItem('ntsThemeDefault', JSON.stringify(saveTheme));
  }

  close() {
    this.notifyService.showTheme(false);
  }

  deleteTheme() {
    localStorage.removeItem('ntsThemeDefault');
    this.themes.splice(this.themes.length - 1, 1);
    this.themeSelect = this.themes[0];
    this.changeTheme();
  }
}
