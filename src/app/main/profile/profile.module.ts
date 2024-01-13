import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
];

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class ProfileModule { }
