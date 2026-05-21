import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, Constants, DateUtils } from 'src/app/shared';
import { LanguageService } from 'src/app/shared/services/language.service';
import { KyCongService } from '../../services/ky-cong.service';

@Component({
  selector: 'app-view-ngay-cong',
  templateUrl: './view-ngay-cong.component.html',
  styleUrls: ['./view-ngay-cong.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class ViewNgayCongComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    public constant: Constants,
    public service: KyCongService,
    private dateUtils: DateUtils,
    private translate: TranslateService,
    private lgService: LanguageService,) { }
  titleForm: any;
  row: any;
  model: any = {

  }
  idKyCong: any;
  id: any;
  title: any;
  thang: any;
  nam: any;
  ngay: any;
  maNhanVien: any;
  groupUser: any; 
  ngOnInit() {
    this.groupUser = JSON.parse(localStorage.getItem('CurrentUser')).userGroupId;
    if (this.id) {
      this.getChamCongDetail();
    } else {

    }
    this.title = "Chấm công ngày " + this.ngay + "/" + this.thang;

  }
  closeModal(isOk: boolean) {
    this.activeModal.close();
  }
  getChamCongDetail() {
    this.service.detailChamCong(this.id).subscribe(data => {
      this.model = data.data;
    })
  }
  save() {
    if (this.id) {
      this.update();
    } else {
      this.create();
    }
  }
  create() {
    debugger

    this.model.ngay = this.ngay;
    this.model.maNhanVien = this.maNhanVien;
    this.model.idKyCong = this.idKyCong;
    this.model.thang = this.thang;
    this.model.nam = this.nam;

    this.service.createBangCong(this.model).subscribe(data => {
      this.closeModal(true)
    }, error => {
      this.messageService.showError(error);
    })
  }
  update() {
    this.service.updateChamCong(this.id, this.model).subscribe(data => {
      this.getChamCongDetail()
      this.messageService.showSuccess("Cập nhật thành công.")
      this.closeModal(true);
    }, error => {
      this.messageService.showError(error);
    })
  }
  checkAndClearGioVao(maxValue: number) {
    if (this.model.gioVao >= maxValue) {
      // Nếu giá trị nhập vào lớn hơn giá trị tối đa, xóa giá trị
      this.model.gioVao = null;
      this.messageService.showWarning("Giá trị giới hạn trong khoảng: 1 - " + maxValue);
    }
  }
  checkAndClearGioRa(maxValue: number) {

    if (this.model.gioRa >= maxValue) {
      // Nếu giá trị nhập vào lớn hơn giá trị tối đa, xóa giá trị
      this.model.gioRa = null;
      this.messageService.showWarning("Giá trị giới hạn trong khoảng: 1 - " + maxValue);
    }
  }
  checkAndClearPhutRa(maxValue: number) {

    if (this.model.phutRa >= maxValue) {
      // Nếu giá trị nhập vào lớn hơn giá trị tối đa, xóa giá trị
      this.model.phutRa = null;
      this.messageService.showWarning("Giá trị giới hạn trong khoảng: 1 - " + maxValue);
    }
  }
  checkAndClearPhutVao(maxValue: number) {

    if (this.model.phutVao >= maxValue) {
      // Nếu giá trị nhập vào lớn hơn giá trị tối đa, xóa giá trị
      this.model.phutVao = null;
      this.messageService.showWarning("Giá trị giới hạn trong khoảng: 1 - " + maxValue);
    }
  }
  clear(){
    this.service.deleteChamCong(this.id).subscribe(data => {
      this.messageService.showSuccess("Xóa thành công.")
      this.closeModal(true);
    }, error => {
      this.messageService.showError(error);
    })

  }

}
