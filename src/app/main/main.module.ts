import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DoctorsModule } from './doctors/doctors.module';
import { RoleGuard } from '../services/guards/role.guard';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { UserAnalysisComponent } from './user-analysis/user-analysis.component';
import { RecordComponent } from './record/record.component';
import { RecordAnalysisComponent } from './record-analysis/record-analysis.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      {
        path: 'appointments',
        
        loadChildren: () =>
          import('./appointments/appointments.module').then(
            (m) => m.AppointmentsModule
          ),

       
      },
      {
        path: 'doctors',
        loadChildren: () =>
          import('./doctors/doctors.module').then((m) => m.DoctorsModule),
      },

      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'user-analysis',
        loadChildren: () =>
          import('./user-analysis/user-analysis.module').then(
            (m) => m.UserAnalysisModule
          ),
      },
      {
        path: 'record',
        loadChildren: () =>
          import('./record/record.module').then((m) => m.RecordModule),
      },
      {
        path: 'record-analysis',
        loadChildren: () =>
          import('./record-analysis/record-analysis.module').then((m) => m.RecordAnalysisModule),
      },


      {
        path: 'patients',
        loadChildren: () =>
          import('./patients/patients.module').then((m) => m.PatientsModule),
      },
      {
        path: 'staffs',
        loadChildren: () =>
          import('./staffs/staffs.module').then((m) => m.StaffsModule),
      },
      {
        path: 'complaints',
        loadChildren: () =>
          import('./complaints/complaints.module').then(
            (m) => m.ComplaintsModule
          ),
      },
      {
        path: 'clinics',
        loadChildren: () =>
          import('./clinics/clinics.module').then((m) => m.ClinicsModule),
      },
      {
        path: 'slots',
        loadChildren: () =>
          import('./slots/slots.module').then((m) => m.SlotsModule),
      },
      {
        path: 'doc-appointments',
        loadChildren: () =>
          import('./appointment-doctor/appointment-doctor.module').then(
            (m) => m.AppointmentDoctorModule
          ),
      },
      {
        path: 'appointments-history',
        loadChildren: () =>
          import('./appointment-history/appointment-history.module').then(
            (m) => m.AppointmentHistoryModule
          ),
      },
      {
        path: 'tests',
        loadChildren: () =>
          import('./tests/tests.module').then((m) => m.TestsModule),
      },
    ],
  },
];

@NgModule({
  declarations: [MainComponent],
  imports: [
    SharedModule,
    DoctorsModule,
    ScrollingModule,
    RouterModule.forChild(routes),
  ],
  providers: [],
})
export class MainModule {}
