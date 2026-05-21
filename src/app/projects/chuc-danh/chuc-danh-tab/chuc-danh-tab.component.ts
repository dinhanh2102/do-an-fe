import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { Constants, MessageService } from 'src/app/shared';


@Component({
  selector: 'app-chuc-danh-tab',
  templateUrl: './chuc-danh-tab.component.html',
  styleUrls: ['./chuc-danh-tab.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChucDanhTabComponent implements OnInit {
  @ViewChild('nav', { static: true }) nav: NgbNav;
  constructor(
    private routeA: ActivatedRoute,
    public constant: Constants,
    private router: Router,
    private route: ActivatedRoute,
    // private service: PhieuMuaHangService,
    private messageService: MessageService,
  ) { }
  model: number[] = [];
  id: string = '';
  tab: number = 0;
  isActive: number = 0;
  ngOnInit(): void {
    this.id = this.routeA.snapshot.paramMap.get('id');
    if (this.id == null || this.id == undefined || this.id == '') {
      this.isActive = 0;
      this.router.navigate(['/chuc-danh/create/'], {
        queryParams: {
          type: this.tab,
        }
      });
    } else {
      this.isActive = 2;
      this.route.queryParams.subscribe(params => {
        const type = params['type'];
        const status = params['status'];
        this.goToTab(type, status);
      });
    }
  }
  goToTab(type: number, status: boolean) {
    this.tab = type;
    this.router.navigate(['/chuc-danh/view/' + this.id], {
      queryParams: {
        type: this.tab,
        status: status,
      }
    });
  }

  close() {
    this.router.navigate(['/chuc-danh/']);
  }

}
