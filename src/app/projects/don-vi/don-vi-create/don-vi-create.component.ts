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
  selector: 'app-don-vi-create',
  templateUrl: './don-vi-create.component.html',
  styleUrls: ['./don-vi-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DonViCreateComponent implements OnInit {
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

    if (!this.id) {
      this.modalInfo.Title = "Thêm mới đơn vị";
      this.getDonViCha();
    } else if (this.id) {
      this.modalInfo.Title = "Thêm mới đơn vị";
      this.model.parentId = this.id;
      this.getDonViCha();
    } else {
      this.modalInfo.Title = "Thêm mới đơn vị";
    }
  }

  save(isContinue: boolean) {
    this.create(isContinue);
  }

  create(isContinue: any) {
    this.donViService.createDonVi(this.model).subscribe(
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

  closeModal(isOK: boolean) {
    this.activeModal.close(isOK ? isOK : this.isAction);
  }

  lstDonVi: any[] = [];
  getDonViCha() {
    this.donViService.getDonVi('').subscribe(
      (data: any) => {
        this.lstDonVi = data.data;
      }, error => {
        this.messageService.showError(error);
      });
  }

  clear() {
    var idCha = this.model.parentId;
    this.model = {
      parentId: idCha
    };
  }

}
