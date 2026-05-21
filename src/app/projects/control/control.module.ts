import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeRoutingModule } from "../home/home-routing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { NgSelectModule } from "@ng-select/ng-select";
import { SharedModule } from "src/app/shared/shared.module";
import { FormsModule } from "@angular/forms";
import { ButtonModule, CheckBoxModule } from "@syncfusion/ej2-angular-buttons";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { httpTranslateLoader } from "../home/home.module";
import { HttpClient } from "@angular/common/http";
import { ControlRoutingModule } from "./control-routing.module";
import { LoaiCaManageComponent } from "./loai-ca/loai-ca-manage/loai-ca-manage.component";
import { LoaiCaCreateComponent } from "./loai-ca/loai-ca-create/loai-ca-create.component";
import { LoaiCongCreateComponent } from "./loai-cong/loai-cong-create/loai-cong-create.component";
import { LoaiCongManageComponent } from "./loai-cong/loai-cong-manage/loai-cong-manage.component";
import { AutoCompleteModule, DropDownListModule, MultiSelectModule } from "@syncfusion/ej2-angular-dropdowns";
import { EditService, FreezeService, GridModule, GroupService, PageService, SortService, ToolbarService } from "@syncfusion/ej2-angular-grids";
import { KyCongCreateComponent } from "./ky-cong/ky-cong-create/ky-cong-create.component";
import { KyCongManageComponent } from "./ky-cong/ky-cong-manage/ky-cong-manage.component";
import { TreeGridModule } from "@syncfusion/ej2-angular-treegrid";
import { BangCongChiTietComponent } from "./ky-cong/bang-cong-chi-tiet/bang-cong-chi-tiet.component";
import { BrowserModule } from "@angular/platform-browser";
import { ViewNgayCongComponent } from "./ky-cong/view-ngay-cong/view-ngay-cong.component";
import { BangLuongComponent } from './bang-luong/bang-luong.component';
@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModule,
    PerfectScrollbarModule,
    NgSelectModule,
    SharedModule,
    FormsModule,
    // BrowserModule,
    MultiSelectModule,
    AutoCompleteModule,
    ControlRoutingModule,
    TreeGridModule,
    DropDownListModule,
    GridModule,
    ButtonModule,
    CheckBoxModule, 
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  declarations: [
    LoaiCaManageComponent,
    LoaiCaCreateComponent,
    LoaiCongCreateComponent,
    LoaiCongManageComponent,
    KyCongCreateComponent,
    KyCongManageComponent,
    BangCongChiTietComponent,
    ViewNgayCongComponent,
    BangLuongComponent,
  ],
  providers:[
    EditService, ToolbarService, SortService, PageService,FreezeService
  ]
})
export class ControlModule {}
