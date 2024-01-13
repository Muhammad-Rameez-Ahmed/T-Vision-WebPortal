import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RecordAnalysisComponent } from './record-analysis.component';
import { SharedModule } from 'src/app/shared/shared.module';


const routes: Routes = [
  { path: '', component: RecordAnalysisComponent},
 
];

@NgModule({
  declarations: [RecordAnalysisComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class RecordAnalysisModule { }
