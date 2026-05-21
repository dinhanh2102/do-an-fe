import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ComboboxService, Constants, DateUtils, FileProcess, MessageService } from 'src/app/shared';
import { LanguageService } from 'src/app/shared/services/language.service';
import { BangLuongService } from '../services/bang-luong.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-bang-luong',
  templateUrl: './bang-luong.component.html',
  styleUrls: ['./bang-luong.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class BangLuongComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private lgService: LanguageService,
    private comboboxService: ComboboxService,
    public messageService: MessageService,
    public constant: Constants,
    private dateUtils: DateUtils,
    private routeA: ActivatedRoute,
    private router: Router,
    private service: BangLuongService,
    private fileProcess: FileProcess,
  ) {
    this.translate.use(this.lgService.getLanguage());
    // this.setDefaultDateRange();
  }
  id: any;
  searchModel: any = {};
  years: any[] = [];
  ngOnInit(): void {
    this.id = this.routeA.snapshot.paramMap.get('id');
    if (this.id) {

      this.searchModel.idKyCong = this.id;
    }
    const currentYear = new Date().getFullYear();
    const yearsBeforeAndAfter = 10; // số năm trước và sau năm hiện tại
    for (let i = currentYear - yearsBeforeAndAfter; i <= currentYear + yearsBeforeAndAfter; i++) {
      this.years.push({ Id: i, Name: 'Năm ' + i, Checked: false, BadgeClass: 'badge-success' });
    }
    this.setupMonth();
    this.setupYear();
    this.phatSinhBangLuong();
    this.search();
  }

  setupMonth() {
    // Lấy tháng hiện tại
    let currentDate = new Date();
    let currentMonthIndex = currentDate.getMonth();

    // Đổi chỉ mục thành số tháng bắt đầu từ 1 đến 12
    let currentMonthNumber = currentMonthIndex + 1;
    this.searchModel.thang = currentMonthNumber;
  }

  setupYear() {
    // Lấy năm hiện tại
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    this.searchModel.nam = currentYear;

  }

  listBangLuong: any[] = [];
  title: any;
  search() {
    this.service.search(this.searchModel).subscribe((data: any) => {
      if (data.isStatus) {
        const result = data.data?.result ?? data.data;
        this.listBangLuong = result?.dataResults ?? [];
        this.title = result?.title;

      }
    }, error => {
      this.messageService.showError(error);
    });
  }

  refresh() {
    this.searchModel = {};
    this.search();
  }

  export() {
    this.service.export(this.searchModel).subscribe((data: any) => {
      if (data.size == 0) {
        this.messageService.showWarning('Không có dữ liệu không thể xuất file Excel');
      } else {
        var blob = new Blob([data], { type: 'octet/stream' });
        var url = window.URL.createObjectURL(blob);
        this.fileProcess.downloadFileLink(url, "Bảng lương.xlsx");
      }
    }, error => {
      const blb = new Blob([error.error], { type: "text/plain" });
      const reader = new FileReader();

      reader.onload = () => {
        if (reader && reader.result)
          this.messageService.showMessage(reader.result.toString().replace('"', '').replace('"', ''));
      };
      // Start reading the blob as text.
      reader.readAsText(blb);
    });
  }

  closeModal(isOK: boolean) {

    this.router.navigate(['/control/manage/bang-cong']);
  }
  phatSinhBangLuong() {
    this.service.create(this.searchModel).subscribe(data => {
      this.search();
    }
      , error => {
        this.messageService.showError(error);
      })

  }
}
