import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MessageService, Constants, ComboboxService } from 'src/app/shared';
import { SearchGlobalService } from 'src/app/shared/common/search-global.service';
import { MenuOptions } from 'src/app/shared/models';
import { LanguageService } from 'src/app/shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { KyCongCreateComponent } from '../ky-cong-create/ky-cong-create.component';
import { EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-treegrid';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { Router } from '@angular/router';
import { KyCongService } from '../../services/ky-cong.service';

@Component({
  selector: 'app-loai-cong-manage',
  templateUrl: './ky-cong-manage.component.html',
  styleUrls: ['./ky-cong-manage.component.scss']
})
export class KyCongManageComponent implements OnInit {

  constructor(
    private messageService: MessageService,
    private modalService: NgbModal,
    private serviceKyCong: KyCongService,
    public constant: Constants,
    private searchGlobalService: SearchGlobalService,
    private translate: TranslateService,
    private lgService: LanguageService,
    private comboboxService: ComboboxService,
    private router: Router,

  ) {
    this._unsubscribeAll = new Subject();
    this.translate.use(this.lgService.getLanguage());
  }

  _unsubscribeAll: Subject<any>;
  searchModel: any;
  years: number[] = [];
  model: any = {
    thang: null,
    nam: null,
  }
  ngOnInit(): void {
    //Hứng sự kiện thay đổi ngôn ngữ để load lại Component
    this.lgService.onLanguageChanged.pipe().subscribe(languageCode => {
      if (languageCode) {
        this.translate.use(languageCode);
      }
    });

    //Khởi tạo model search
    this.initModelSearch();

    //Nhận giá trị khi thay đổi điều kiên tìm kiếm
    this.searchGlobalService.onDataChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
      if (data) {
        this.searchModel.name = data.name;
        this.searchModel.type = data.type;
        this.searchModel.pageNumber = data.pageNumber;
        this.search();
      }
    });

    //Thực hiện làm mới dữ liệu khi
    this.searchGlobalService.onRefreshData.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
      if (data) {
        this.clearData();
      }
    });
    this.getListyear();
    this.setToolbarConfig();
  }

  //Khởi tạo model tìm kiếm
  initModelSearch() {
    this.searchModel = {
      pageSize: 10,
      totalItems: 0,
      pageNumber: 1,
      orderBy: '',
      orderType: '',
      name: '',
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.searchGlobalService.setConfig(null);
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  //Cấu hình thanh công cụ tìm kiếm
  setToolbarConfig() {
    let meuOptions: MenuOptions = {
      isExcel: false,
      isPDF: false,
      isSearch: true,
      searchModel: this.searchModel,
      searchOptions: {
        FieldContentName: 'name',
        Placeholder: 'Tìm kiếm tên kỳ công',
        Items: [
        ]
      }
    };

    this.searchGlobalService.setConfig(meuOptions);
  }

  kyCongs: any[] = [];
  startIndex = 0;
  //CLick order bay thei trường
  clickOrderBy(orderBy: any) {
    this.searchModel.orderBy = orderBy;
    if (this.searchModel.orderType == "ASC") {
      this.searchModel.orderType = "DESC";
    } else {
      this.searchModel.orderType = "ASC";
    }
    this.search();
  }

  //Tìm kiếm kỳ công
  search() {
    this.serviceKyCong.searchKyCong(this.searchModel).subscribe((data: any) => {
      if (data.isStatus) {
        //Gán số thứ tự đầu tiên
        this.startIndex = ((this.searchModel.pageNumber - 1) * this.searchModel.pageSize + 1);
        this.kyCongs = data.data.dataResults;
        this.searchModel.totalItems = data.data.totalItems;
      }
    }, error => {
      this.messageService.showError(error);
    });
  }

  //làm mới dữ liệu
  clearData() {
    //Khởi tạo model tìm kiếm
    this.initModelSearch();
    this.setToolbarConfig();
  }

  //Xác nhận xóa
  showConfirmDelete(Id: string) {
    this.messageService.showConfirm("Bạn có chắc muốn xoá kỳ công này không?").then(
      data => {
        this.delete(Id);
      }
    );
  }

  //Xóa kỳ công
  delete(Id: string) {
    this.serviceKyCong.deleteKyCong(Id).subscribe(
      data => {
        if (data.isStatus) {
          this.messageService.showSuccess('Xóa kỳ công thành công!');
          this.search();
        }
      },
      error => {
        this.messageService.showError(error);
      });
  }

  //Show chức năng thêm mới, cập nhật
  showCreateUpdate(id: string) {
    let activeModal = this.modalService.open(KyCongCreateComponent, { container: 'body', windowClass: 'loai-ca-create', backdrop: 'static' })
    activeModal.componentInstance.id = id;
    activeModal.result.then((result) => {
      if (result) {
        this.search();
      }
    }, (reason) => {
    });
  }

  getListyear() {
    const currentYear = new Date().getFullYear();
    const yearsBeforeAndAfter = 10; // số năm trước và sau năm hiện tại
    for (let i = currentYear - yearsBeforeAndAfter; i <= currentYear + yearsBeforeAndAfter; i++) {
      this.years.push(i);
    }
  }
  
  xemBangCong(id: any) {
    this.router.navigate(['control/manage/bang-cong/view/' + id]);

  }
}


