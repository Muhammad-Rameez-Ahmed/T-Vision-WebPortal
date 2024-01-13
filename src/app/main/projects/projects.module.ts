import { NgModule } from '@angular/core';
import { ProjectsComponent } from './projects.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProjectsService } from './projects.service';

const routes: Routes = [
  { path: '', component: ProjectsComponent },
  { path: 'form/:id', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
];
@NgModule({
  declarations: [
    ProjectsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  providers: [ProjectsService],
})
export class ProjectsModule { }
