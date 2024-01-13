import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestsComponent } from './tests.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


const routes: Routes = [
    { path: '', component: TestsComponent, },
]
@NgModule({
    declarations: [
        TestsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        MatDatepickerModule,
        MatNativeDateModule
    ]
})
export class TestsModule { }
