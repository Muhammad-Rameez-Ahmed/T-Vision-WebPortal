import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RecordComponent } from './record.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  { path: '', component: RecordComponent },
 
];


@NgModule({
  declarations: [RecordComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class RecordModule { }
