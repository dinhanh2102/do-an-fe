import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService, Constants, DateUtils } from 'src/app/shared';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/services/language.service';
import { TreeGridComponent, extendArray } from '@syncfusion/ej2-angular-treegrid';
import { KyCongService } from '../../services/ky-cong.service';

@Component({
  selector: 'app-loai-cong-create',
  templateUrl: './ky-cong-create.component.html',
  styleUrls: ['./ky-cong-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class KyCongCreateComponent implements OnInit {

  constructor(
    public dateUtils: DateUtils,
    private activeModal: NgbActiveModal,
    private messageService: MessageService,
    private service: KyCongService,
    public constant: Constants,
    private translate: TranslateService,
    private lgService: LanguageService
  ) { this.translate.use(this.lgService.getLanguage()); }
  @ViewChild('treegrid')
  public treegrid: TreeGridComponent;
  years: any[] = [];

  modalInfo = {
    Title: 'Thêm mới kỳ công',
    SaveText: 'Lưu',
  };
  height = 0;
  isAction: boolean = false;
  id: string;

  model: any = {
    khoa : 1,
    trangThai: 1
  }

  ngOnInit(): void {
    this.height = window.innerHeight - 580;
    if (this.id) {
      this.modalInfo.Title = 'Chỉnh sửa kỳ công';
      this.modalInfo.SaveText = 'Lưu';
      this.getKyCongInfo();
    }
    else {
      this.modalInfo.Title = "Thêm mới kỳ công";
    }
    const currentYear = new Date().getFullYear();
    const yearsBeforeAndAfter = 10; // số năm trước và sau năm hiện tại
    for (let i = currentYear - yearsBeforeAndAfter; i <= currentYear + yearsBeforeAndAfter; i++) {
      this.years.push({ Id: i, Name: 'Năm ' + i, Checked: false, BadgeClass: 'badge-success' });
    }
    this.setupMonth();
    this.setupYear();

  }
  setupMonth() {
    // Lấy tháng hiện tại
    let currentDate = new Date();
    let currentMonthIndex = currentDate.getMonth();

    // Đổi chỉ mục thành số tháng bắt đầu từ 1 đến 12
    let currentMonthNumber = currentMonthIndex + 1;
    this.model.thang = currentMonthNumber;
  }

  setupYear() {
    // Lấy năm hiện tại
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    this.model.nam = currentYear;

  }

  //Get thông tin kỳ công
  getKyCongInfo() {
    this.service.getKyCongInfo(this.id).subscribe(result => {
      if (result.isStatus) {
        setTimeout(() => {
          this.model = result.data;
          if (this.model.ngayTinhCong != null) {
            this.model.ngayTinhCong = this.dateUtils.convertDateToObject(
              this.model.ngayTinhCong
            );
          } else {
            this.model.ngayTinhCong = null;
          }
        }, 200);
      }
    }, error => {
      this.messageService.showError(error);
    });
  }

  //Thêm mới kỳ công
  create(isContinue: any) {
    this.service.createKyCong(this.model).subscribe(
      result => {
        if (result.isStatus) {
          this.messageService.showSuccess('Thêm mới kỳ công thành công!');
          if (isContinue) {
            this.isAction = true;
            this.clear();
          } else {
            this.closeModal(true);
          }
        }
      },
      error => {
        this.messageService.showError(error);
      });
  }

  //Cập nhật kỳ công
  update() {
    this.service.updateKyCong(this.id, this.model).subscribe(
      result => {
        if (result.isStatus) {
          this.activeModal.close(true);
          this.messageService.showSuccess('Cập nhật bảng công thành công!');
        }
      },
      error => {
        this.messageService.showError(error);
      });
  }

  //Lưu kỳ công
  save(isContinue: boolean) {
    if (this.model.ngayTinhCong != null) {
      this.model.ngayTinhCong = this.dateUtils.convertObjectToDate(this.model.ngayTinhCong)
    }
    //Tồn tại id thì cập nhật
    if (this.id) {
      this.update();
    } else {
      this.create(isContinue);
    }
  }

  //Lưu và tiếp tục
  saveAndContinue() {
    this.save(true);
  }

  //Đóng modal
  closeModal(isOK: boolean) {
    this.activeModal.close(isOK ? isOK : this.isAction);
  }

  //Clear dữ liệu trên giao diện
  clear() {
    this.model = {
      id: '',
      name: '',
      status: 1,
      description: '',
      listPermission: []
    };

    this.getKyCongInfo();
  }


}
