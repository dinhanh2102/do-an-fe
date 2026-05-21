import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home.component';

const routes: Routes = [  
    {
        path: '',component: HomeComponent, data: { animation: 'home' },
      },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [NgbActiveModal]
  })
  export class HomeRoutingModule { }
  