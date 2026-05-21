import { ChangePasswordComponent } from './change-password/change-password.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HttpClient } from '@angular/common/http';

import { AuthRoutingModule } from './auth-routing.routing';
import { BlockUIModule } from 'ng-block-ui';
import { LoginComponent } from './login/login.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { SharedModule } from 'src/app/shared/shared.module';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

@NgModule({
    declarations: [        
        ChangePasswordComponent,
        LoginComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        AuthRoutingModule,
        BlockUIModule,
        SharedModule,
        NgbModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoader,
                deps: [HttpClient]
            }
        }),
        RecaptchaModule,
        RecaptchaFormsModule,
    ],
    exports:[LoginComponent],
    providers: [      
        {
            provide: RECAPTCHA_SETTINGS,
            useValue: {
              siteKey: "6Ld5wAEmAAAAAKrLewrdkHe298PKr5RgrstVAz6P",
            } as RecaptchaSettings,
          },
          
    ],
    entryComponents: [ChangePasswordComponent],
})

export class AuthModule {
   
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