import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserManageComponent } from './user/user-manage/user-manage.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { GroupUserManageComponent } from './group-user/group-user-manage/group-user-manage.component';
import { GroupUserCreateComponent } from './group-user/group-user-create/group-user-create.component';
import { UserViewComponent } from './user/user-view/user-view.component';
import { UserInfoComponent } from './user/user-info/user-info.component';
import { UserHistoryComponent } from './user-history/user-history.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { PermissionManageComponent } from './permission/permission-manage/permission-manage.component';
import { PermissionUpdateComponent } from './permission/permission-update/permission-update.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';


@NgModule({
  declarations: [
    UserManageComponent,
    UserCreateComponent,
    GroupUserManageComponent,
    GroupUserCreateComponent,
    UserViewComponent,
    UserInfoComponent,
    UserHistoryComponent,
    ForgotPasswordComponent,
    PermissionManageComponent,
    PermissionUpdateComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgbModule,
    PerfectScrollbarModule,
    NgSelectModule,
    SharedModule,
    FormsModule,
    TreeGridModule,
    ListViewModule,
    ButtonModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ]
})
export class UserModule { }
// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [{ prefix: '/assets/i18n/cores/label/', suffix: '.json' },
  { prefix: '/assets/i18n/cores/message/', suffix: '.json' },
  { prefix: '/assets/i18n/projects/label/', suffix: '.json' },
  { prefix: '/assets/i18n/projects/message/', suffix: '.json' },
  { prefix: '/assets/i18n/modules/label/', suffix: '.json' },
  { prefix: '/assets/i18n/modules/message/', suffix: '.json' },]);
}
