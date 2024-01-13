import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { StaffsComponent } from './staffs.component';



const routes: Routes = [
    { path: '', component: StaffsComponent },
    // { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
];

@NgModule({
    declarations: [StaffsComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
    ]
})
export class StaffsModule { }
