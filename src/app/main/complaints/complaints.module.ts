import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ComplaintsComponent } from './complaints.component';
import { SharedModule } from 'src/app/shared/shared.module';



const routes: Routes = [
    { path: '', component: ComplaintsComponent },
    // { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
];

@NgModule({
    declarations: [ComplaintsComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
    ]
})
export class ComplaintsModule { }
