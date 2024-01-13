import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
// import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DocLoginComponent } from './doc-login/doc-login.component';
import { StaffLoginComponent } from './staff-login/staff-login.component';

const routes: Routes = [
    // { path: '', component: AuthComponent },
    {
        path: '', component: AuthComponent, children: [
            { path: '', loadChildren: () => import('./default-auth/default-auth.module').then(m => m.DefaultAuthModule) },
            { path: 'sign-up', loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignUpModule) }
        ]
    },
    {
        path: 'login', component: AuthComponent, children: [
            { path: '', redirectTo: 'staff', pathMatch: 'full' },
            { path: 'staff', loadChildren: () => import('./staff-login/staff-login.module').then(m => m.StaffLoginModule) },
            { path: 'doctor', loadChildren: () => import('./doc-login/doc-login.module').then(m => m.DocLoginModule) },
        ]
    }
]

@NgModule({
    declarations: [
        AuthComponent,
        // DocLoginComponent,
        // StaffLoginComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule
    ]
})
export class AuthModule { }
