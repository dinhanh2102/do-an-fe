import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgSelectModule } from '@ng-select/ng-select';


import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.routing';
import { SharedModule } from '../shared/shared.module';
import { ScreenWaitComponent } from './screen-wait/screen-wait.component';
import { FooterComponent } from './footer/footer.component';
import { ViewTabComponent } from './view-tab/view-tab.component';
import { PageToolbarComponent } from './page-toolbar/page-toolbar.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LeftBarComponent } from './left-bar/left-bar.component';
import { NavCollapsableComponent } from './collapsable/collapsable.component';
import { NavItemComponent } from './item/item.component';
import { NotifyModule } from '../cores/notify/notify.module';
//import { PageModule } from '../cores/page/page.module';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { ThemeComponent } from './theme/theme.component';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
    declarations: [
        LayoutComponent,
        TopBarComponent,
        LeftBarComponent,
        NavCollapsableComponent,
        NavItemComponent,
        ScreenWaitComponent,
        FooterComponent,
        ViewTabComponent,
        PageToolbarComponent,
        ThemeComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        LayoutRoutingModule,
        SharedModule,
        NgbModule,
        PerfectScrollbarModule,
        NotifyModule,
        // PageModule,
        NgSelectModule,
        ColorPickerModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoader,
                deps: [HttpClient]
            }
        })
    ],
  exports:[
    ThemeComponent
  ],
    providers: [
    ],
    entryComponents: [],
})

export class LayoutModule {
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