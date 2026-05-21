import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS,HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ToastrModule } from 'ngx-toastr';
import { BlockUIModule } from 'ng-block-ui';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Configuration } from './shared';
import { L10n } from '@syncfusion/ej2-base';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { JwtInterceptor } from './cores/auth/helpers';
import { AuthGuard } from './cores/auth/guards/auth.guard';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

L10n.load({
  'en-US': {
    grid: {
      EmptyRecord: "Not data",
    }
  }
});

export function initializeApp(appConfig: Configuration) {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BlockUIModule.forRoot({
      delayStart: 1000,
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      closeButton: true
    }),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient]
      }
  })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [Configuration],
      multi: true
    },
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [{ prefix: '/assets/i18n/cores/label/', suffix: '.json' },
  { prefix: '/assets/i18n/cores/message/', suffix: '.json' },
  { prefix: '/assets/i18n/projects/label/', suffix: '.json' },
  { prefix: '/assets/i18n/projects/message/', suffix: '.json' },
  { prefix: '/assets/i18n/modules/label/', suffix: '.json' },
  { prefix: '/assets/i18n/modules/message/', suffix: '.json' },]);
}
