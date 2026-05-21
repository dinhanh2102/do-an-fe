import { Component, Input, OnInit, ViewChild, ViewEncapsulation, } from "@angular/core";
import { ComboboxService } from "src/app/shared/services/combobox.service";
import { LanguageService } from "src/app/shared/services/language.service";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppSetting, Configuration, Constants, DateUtils, FileProcess, MessageService, } from "src/app/shared";
import { Subject } from "rxjs";
import { NgbModal, NgbNav } from "@ng-bootstrap/ng-bootstrap";
import { TreeGridComponent } from "@syncfusion/ej2-angular-treegrid";
import { UserService } from "src/app/cores/system/service/user.service";
import { NhanVienService } from "../service/nhan-vien.service";

@Component({
  selector: 'app-nhan-vien-tab',
  templateUrl: './nhan-vien-tab.component.html',
  styleUrls: ['./nhan-vien-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NhanVienTabComponent implements OnInit {
  constructor(
    public fileProcess: FileProcess,
    private routeA: ActivatedRoute,
    public appSetting: AppSetting,
    private messageService: MessageService,
    public constant: Constants,
    public config: Configuration,
    public dateUtils: DateUtils,
    private router: Router,
    private translate: TranslateService,
    private lgService: LanguageService,
    private modalService: NgbModal,
    private comboboxService: ComboboxService,
    private service: NhanVienService,
    private userService: UserService
  ) {
    this._unsubscribeAll = new Subject();
    this.translate.use(this.lgService.getLanguage());
  }
  _unsubscribeAll: Subject<any>;
  model: any = {};
  @ViewChild("nav", { static: true }) nav: NgbNav;
  @ViewChild("treegrid")
  public treegrid: TreeGridComponent;
  height = 0;
  id: string;

  ngOnInit(): void {
    this.lgService.onLanguageChanged.pipe().subscribe((languageCode) => {
      if (languageCode) {
        this.translate.use(languageCode);
      }
    });

    this.id = this.routeA.snapshot.paramMap.get("id");
    // this.appSetting.PageTitle = "Xem nhân sự";
    this.height = window.innerHeight - 620;
    const typeValue = parseInt(this.routeA.snapshot.paramMap.get("type"), 10);
    if (isNaN(typeValue)) {
      this.goToTab(1);
    } else {
      this.goToTab(typeValue);
    }
  }

  chechFunctions: boolean = false;
  goToTab(tabNumber: number) {
    this.nav.select(tabNumber);
    this.router.navigate(["/nhan-vien/view/" + this.id + "/" + tabNumber]);
  }

  closeModal(isOK: boolean) {
    this.router.navigate(["/nhan-vien"]);
  }

  // getQuyen(){

  // }
  // listTap: string[] = [];

  // checkIsViewBySetting() {
  //   this.service.getTapOnSelect().subscribe(
  //     (data) => {
  //       this.listTap = data.result;
  //     },
  //     (error) => {
  //       this.messageService.showError(error);
  //     }
  //   );
  // }
}
