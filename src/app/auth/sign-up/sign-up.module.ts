import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';


const routes: Routes = [
    { path: '', component: SignUpComponent },
];


@NgModule({
    declarations: [
        SignUpComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        MatButtonModule,
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        RouterModule.forChild(routes),
    ],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'outline',
                hideRequiredMarker: true,
                floatLabel: 'always',
                color: 'primary'
            }
        },
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { showError: true }
        }
    ]
})
export class SignUpModule { }
