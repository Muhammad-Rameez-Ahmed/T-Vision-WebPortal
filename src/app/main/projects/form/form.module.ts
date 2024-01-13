import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormComponent } from './form.component';

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
