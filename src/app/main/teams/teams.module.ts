import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeamsComponent } from './teams.component';
import { TeamsService } from './teams.service';

const routes: Routes = [
    { path: '', component: TeamsComponent },
    { path: 'form/:id', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
];



@NgModule({
    declarations: [
        TeamsComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
    ],
    providers: [TeamsService],
})
export class TeamsModule { }
