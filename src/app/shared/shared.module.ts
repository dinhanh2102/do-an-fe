import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import {
    TruncatePipe, FilterInListPipe, FilterBadgeClassInListPipe, FilterTextClassInListPipe,
    NtsNumberIntDirective, NtsLocationDirective, DateUtils, AppSetting, UisectionboxDirective, SafeHtmlPipe, DisablePermission
} from '../shared';
import { UipermissionDirective, DiablePermissionDirective } from '../shared';
import { NtscurrencyDirective } from './directives/ntscurrency.directive';
import { NtscurrencyPipe } from './pipe/ntscurrency.pipe';
import { NtsNumberDirective } from './directives/ntsnumber.directive';
import { PagingComponent } from './paging/paging.component';
import {
    NgbDateVNParserFormatter, MessageconfirmComponent, MessageComponent,
} from '../shared';

import { ComponentService } from './services/component.service';
import { DownloadService } from './services/download.service';

import { MessageconfirmcodeComponent } from './component/messageconfirmcode/messageconfirmcode.component';
import { NtsStatusBadgeComponent } from './component/nts-status-badge/nts-status-badge.component';
import { NtsStatusComponent } from './component/nts-status/nts-status.component';
import { ImportExcelComponent } from './component/import-excel/import-excel.component';
import { from } from 'rxjs';
import { NtsCheckboxComponent } from './component/nts-checkbox/nts-checkbox.component';
import { SwitchLanguageComponent } from './component/switch-language/switch-language.component';
import { NTSSearchBarComponent } from './component/nts-search-bar/nts-search-bar.component';
import { NtsHorizontalStepperComponent } from './component/nts-horizontal-stepper/nts-horizontal-stepper.component';
import { ChartScrollableComponent } from './component/chart-scroll/chart-scrollable.component';
import { NtsTextMoreComponent } from './component/nts-text-more/nts-text-more.component';
import { NtsImageComponent } from './component/nts-image/nts-image.component';
import { NtsEjsDropdowntreeComponent } from './component/nts-ejs-dropdowntree/nts-ejs-dropdowntree.component';
import { DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';
import { NtsViewFileComponent } from './component/nts-view-file/nts-view-file.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { ImageViewerComponent } from './component/image-viewer/image-viewer.component';
import { NtsTinymceComponent } from './tinymce/nts-tinymce.component';
import { NtsNumberPipe } from './pipe/ntsnumber.pipe';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

@NgModule({
    declarations: [
        TruncatePipe,
        FilterInListPipe,
        FilterBadgeClassInListPipe,
        FilterTextClassInListPipe,
        UipermissionDirective,
        DiablePermissionDirective,
        NtscurrencyDirective,
        NtscurrencyPipe,
        NtsNumberPipe,
        NtsNumberDirective,
        PagingComponent,
        MessageconfirmComponent,
        MessageComponent,
        NtsNumberIntDirective,
        NtsLocationDirective,
        UisectionboxDirective,
        MessageconfirmcodeComponent,
        NtsStatusBadgeComponent,
        NtsStatusComponent,
        ImportExcelComponent,
        SafeHtmlPipe,
        NtsCheckboxComponent,
        SwitchLanguageComponent,
        NTSSearchBarComponent,
        NtsHorizontalStepperComponent,
        NtsEjsDropdowntreeComponent,
        ChartScrollableComponent,
        NtsTextMoreComponent,
        NtsImageComponent,
        DisablePermission,
        NtsViewFileComponent,
        ImageViewerComponent,
        NtsTinymceComponent,
    ],
    imports: [
        FormsModule,
        CommonModule,
        NgbModule,
        NgSelectModule,
        DropDownTreeModule,
        PdfJsViewerModule,
        PerfectScrollbarModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoader,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        { provide: NgbDateParserFormatter, useClass: NgbDateVNParserFormatter }
    ],
    entryComponents: [
        MessageconfirmComponent,
        MessageComponent,
        MessageconfirmcodeComponent,
        ImportExcelComponent,
    ],
    exports: [
        TruncatePipe,
        FilterInListPipe,
        FilterBadgeClassInListPipe,
        FilterTextClassInListPipe,
        NtscurrencyPipe,
        NtsNumberPipe,
        UipermissionDirective,
        DiablePermissionDirective,
        NtscurrencyDirective,
        NtsNumberDirective,
        PagingComponent,
        MessageconfirmComponent,
        MessageComponent,
        NtsNumberIntDirective,
        NtsLocationDirective,
        UisectionboxDirective,
        DiablePermissionDirective,
        NtsStatusBadgeComponent,
        NtsStatusComponent,
        SafeHtmlPipe,
        NtsCheckboxComponent,
        SwitchLanguageComponent,
        NTSSearchBarComponent,
        NtsHorizontalStepperComponent,
        NtsEjsDropdowntreeComponent,
        ChartScrollableComponent,
        NtsTextMoreComponent,
        NtsImageComponent,
        DisablePermission,
        NtsViewFileComponent,
        NtsTinymceComponent
    ]
})

export class SharedModule { 
}

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
    return new MultiTranslateHttpLoader(http, [{ prefix: '/assets/i18n/cores/label/', suffix: '.json' },
    { prefix: '/assets/i18n/cores/message/', suffix: '.json' },
    { prefix: '/assets/i18n/projects/label/', suffix: '.json' },
    { prefix: '/assets/i18n/projects/message/', suffix: '.json' },
    { prefix: '/assets/i18n/modules/label/', suffix: '.json' },
    { prefix: '/assets/i18n/modules/message/', suffix: '.json' },]);
  }