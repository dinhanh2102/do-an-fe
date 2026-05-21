import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ComboboxService, Configuration, Constants, FileProcess, MessageService } from 'src/app/shared';
import { Router } from '@angular/router';
import { SearchGlobalService } from 'src/app/shared/common/search-global.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/services/language.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ConfigInterfaceService } from 'src/app/cores/systemconfig/service/configInterface.service';
import { PhuCapService } from '../phu-cap.service';

@Component({
  selector: 'app-phu-cap-nhan-vien-create',
  templateUrl: './phu-cap-nhan-vien-create.component.html',
  styleUrls: ['./phu-cap-nhan-vien-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PhuCapNhanVienCreateComponent implements OnInit {
  constructor(
    private activeModal: NgbActiveModal,
    public constant: Constants,
    private service: PhuCapService,
    private messageService: MessageService,
    public config: Configuration,
    private router: Router,
    private configInterfaceService: ConfigInterfaceService,
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
  id: '';
  idPhuCap: string;
  isAction: boolean = false;

  ngOnInit(): void {
    this.lgService.onLanguageChanged.pipe().subscribe(languageCode => {
      if (languageCode) {
        this.translate.use(languageCode);
      }
    });
    this.model.idPhuCap = this.idPhuCap;
    if (!this.id) {
      this.modalInfo.Title = "Thêm mới phụ cấp nhân viên";
    } else {
      this.modalInfo.Title = "Chỉnh sửa phụ cấp nhân viên";
      this.getPhuCapNhanVienById(this.id);
    }
    this.getNhanVien();
    this.getPhuCap();
  }

  // soTien: any;
  // formatNumber() {
  //   this.soTien = Number(this.soTien.replace(/\D/g, '')).toLocaleString();
  //   this.model.soTien = parseInt(this.soTien.replace(/\./g, ''), 10);
  // }

  getPhuCapNhanVienById(id: string) {
    this.service.getPhuCapNhanVienById(id).subscribe(
      (data: any) => {
        this.model = data.data;
        this.getNhanVien();
        this.getPhuCap();
        // this.soTien = Number(this.model.soTien.toString().replace(/\D/g, '')).toLocaleString();
      }, error => {
        this.messageService.showError(error);
      });
  }

  save(isContinue: boolean) {
    if (!this.id) {
      this.create(isContinue);
    } else {
      this.update();
    }
  }

  create(isContinue: any) {
    this.service.createPhuCapNhanVien(this.model).subscribe(
      (data: any) => {
        this.messageService.showSuccess("Thêm mới thành công");
        if (isContinue) {
          this.isAction = true;
          this.clear();
        } else {
          this.activeModal.close(true);
        }
      },
      error => {
        this.messageService.showError(error);
      });
  }

  update() {
    this.service.updatePhuCapNhanVien(this.id, this.model).subscribe(
      (data: any) => {
        this.messageService.showSuccess("Chỉnh sửa thành công");
        this.activeModal.close(true);
      },
      error => {
        this.messageService.showError(error);
      });
  }

  closeModal(isOK: boolean) {
    this.activeModal.close(isOK ? isOK : this.isAction);
  }

  lstPhuCap: any[] = [];
  getPhuCap() {
    this.comboboxService.getPhuCap().subscribe(
      (data: any) => {
        this.lstPhuCap = data.data;
      }, error => {
        this.messageService.showError(error);
      });
  }

  lstNhanVien: any[] = [];
  getNhanVien() {
    this.comboboxService.getNhanVien().subscribe(
      (data: any) => {
        this.lstNhanVien = data.data;
      }, error => {
        this.messageService.showError(error);
      });
  }

  clear() {
    this.model = {};
  }
}
