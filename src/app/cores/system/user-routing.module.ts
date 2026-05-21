import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { GroupUserManageComponent } from './group-user/group-user-manage/group-user-manage.component';
import { UserHistoryComponent } from './user-history/user-history.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserManageComponent } from './user/user-manage/user-manage.component';
import { UserViewComponent } from './user/user-view/user-view.component';
import { PermissionManageComponent } from './permission/permission-manage/permission-manage.component';

const routes: Routes = [
  {
    path: 'tai-khoan',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: UserManageComponent, data: { animation: 'UserManage' } },
      { path: 'them-moi', component: UserCreateComponent, data: { animation: 'UserCreate' } },
      { path: 'chinh-sua/:id', component: UserCreateComponent, data: { animation: 'UserCreate' } },
      { path: 'xem-tai-khoan/:id', component: UserViewComponent, data: { animation: 'UserView' } },
    ]
  },
  {
    path: 'nhom-nguoi-dung',
    canActivate: [AuthGuard],
    component: GroupUserManageComponent, data: { animation: 'GroupUserManage' }
  },
  {
    path: 'quan-ly-phan-quyen',
    canActivate: [AuthGuard],
    component: PermissionManageComponent, data: { animation: 'PermissionManage' }
  },
  {
    path: 'tra-cuu-lich-su',
    canActivate: [AuthGuard],
    component: UserHistoryComponent, data: { animation: 'UserHistory' }
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
