import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Constants, DateUtils, MessageService } from 'src/app/shared';
import { KyCongService } from '../../services/ky-cong.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/services/language.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditSettingsModel, IEditCell, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { FormGroup } from '@angular/forms';
import { DropDownList } from '@syncfusion/ej2-angular-dropdowns';
import { ViewNgayCongComponent } from '../view-ngay-cong/view-ngay-cong.component';

@Component({
  selector: 'app-bang-cong-chi-tiet',
  templateUrl: './bang-cong-chi-tiet.component.html',
  styleUrls: ['./bang-cong-chi-tiet.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BangCongChiTietComponent implements OnInit {

  constructor(public dateUtils: DateUtils,
    private activeModal: NgbActiveModal,
    private messageService: MessageService,
    private service: KyCongService,
    private modalService: NgbModal,

    public constant: Constants,
    private translate: TranslateService,
    private routeA: ActivatedRoute,
    private router: Router,
    private lgService: LanguageService) { }
  listDay: any[] = Array.from({ length: 31 }, (_, index) => index + 1);
  model: any = {

  }
  years: any[] = [];

  idKyCong: string;
  listKyCongChiTiet: any[] = []
  startIndex: number = 1;

  public editSettings?: EditSettingsModel;
  public toolbar?: ToolbarItems[];
  groupUser: string;
  // Định nghĩa dropdownFields
  ngOnInit() {
    this.groupUser = JSON.parse(localStorage.getItem('CurrentUser')).userGroupId;
    this.idKyCong = this.routeA.snapshot.paramMap.get('id');
    const currentYear = new Date().getFullYear();
    const yearsBeforeAndAfter = 10; // số năm trước và sau năm hiện tại
    for (let i = currentYear - yearsBeforeAndAfter; i <= currentYear + yearsBeforeAndAfter; i++) {
      this.years.push({ Id: i, Name: 'Năm ' + i, Checked: false, BadgeClass: 'badge-success' });
    }
    this.setupMonth();
    this.setupYear();
    this.phatSinhKyCong()
    this.getListKyCongChiTiet()
  }

  // Phương thức xử lý sự kiện thay đổi của dropdown
  public onDropdownChange(args: any, rowData: any): void {
    // Lấy giá trị đã chọn từ dropdown
    const selectedValue = args.value;

    // Xử lý các thay đổi dữ liệu tương ứng với lựa chọn của dropdown ở đây
    console.log('Dữ liệu đã chọn:', selectedValue);
    console.log(this.listKyCongChiTiet);

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
  save() {
    console.log(this.listKyCongChiTiet);

  }
  closeModal() {
    this.router.navigate(['control/manage/bang-cong/']);
  }
  listHeader: any[] = []
  title: string = "";
  soNgayTrongThang: number = 0;
  modelData: any;
  getListKyCongChiTiet() {
    this.service.getListKyCongChiTiet(this.idKyCong).subscribe(data => {
      console.log(data.data);
      this.modelData = data.data;
      this.listKyCongChiTiet = data.data.congChiTietResults;
      this.listHeader = data.data.ngayHeaders;
      this.soNgayTrongThang = data.data.soNgayTrongThang;
      this.title = data.data.title;
      for (const item of this.listKyCongChiTiet) {
        item.stt = this.startIndex++; // Gán số thứ tự và tăng biến đếm
      }
    }, error => {
      this.messageService.showError(error);
    })
  }
  phatSinhKyCong() {
    this.model.idKyCong = this.idKyCong;
    this.service.phatSinhKyCong(this.model).subscribe(data => {
      this.getListKyCongChiTiet();

    }, error => {
      this.messageService.showError(error);
    })
  }
  xemBangLuong() {
    this.router.navigate(['/control/manage/view-bang-luong/' + this.idKyCong]);
  }


  showThongTinNgay(id: string, ngay: number, maNhanVien: string) {
    let activeModal = this.modalService.open(ViewNgayCongComponent, { container: 'body', windowClass: 'app-view-ngay-cong', backdrop: 'static' })
    activeModal.componentInstance.id = id;
    activeModal.componentInstance.idKyCong = this.idKyCong;
    activeModal.componentInstance.ngay = ngay;
    activeModal.componentInstance.thang = this.modelData.thang;
    activeModal.componentInstance.nam = this.modelData.nam;
    activeModal.componentInstance.maNhanVien = maNhanVien;

    activeModal.result.then((result) => {
      if (result) {
        this.getListKyCongChiTiet();
        this.phatSinhKyCong()

      } else {
        this.getListKyCongChiTiet();
        this.phatSinhKyCong()

      }
    }, (reason) => {
    });
  }
}
