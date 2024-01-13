import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbDatepickerModule, NgbDropdownModule, NgbModal, NgbModule, NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NotificationComponent } from './component/header/notification/notification.component';
import { PermissionDirective } from '../services/directives/permission.directive';
import { NgChartsModule } from 'ng2-charts';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// import {}
// import { }
import { AppointmentDetailsComponent } from './modal/appointment-details/appointment-details.component';
import { SearchbarComponent } from './component/searchbar/searchbar.component';
import { AppointmentsTableComponent } from './component/tables/appointments-table/appointments-table.component';
import { RecordsTableComponent } from './component/tables/records-table/records-table.component';
import { ProxyUsersComponent } from './component/tables/proxy-users/proxy-users.component';
import { DoctorsNoteComponent } from './component/tables/doctors-note/doctors-note.component';
import { TrivageComponent } from './component/tables/trivage/trivage.component';
import { PatientFormComponent } from './modal/patient-form/patient-form.component';
import { RecordDetailsComponent } from './modal/record-details/record-details.component';
import { AddRecordsComponent } from './modal/add-records/add-records.component';
import { StaffFormComponent } from './modal/staff-form/staff-form.component';
import { DoctorAppointmentsComponent } from './modal/doctor-appointments/doctor-appointments.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { DoctorFormComponent } from './modal/doctor-form/doctor-form.component';
import { ClinicFormComponent } from './modal/clinic-form/clinic-form.component';
import { SlotsFormComponent } from './modal/slots-form/slots-form.component';
import { SlotViewComponent } from './modal/slot-view/slot-view.component';
import { AppointmentsViewComponent } from './modal/appointments-view/appointments-view.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { AppointmentMarkingComponent } from './modal/appointment-marking/appointment-marking.component';
import { PatientDetailsComponent } from './component/patient-details/patient-details.component';
import { DoctorDetailsComponent } from './component/doctor-details/doctor-details.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProfileCardComponent } from './component/profile-card/profile-card.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FilterService } from '../services/common/filter.service';
import { TestResultsComponent } from './modal/test-results/test-results.component';
import { ComplainModalComponent } from './modal/complain-modal/complain-modal.component';
import { UserFormComponent } from './modal/user-form/user-form.component';
import { RecordFormComponent } from './modal/record-form/record-form.component';
import { UserDetailsComponent } from './component/user-details/user-details.component';
@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent,
        FooterComponent,
        NotificationComponent,
        // UpcomingAppointmentsComponent,
        PermissionDirective,
        AppointmentDetailsComponent,
        SearchbarComponent,
        AppointmentsTableComponent,
        RecordsTableComponent,
        ProxyUsersComponent,
        DoctorsNoteComponent,
        TrivageComponent,
        PatientFormComponent,
        RecordDetailsComponent,
        AddRecordsComponent,
        StaffFormComponent,
        DoctorAppointmentsComponent,
        DoctorFormComponent,
        ClinicFormComponent,
        SlotsFormComponent,
        SlotViewComponent,
        AppointmentsViewComponent,
        PageNotFoundComponent,
        AppointmentMarkingComponent,
        PatientDetailsComponent,
        DoctorDetailsComponent,
        ProfileCardComponent,
        TestResultsComponent,
        ComplainModalComponent,
        UserFormComponent,
        RecordFormComponent,
        UserDetailsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        NgbModule,
        ScrollingModule,
        NgbRatingModule,
        NgbDatepickerModule,
        NgbDropdownModule,
        MatButtonToggleModule,
        Ng2SearchPipeModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        NgSelectModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule


    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        FooterComponent,
        SearchbarComponent,
        RecordsTableComponent,
        PatientDetailsComponent,
        DoctorDetailsComponent,
        ProfileCardComponent,
        // UpcomingAppointmentsComponent,
        ProxyUsersComponent,
        StaffFormComponent,
        TrivageComponent,
        DoctorsNoteComponent,
        CommonModule,
        FormsModule,
        AppointmentsTableComponent,
        PatientFormComponent,
        NgbDatepickerModule,
        NgbPaginationModule,
        NgbDropdownModule,
        NgSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        RecordDetailsComponent,
        NgChartsModule,
        ReactiveFormsModule,
        AddRecordsComponent,
        PermissionDirective,
        NgbNavModule,
        MatSlideToggleModule,
        TestResultsComponent
    ],
    bootstrap: [AppointmentDetailsComponent, PatientFormComponent, RecordDetailsComponent, StaffFormComponent],
})
export class SharedModule { }
