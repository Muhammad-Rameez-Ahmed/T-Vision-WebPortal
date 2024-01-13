import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MembersComponent } from './members.component';
import { MembersService } from './members.service';

const routes: Routes = [
  { path: '', component: MembersComponent },
  { path: 'form/:id', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
];

@NgModule({
  declarations: [
    MembersComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  providers: [MembersService],
})
export class MembersModule { }
