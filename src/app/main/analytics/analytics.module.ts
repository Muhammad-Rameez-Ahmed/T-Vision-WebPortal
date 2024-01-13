import { NgModule } from '@angular/core';
import { AnalyticsComponent } from './analytics.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ClientsService } from '../clients/clients.service';
import { DatePipe } from '@angular/common';
import { ReportsService } from '../reports/reports.service';

const routes: Routes = [
  { path: '', component: AnalyticsComponent, }
];

@NgModule({
  declarations: [
    AnalyticsComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  providers: [ClientsService, ReportsService, DatePipe]
})
export class AnalyticsModule { }
