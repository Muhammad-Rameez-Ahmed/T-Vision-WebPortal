import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentHistoryComponent } from './appointment-history.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppointmentDoctorComponent } from '../appointment-doctor/appointment-doctor.component';
import { DetailsComponent } from '../patients/details/details.component';



const routes: Routes = [
    { path: '', component: AppointmentHistoryComponent, },
    { path: 'details', component: DetailsComponent }
];

@NgModule({
    declarations: [
        AppointmentHistoryComponent
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
        MatDatepickerModule,
        MatNativeDateModule
    ]
})
export class AppointmentHistoryModule { }
