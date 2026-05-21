import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChucDanhRoutingModule } from './chuc-danh-routing.module';
import { ChucDanhComponent } from './chuc-danh/chuc-danh.component';
import { ChucDanhCreateComponent } from './chuc-danh-create/chuc-danh-create.component';
import { FormsModule, NgForm } from '@angular/forms';
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
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { ChucDanhTabComponent } from './chuc-danh-tab/chuc-danh-tab.component';
import { ChucDanhViewComponent } from './chuc-danh-view/chuc-danh-view.component';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

@NgModule({
  declarations: [
    ChucDanhTabComponent,
    ChucDanhComponent,
    ChucDanhCreateComponent,
    ChucDanhViewComponent
  ],
  imports: [
    ChucDanhRoutingModule,
    CommonModule,
    CheckBoxModule,
    NgbModule,
    GridModule,
    PerfectScrollbarModule,
    NgSelectModule,
    SharedModule,
    FormsModule,
    FormsModule,
    TreeGridModule,
    ButtonModule,
    DragDropModule,
    CurrencyMaskModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    SharedModule
  ],
  providers: [
    NgbActiveModal,
  ]
})
export class ChucDanhModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [{ prefix: '/assets/i18n/cores/label/', suffix: '.json' },
  { prefix: '/assets/i18n/cores/message/', suffix: '.json' },
  { prefix: '/assets/i18n/projects/label/', suffix: '.json' },
  { prefix: '/assets/i18n/projects/message/', suffix: '.json' },
  { prefix: '/assets/i18n/modules/label/', suffix: '.json' },
  { prefix: '/assets/i18n/modules/message/', suffix: '.json' },]);
}