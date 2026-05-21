import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ContextMenuService, FilterService, PageService, SortService, ToolbarService, TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from 'src/app/shared/shared.module';

import { PhuCapRoutingModule } from './phu-cap-routing.module';
import { PhuCapComponent } from './phu-cap/phu-cap.component';
import { PhuCapCreateComponent } from './phu-cap-create/phu-cap-create.component';
import { PhuCapNhanVienCreateComponent } from './phu-cap-nhan-vien-create/phu-cap-nhan-vien-create.component';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';


@NgModule({
  declarations: [
    PhuCapComponent,
    PhuCapCreateComponent,
    PhuCapNhanVienCreateComponent,
  ],
  imports: [
    CommonModule,
    PhuCapRoutingModule,
    NgbModule,
    PerfectScrollbarModule,
    NgSelectModule,
    FormsModule,
    TreeGridModule,
    DragDropModule,
    CurrencyMaskModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    DatePipe,
    ContextMenuService,
    PageService,
    SortService,
    FilterService,
    ToolbarService
  ],
})
export class PhuCapModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [{ prefix: '/assets/i18n/cores/label/', suffix: '.json' },
  { prefix: '/assets/i18n/cores/message/', suffix: '.json' },
  { prefix: '/assets/i18n/projects/label/', suffix: '.json' },
  { prefix: '/assets/i18n/projects/message/', suffix: '.json' },
  { prefix: '/assets/i18n/modules/label/', suffix: '.json' },
  { prefix: '/assets/i18n/modules/message/', suffix: '.json' },]);
}