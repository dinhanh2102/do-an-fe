import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Constants, MessageService, Configuration, ComboboxService, AppSetting, DateUtils } from 'src/app/shared';
import { SearchGlobalService } from 'src/app/shared/common/search-global.service';
import { MenuOptions } from 'src/app/shared/models';
import { homeService } from './home.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/services/language.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  constructor(
    public constant: Constants,
    private homeservice: homeService,
    private messageService: MessageService,
    public config: Configuration,
    private router: Router,
    private searchGlobalService: SearchGlobalService,
    private comboboxService: ComboboxService,
    private translate: TranslateService,
    private lgService: LanguageService,
    public appSetting: AppSetting,
    public dateUtils: DateUtils,

  ) {
    this._unsubscribeAll = new Subject();
    this.translate.use(this.lgService.getLanguage());
  }
  _unsubscribeAll: Subject<any>;
  ListData: any[] = [];
  ListDay: any[] = [];
  ListViewModel: any[] = [];
  user: any;
  userId: string;
  userType: number;
  keyCaheSearch: string;
  searchModel: any = {
    Thang: '',
    Nam: '',
  }
  currentUser: any = {
    fullName: ''
  };
  public primaryXAxis?: Object;
  public title?: string;
  public primaryYAxis?: Object;
  public marker?: Object;
  public connector?: Object;
  public sum: number[] = [8];
  public intermediate: number[] = [4, 7];
  public columnWidth: number = 0.6;
  listCus: any = []
  listKhoaHoc: any[] = [];

  khoaHocData = [
    { name: 'Khóa Đào tạo cấp CCCM Đánh tín hiệu tàu bay - Khóa 6', progress: 65 },
    { name: 'Khóa đào tạo cấp CCCM Giam sát hàng không Khóa 12', progress: 87 },
    { name: 'Khóa đào tạo cấp CCCM Chuyên ngành AIS K', progress: 30 },
    { name: 'Khóa đào tạo cấp chứng chỉ huấn luyện viên chuyên ngành', progress: 70 },
    { name: 'Khóa đào tạo CCCM Chuyên ngành Giám sát HK 2020 - K2', progress: 82 }
  ];
  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    
    // You can add more options to customize the appearance of the chart here
  };
  public barChartType: ChartType = 'bar';
  // public barChartLegend = true;

  // public barChartDatasets: ChartDataSets[] = [
  //   {
  //     data: [54, 42, 75, 110, 23, 87, 50], label: 'Số giờ học', backgroundColor: [
  //       'rgba(255, 99, 132, 0.2)', // pink
  //       'rgba(54, 162, 235, 0.2)',  // blue
  //       'rgba(255, 206, 86, 0.2)',  // yellow
  //       'rgba(75, 192, 192, 0.2)',  // green
  //       'rgba(153, 102, 255, 0.2)', // purple
  //       'rgba(255, 159, 64, 0.2)',  // orange
  //       'rgba(199, 199, 199, 0.2)'  // grey
  //     ],
  //     borderColor: [
  //       'rgba(255,99,132,1)',
  //       'rgba(54, 162, 235, 1)',
  //       'rgba(255, 206, 86, 1)',
  //       'rgba(75, 192, 192, 1)',
  //       'rgba(153, 102, 255, 1)',
  //       'rgba(255, 159, 64, 1)',
  //       'rgba(199, 199, 199, 1)'
  //     ],
  //     borderWidth: 1
  //   },
  // ];

  public barChartLabels: string[] = ['Physics', 'Philosophy','Khóa Đào tạo cấp CCCM Đánh tín hiệu tàu bay - Khóa 6', 'Khóa đào tạo cấp CCCM Giam sát hàng không Khóa 12', 'Khóa đào tạo cấp CCCM Chuyên ngành AIS K', 'Khóa đào tạo cấp chứng chỉ huấn luyện viên chuyên ngành', 'Khóa đào tạo CCCM Chuyên ngành Giám sát HK 2020 - K2', ];


  tasks = [
    { name: 'Research', phase: 'Meeting', progress: 60, color: '#ff6f1e' },
    // ... other tasks
  ];
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('BKContech_CurrentUser')) || {};


    this.getListkhoaHoc();

  }

  getListkhoaHoc() {
    this.homeservice.getKhoaHoc().subscribe(data => {
      this.listKhoaHoc = data.data;
    })
  }
  generateRandomColor(): string {
    // Function to generate a random color
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getSymbolLabel(name: string): string {
    // Function to get the first letter of the record
    return name.charAt(0).toUpperCase();
  }

  getColorAndLabel(item: any): { color: string; label: string } {
    // Function to get random color and symbol label
    const color = this.generateRandomColor();
    const label = this.getSymbolLabel(item.name); // Change 'name' to the actual property you want to use
    return { color, label };
  }
  
}
