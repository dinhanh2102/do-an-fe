import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MenuManageComponent } from './menu-management/menu-manage.component';
import { MenuCreateComponent } from './menu-create/menu-create.component';
import { MenuRoutingModule } from './menu-routing.module';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { ContextMenuModule, TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OrderModule } from 'ngx-order-pipe';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { ConfigInterfaceCreateComponent } from './config-interface/config-interface-create/config-interface-create.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SharedModule } from 'src/app/shared/shared.module';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { ChoosePermissionAutoComponent } from './choose-permission-auto/choose-permission-auto.component';
import { PermissionCreateComponent } from './permission-create/permission-create.component';
@NgModule({
  declarations: [
    MenuManageComponent,
    MenuCreateComponent,
    ConfigInterfaceCreateComponent,
    ChoosePermissionAutoComponent,
    PermissionCreateComponent,
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    NgbModule,
    PerfectScrollbarModule,
    NgSelectModule,
    SharedModule,
    FormsModule,
    TreeGridModule,
    DragDropModule,
    GridModule, 
    OrderModule,
    MultiSelectModule,
    TreeViewModule,
    ContextMenuModule,
    ImageCropperModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient]
      }
  })   
  ],
  providers: [PageService,
    SortService,
    FilterService,
    GroupService] 
})
export class MenuModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [{ prefix: '/assets/i18n/cores/label/', suffix: '.json' },
  { prefix: '/assets/i18n/cores/message/', suffix: '.json' },
  { prefix: '/assets/i18n/projects/label/', suffix: '.json' },
  { prefix: '/assets/i18n/projects/message/', suffix: '.json' },
  { prefix: '/assets/i18n/modules/label/', suffix: '.json' },
  { prefix: '/assets/i18n/modules/message/', suffix: '.json' },]);
}