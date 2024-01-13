import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  { path: '', component: UsersComponent },
  {
    path: 'form',
    loadChildren: () => import('./form/form.module').then((m) => m.FormModule),
  },
];

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class UsersModule {}
