import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ComboboxService, Configuration, Constants, FileProcess, MessageService } from 'src/app/shared';
import { Router } from '@angular/router';
import { SearchGlobalService } from 'src/app/shared/common/search-global.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/services/language.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { DonViService } from '../don-vi.service';
import { ConfigInterfaceService } from 'src/app/cores/systemconfig/service/configInterface.service';
@Component({
  selector: 'app-phong-ban-create',
  templateUrl: './phong-ban-create.component.html',
  styleUrls: ['./phong-ban-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PhongBanCreateComponent implements OnInit {
  constructor(
    private activeModal: NgbActiveModal,
    public constant: Constants,
    private donViService: DonViService,
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
  idDonVi: string;
  isAction: boolean = false;

  ngOnInit(): void {
    this.lgService.onLanguageChanged.pipe().subscribe(languageCode => {
      if (languageCode) {
        this.translate.use(languageCode);
      }
    });
    this.getDonVi();
    this.model.idDonVi = this.idDonVi;
    if (!this.id) {
      this.modalInfo.Title = "Thêm mới phòng ban";
    } else {
      this.modalInfo.Title = "Chỉnh sửa phòng ban";
      this.getNhanVien();
      this.getPhongBanById(this.id);
    }
  }

  getPhongBanById(id: string) {
    this.donViService.getPhongBanById(id).subscribe(
      (data: any) => {
        this.model = data.data;
        this.getDonVi();
        this.getNhanVien();
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
    this.donViService.createPhongBan(this.model).subscribe(
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
    this.donViService.updatePhongBan(this.id, this.model).subscribe(
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

  lstNhanVien: any[] = [];
  getNhanVien() {
    this.comboboxService.getPhongBanByIdDonVi(this.id).subscribe(
      (data: any) => {
        this.lstNhanVien = data.data;
      }, error => {
        this.messageService.showError(error);
      });
  }

  lstDonVi: any[] = [];
  getDonVi() {
    this.comboboxService.getDonVi().subscribe(
      (data: any) => {
        this.lstDonVi = data.data;
      }, error => {
        this.messageService.showError(error);
      });
  }

  clear() {
    var idDonVi = this.model.idDonVi;
    this.model = {
      idDonVi: idDonVi
    };
  }
}
