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
  selector: 'app-don-vi-update',
  templateUrl: './don-vi-update.component.html',
  styleUrls: ['./don-vi-update.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DonViUpdateComponent implements OnInit {
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
  isAction: boolean = false;

  ngOnInit(): void {
    this.lgService.onLanguageChanged.pipe().subscribe(languageCode => {
      if (languageCode) {
        this.translate.use(languageCode);
      }
    });

    this.modalInfo.Title = "Chỉnh sửa đơn vị";
    this.model.id = this.id;
    this.getDonViById();
  }

  getDonViById() {
    this.donViService.getDonViById(this.id).subscribe(
      (data: any) => {
        this.model = data.data;
        this.getDonViCha();
      }, error => {
        this.messageService.showError(error);
      });
  }

  update() {
    this.donViService.updateDonVi(this.id, this.model).subscribe(
      (data: any) => {
        this.messageService.showSuccess("Cập nhật thành công");
        this.activeModal.close(true);
      },
      error => {
        this.messageService.showError(error);
      });
  }

  lstDonVi: any[] = [];
  getDonViCha() {
    this.donViService.getDonVi(this.id).subscribe(
      (data: any) => {
        this.lstDonVi = data.data;
      }, error => {
        this.messageService.showError(error);
      });
  }

  save(isContinue: boolean) {
    this.update();
  }

  closeModal(isOK: boolean) {
    this.activeModal.close(isOK ? isOK : this.isAction);
  }
}
