import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from 'src/app/cores/auth/guards/auth.guard';
import { LoaiCaManageComponent } from './loai-ca/loai-ca-manage/loai-ca-manage.component';
import { LoaiCongCreateComponent } from './loai-cong/loai-cong-create/loai-cong-create.component';
import { LoaiCongManageComponent } from './loai-cong/loai-cong-manage/loai-cong-manage.component';
import { KyCongManageComponent } from './ky-cong/ky-cong-manage/ky-cong-manage.component';
import { BangCongChiTietComponent } from './ky-cong/bang-cong-chi-tiet/bang-cong-chi-tiet.component';
import { BangLuongComponent } from './bang-luong/bang-luong.component';

const routes: Routes = [
  {
    path: 'manage',
    canActivate: [AuthGuard],
    children: [
      { path: 'loai-ca', component: LoaiCaManageComponent, pathMatch: 'LoaiCa' },
      { path: 'loai-cong', component: LoaiCongManageComponent, pathMatch: 'LoaiCong' },
      { path: 'bang-cong', component: KyCongManageComponent, pathMatch: 'BangCong' },
      { path: 'bang-cong/view/:id', component: BangCongChiTietComponent, data: { animation: 'BangCongView' } },
      { path: 'bang-luong', component: BangLuongComponent, pathMatch: 'BangLuong' },
      { path: 'view-bang-luong/:id', component: BangLuongComponent, pathMatch: 'ViewBangLuong' },


    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [NgbActiveModal]
})
export class ControlRoutingModule { }
