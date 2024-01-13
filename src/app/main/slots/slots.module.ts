import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlotsComponent } from './slots.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [
    { path: '', component: SlotsComponent },
    // { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
];

@NgModule({
    declarations: [SlotsComponent],
    imports: [
        CommonModule,
        SharedModule,
        MatFormFieldModule,
        MatSelectModule,
        NgSelectModule,
        RouterModule.forChild(routes),
    ]
})
export class SlotsModule { }
