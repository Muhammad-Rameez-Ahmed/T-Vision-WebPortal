import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { Routes } from '@angular/router';
const routes: Routes = [
    { path: '', component: DetailsComponent },
]

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
    ]
})
export class DetailsModule { }
