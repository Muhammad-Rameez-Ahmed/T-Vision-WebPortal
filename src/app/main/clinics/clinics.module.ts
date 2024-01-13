import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicsComponent } from './clinics.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';



const routes: Routes = [
    { path: '', component: ClinicsComponent },
    // { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
];
@NgModule({
    declarations: [ClinicsComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
    ]
})
export class ClinicsModule { }
