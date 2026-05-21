import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/cores/auth/guards/auth.guard';
import { PhuCapComponent } from './phu-cap/phu-cap.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: PhuCapComponent, data: { animation: 'PhuCap' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhuCapRoutingModule { }
