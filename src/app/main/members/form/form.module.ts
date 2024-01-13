import { NgModule } from '@angular/core';
import { FormComponent } from './form.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  { path: '', component: FormComponent },
];

@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class FormModule { }
