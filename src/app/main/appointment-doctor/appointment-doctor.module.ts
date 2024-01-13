import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Routes, RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppointmentDoctorComponent } from './appointment-doctor.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DetailsComponent } from './details/details.component';


const routes: Routes = [
    { path: '', component: AppointmentDoctorComponent, },
    { path: 'details', component: DetailsComponent }
];

@NgModule({
    declarations: [AppointmentDoctorComponent, DetailsComponent],
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
        MatDatepickerModule,
        MatNativeDateModule
    ],
    exports: [
    ]
})
export class AppointmentDoctorModule { }
