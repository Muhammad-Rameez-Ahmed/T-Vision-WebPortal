import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './patients.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DoctorsModule } from '../doctors/doctors.module';
import { DetailsComponent } from './details/details.component';
import { SearchbarComponent } from 'src/app/shared/component/searchbar/searchbar.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

const routes: Routes = [
    { path: '', component: PatientsComponent },
    { path: 'view', loadChildren: () => import('./details/details.module').then(m => m.DetailsModule) },
];
@NgModule({
    declarations: [PatientsComponent],
    imports: [
        CommonModule,
        SharedModule,
        ScrollingModule,
        RouterModule.forChild(routes),
    ]
})
export class PatientsModule { }
