import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExportService } from 'src/app/services/common/export.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportsComponent } from './reports.component';
import { ReportsService } from './reports.service';

const routes: Routes = [
  { path: '', component: ReportsComponent },
  { path: ':id', component: ReportsComponent },
];

@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  providers: [ReportsService, ExportService, DatePipe]
})
export class ReportsModule { }
