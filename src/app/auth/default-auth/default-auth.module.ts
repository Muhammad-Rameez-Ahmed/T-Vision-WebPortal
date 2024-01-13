import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultAuthComponent } from './default-auth.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


const routes: Routes = [
    { path: '', component: DefaultAuthComponent },
];

@NgModule({
    declarations: [
        DefaultAuthComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
    ]
})
export class DefaultAuthModule { }
