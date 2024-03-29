import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocLoginComponent } from './doc-login.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


const routes: Routes = [
    { path: '', component: DocLoginComponent },
];


@NgModule({
    declarations: [
        DocLoginComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
    ]
})
export class DocLoginModule { }
