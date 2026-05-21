import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonViComponent } from './don-vi/don-vi.component';
import { AuthGuard } from 'src/app/cores/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DonViComponent, data: { animation: 'DonVi' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonViRoutingModule { }
