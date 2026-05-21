import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuManageComponent } from './menu-management/menu-manage.component';
import { ConfigInterfaceCreateComponent } from './config-interface/config-interface-create/config-interface-create.component';

const routes: Routes = [
  {
    path: 'quan-ly-menu',   component: MenuManageComponent, data: { animation: 'MenuManage' },
    canActivate: [AuthGuard],
  }, 
  {
    path: 'cau-hinh-he-thong',   component: ConfigInterfaceCreateComponent, data: { animation: 'InterfaceManage' },
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [NgbActiveModal]
})
export class MenuRoutingModule { }
