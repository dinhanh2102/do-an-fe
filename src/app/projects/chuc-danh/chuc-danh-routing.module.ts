import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChucDanhComponent } from './chuc-danh/chuc-danh.component';
import { AuthGuard } from 'src/app/cores/auth/guards/auth.guard';
import { ChucDanhTabComponent } from './chuc-danh-tab/chuc-danh-tab.component';
import { ChucDanhCreateComponent } from './chuc-danh-create/chuc-danh-create.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ChucDanhComponent, data: { animation: 'ChucDanh' } },
      { path: 'view/:id/:isView', component: ChucDanhTabComponent, data: { animation: 'ChucDanhTab' } },
      { path: 'create', component: ChucDanhCreateComponent, data: { animation: 'ChucDanhCreate' } },
      { path: 'update/:id', component: ChucDanhCreateComponent, data: { animation: 'ChucDanhUpdate' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChucDanhRoutingModule { }
