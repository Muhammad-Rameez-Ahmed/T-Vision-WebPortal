import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsComponent } from './appointments.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
const routes: Routes = [
    { path: '', component: AppointmentsComponent, }
];

@NgModule({
    declarations: [
        AppointmentsComponent,
    ],
    imports: [
        SharedModule,
        CommonModule,
        DragDropModule,
        Ng2SearchPipeModule,
        RouterModule.forChild(routes),
        MatAutocompleteModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ]
})
export class AppointmentsModule { }
