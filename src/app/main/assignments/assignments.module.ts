import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExportService } from 'src/app/services/common/export.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientsService } from '../clients/clients.service';
import { AssignmentsComponent } from './assignments.component';
import { AssignmentsService } from './assignments.service';

const routes: Routes = [
  { path: '', component: AssignmentsComponent },
  { path: 'form/:id', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
];

@NgModule({
  declarations: [
    AssignmentsComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    AssignmentsService,
    ClientsService,
    ExportService,
  ],
})
export class AssignmentsModule { }
