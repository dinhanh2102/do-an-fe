import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { ScreenWaitComponent } from './screen-wait/screen-wait.component';
import { AuthGuard } from '../cores/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../cores/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: 'nguoi-dung',
        canActivate: [AuthGuard],
        loadChildren: () => import('../cores/system/user.module').then(m => m.UserModule)
      },
      {

        path: 'core-project',
        canActivate: [AuthGuard],
        loadChildren: () => import('../projects/control/control.module').then(m => m.ControlModule)

      },
      {
        path: 'system-config',
        canActivate: [AuthGuard],
        loadChildren: () => import('../cores/systemconfig/menu.module').then(m => m.MenuModule)
      },
      {
        path: 'trang-chu',
        canActivate: [AuthGuard],
        loadChildren: () => import('../projects/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'control',
        canActivate: [AuthGuard],
        loadChildren: () => import('../projects/control/control.module').then(m => m.ControlModule)
      },
      {
        path: 'nhan-vien',
        canActivate: [AuthGuard],
        loadChildren: () => import('../projects/nhan-vien/nhan-vien.module').then(m => m.NhanVienModule)
      },
      {
        path: 'chuc-danh',
        canActivate: [AuthGuard],
        loadChildren: () => import('../projects/chuc-danh/chuc-danh.module').then(m => m.ChucDanhModule),
      },
      {
        path: 'don-vi',
        canActivate: [AuthGuard],
        loadChildren: () => import('../projects/don-vi/don-vi.module').then(m => m.DonViModule),
      },
      {
        path: 'phu-cap',
        canActivate: [AuthGuard],
        loadChildren: () => import('../projects/phu-cap/phu-cap.module').then(m => m.PhuCapModule),
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LayoutRoutingModule { }