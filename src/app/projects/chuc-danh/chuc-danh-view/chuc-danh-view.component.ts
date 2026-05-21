import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ComboboxService, Configuration, Constants, FileProcess, MessageService } from 'src/app/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchGlobalService } from 'src/app/shared/common/search-global.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/services/language.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ChucDanhService } from '../chuc-danh.service';

@Component({
  selector: 'app-chuc-danh-view',
  templateUrl: './chuc-danh-view.component.html',
  styleUrls: ['./chuc-danh-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChucDanhViewComponent implements OnInit {
  @Input() id: string;
  constructor(
    private activeModal: NgbActiveModal,
    public constant: Constants,
    private chucDanhService: ChucDanhService,
    private messageService: MessageService,
    private router: Router,
    public config: Configuration,
    private routeA: ActivatedRoute,
    private searchGlobalService: SearchGlobalService,
    private comboboxService: ComboboxService,
    private translate: TranslateService,
    private lgService: LanguageService,
  ) {
    this._unsubscribeAll = new Subject();
    this.translate.use(this.lgService.getLanguage());
  }
  _unsubscribeAll: Subject<any>;
  model: any = {};
  modalInfo = {
    Title: '',
  };
  isView: boolean;
  // id: '';
  isAction: boolean = false;

  ngOnInit(): void {
    this.id = this.routeA.snapshot.paramMap.get('id');
    var view = this.routeA.snapshot.paramMap.get('isView');
    if (view === 'view') {
      this.isView = true;
    } else {
      this.isView = false;
    }

    this.lgService.onLanguageChanged.pipe().subscribe(languageCode => {
      if (languageCode) {
        this.translate.use(languageCode);
      }
    });
    this.getChucDanhById(this.id);
  }

  getChucDanhById(id: string) {
    this.chucDanhService.getChucDanhById(id).subscribe(
      (data: any) => {
        this.model = data.data;
        this.getFormatMoney(this.model.luongCoBan);
        this.getDonVi();
        this.getPhongBan();
      }, error => {
        this.messageService.showError(error);
      });
  }

  closeModal(isOK: boolean) {
    this.router.navigate(['/chuc-danh']);
  }

  lstDonVi: any[] = [];
  getDonVi() {
    this.comboboxService.getDonVi().subscribe(
      (data: any) => {
        this.lstDonVi = data.data;
        // this.getPhongBan();
      }, error => {
        this.messageService.showError(error);
      });
  }

  lstPhongBan: any[] = [];
  getPhongBan() {
    this.comboboxService.getPhongBanByIdDonVi(this.model.idDonVi).subscribe(
      (data: any) => {
        this.lstPhongBan = data.data;
      }, error => {
        this.messageService.showError(error);
      });
  }
  soTien: any;
  formatMoney(event: any) {
    let val1 = '';
    let val2 = '';
    if (event.target.value === "") {
      val1 = "";
    } else if (event.target.value.indexOf('.') !== -1) {
      val1 = event.target.value.substring(0, event.target.value.indexOf('.'));
      val2 = "." + event.target.value.split('.').pop();
    } else {
      val1 = event.target.value;
    }

    if (event.target.value !== "") {
      const n = BigInt(val1.replace(/\./g, ''));
      const p = n.toString().indexOf(',');

      this.soTien = n.toString().replace(/\d(?=(?:\d{3})+(?:\.|$))/g, (m, i) => p < 0 || i < p ? `${m},` : m) + val2;
    }
  }

  getFormatMoney(value: any) {
    let val1 = '';
    let val2 = '';
    let result = '';
    result = value.toString();

    if (result === "") {
      val1 = "";
    } else if (result.indexOf('.') !== -1) {
      val1 = result.substring(0, result.indexOf('.'));
      val2 = "." + result.split('.').pop();
    } else {
      val1 = result;
    }

    const n = BigInt(val1.replace(/\./g, ''));
    const p = n.toString().indexOf(',');

    this.soTien = n.toString().replace(/\d(?=(?:\d{3})+(?:\.|$))/g, (m, i) => p < 0 || i < p ? `${m},` : m) + val2;
  }
}
