import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { DragDropModule } from '@angular/cdk/drag-drop';
// import { CurrencyMaskModule } from 'ng2-currency-mask';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';

import { NhanVienRoutingModule } from './nhan-vien-routing.module';
import { NhanVienManagerComponent } from './nhan-vien-manager/nhan-vien-manager.component';
import { NhanVienCreateComponent } from './nhan-vien-create/nhan-vien-create.component';
import { NhanVienTabComponent } from './nhan-vien-tab/nhan-vien-tab.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { WebcamComponent } from './webcam/webcam.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    NhanVienManagerComponent,
    NhanVienCreateComponent,
    NhanVienTabComponent,
    WebcamComponent
  ],
  providers: [NgbActiveModal],
  imports: [
    CommonModule,
    NhanVienRoutingModule,
    // VirtualScrollerModule,
    NgbModule,
    PerfectScrollbarModule,
    NgSelectModule,
    PdfJsViewerModule,
    FormsModule,
    TreeGridModule,
    DragDropModule,
    ReactiveFormsModule,
    // CurrencyMaskModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    SharedModule
  ]
})
export class NhanVienModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [{ prefix: '/assets/i18n/cores/label/', suffix: '.json' },
  { prefix: '/assets/i18n/cores/message/', suffix: '.json' },
  { prefix: '/assets/i18n/projects/label/', suffix: '.json' },
  { prefix: '/assets/i18n/projects/message/', suffix: '.json' },
  { prefix: '/assets/i18n/modules/label/', suffix: '.json' },
  { prefix: '/assets/i18n/modules/message/', suffix: '.json' },]);
}