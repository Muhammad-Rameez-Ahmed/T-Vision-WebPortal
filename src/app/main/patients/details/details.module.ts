import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbNavItem, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
// import { UpcomingAppointmentsComponent } from 'src/app/shared/component/upcoming-appointments/upcoming-appointments.component';
const routes: Routes = [
    { path: '', component: DetailsComponent },
]


@NgModule({
    declarations: [DetailsComponent],
    imports: [
        CommonModule,
        // NgbNavItem,
        NgbNavModule,
        SharedModule,
        RouterModule.forChild(routes),
    ]
})
export class DetailsModule { }
