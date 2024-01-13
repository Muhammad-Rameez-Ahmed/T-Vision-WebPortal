import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsComponent } from './doctors.component';
import { SharedModule } from 'src/app/shared/shared.module';


const routes: Routes = [
    { path: '', component: DoctorsComponent },
    { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
];

@NgModule({
    declarations: [DoctorsComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
    ]
})
export class DoctorsModule { }
