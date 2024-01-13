import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientsComponent } from './clients.component';
import { ClientsService } from './clients.service';

const routes: Routes = [
  { path: '', component: ClientsComponent },
  { path: 'form/:id', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
];

@NgModule({
  declarations: [
    ClientsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  providers: [ClientsService],
})
export class ClientsModule { }
