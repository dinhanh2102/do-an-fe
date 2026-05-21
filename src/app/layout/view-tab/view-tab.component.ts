import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { AppSetting, MessageService } from 'src/app/shared';
import { slideInAnimation } from '../animations/router.animations';
import { NtsNavigationService } from '../navigation/navigation.service';
import { MenuService } from 'src/app/cores/systemconfig/service/menu.service';
//import { navigation } from '../navigation/navigation';

@Component({
  selector: 'app-view-tab',
  templateUrl: './view-tab.component.html',
  styleUrls: ['./view-tab.component.scss'],
  animations: [
    slideInAnimation
    // animation triggers go here
  ],
  encapsulation: ViewEncapsulation.None
})
export class ViewTabComponent implements OnInit {

  constructor(
    private router: Router,
    public appSetting: AppSetting,
    private _ntsNavigationService: NtsNavigationService,
    private messageService: MessageService,
    private menuService: MenuService,
    //private activatedRoute: ActivatedRoute
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (!this.check) {
          this.add(event.url);
        } else {
          this.check = false;
        }
      }

      if (event instanceof NavigationError) {
        // Handle error
        console.error(event.error);
      }

      if (event instanceof NavigationEnd) {
        //do something on end activity
      }
    });
  }

  listPage: any[] = [
    // { id: 1, name: 'Quản lý hồ sơ nhiệm vụ', url: "/pbcpnc/ho-so-nhiem-vu", icon: 'mdi mdi-file-document-multiple' },
    // { id: 2, name: 'Phân bổ công theo công việc', url: "/pbcpnc/xem-danh-sach-cong", icon: 'mdi mdi-timetable' },
    // { id: 2, name: 'Tình hình SD CP', url: "/pbcpnc/xem-danh-sach-chi-phi-nhan-cong", icon: 'mdi mdi-currency-usd' },
    // { id: 2, name: 'Báo cáo chấm công', url: "/bao-cao/bao-cao-cham-cong-theo-cong-viec", icon: 'mdi mdi-file-chart' },
    // { id: 2, name: 'Phân quyền chức năng', url: "/bao-cao/phan-quyen-chuc-nang", icon: 'mdi mdi-account-key' }
  ]

  navigation: any;
  model: any = {
    id: null,
    name: '',
    url: '',
    icon: '',
  }

  ngOnInit(): void {

    let menu = JSON.parse(localStorage.getItem('menu'));
        this._ntsNavigationService.register('menu', menu);
        this._ntsNavigationService.setCurrentNavigation('menu');

        if (this._ntsNavigationService.isCurrentNavigation()) {
          this.navigation = menu;
          this.navigation.forEach((element: { url: any; icon: any; title: any; }) => {
            var data = Object.assign({}, this.model);
            data.id = this.counter++;
            data.url = element.url;
            data.icon = element.icon;
            data.name = element.title;

            this.listPage.push(data);
          });
        }
    //this.events.preventDefault();
    // const window = new Window();
    // const newEvent = new MouseEvent('click', { bubbles: true });
    // newEvent.initMouseEvent(
    //   'click', true, false, window, 1, 1759, -71, 223, 74, false, false, false, false, 0, null
    // );
    // //this.events.stopImmediatePropagation();
    //this.add(this.events, false,);
  }

  tabs: any[] = [];
  title: any[] = [];
  counter = this.tabs.length + 1;
  check = false;
  active: any = null;
  listHistory: any[] = [];

  close(toRemove: number) {
    this.tabs = this.tabs.filter(i => i.id !== toRemove);
    this.listHistory = this.listHistory.filter(i => i !== toRemove);
    if (this.tabs.length > 0 && toRemove == this.active) {
      this.active = this.listHistory[this.listHistory.length - 1];
      var data = this.tabs.filter(i => i.id == this.active);
      if (data.length > 0) {
        this.refreshLink(data[0].url, data[0].id);
      }
    }
  }

  add(link: string) {
    var check = this.tabs.filter(i => i.url == link);
    if (check.length > 0) {
      this.active = check[0].id;
      this.refreshLink(check[0].url, check[0].id);
      this.listHistory = this.listHistory.filter(i => i !== this.active);
      this.listHistory.push(this.active);
    } else {
      var navigation = this.listPage.filter(i => i.url == link);
      if (navigation.length > 0) {
        var data = Object.assign({}, this.model);
        data.id = this.counter++;
        data.url = link;
        data.icon = navigation[0].icon;
        data.name = navigation[0].name;

        this.tabs.push(data);
        this.active = data.id;
        this.listHistory.push(this.active);
      }
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  refreshLink(url: string, action: number) {
    this.check = true;
    this.active = action;
    this.router.navigate([url]);
  }

  scrollNext() {
    let top = document.getElementById('menuView');
    if (top !== null) {
      top.scrollTo({ left: top.scrollLeft + 1000 });
      top = null;
    }
  }

  scrollBack() {
    let top = document.getElementById('menuView');
    if (top !== null) {
      top.scrollTo({ left: top.scrollLeft - 1000 });
      top = null;
    }
  }
}
