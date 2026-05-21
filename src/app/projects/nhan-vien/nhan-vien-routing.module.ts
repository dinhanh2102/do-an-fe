import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/cores/auth/guards/auth.guard';
import { NhanVienManagerComponent } from './nhan-vien-manager/nhan-vien-manager.component';
import { NhanVienCreateComponent } from './nhan-vien-create/nhan-vien-create.component';
import { NhanVienTabComponent } from './nhan-vien-tab/nhan-vien-tab.component';
import { WebcamComponent } from './webcam/webcam.component';

const routes: Routes = [
  {
    path: 'manage',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: NhanVienManagerComponent, data: { animation: 'NhanVienManage' } },
      { path: 'them-moi', component: NhanVienCreateComponent, data: { animation: 'NhanVienCreate' } },
      { path: 'chinh-sua/:id', component: NhanVienCreateComponent, data: { animation: 'NhanVienUpdate' } },
      { path: 'view/:id/:type', component: NhanVienTabComponent, data: { animation: 'NhanVienTab' } },
      { path: 'them-video/:id', component: WebcamComponent, data: { animation: 'video' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NhanVienRoutingModule { }
