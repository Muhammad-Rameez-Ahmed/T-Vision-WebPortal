import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserAnalysisComponent } from './user-analysis.component';
import { SharedModule } from 'src/app/shared/shared.module';



const routes: Routes = [
  { path: '', component: UserAnalysisComponent },
 
];


@NgModule({
  declarations: [UserAnalysisComponent],
  imports: [
    CommonModule,
   SharedModule,
   RouterModule.forChild(routes)
  ]
})
export class UserAnalysisModule { }
