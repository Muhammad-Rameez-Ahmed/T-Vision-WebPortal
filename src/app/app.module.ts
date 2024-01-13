import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AuthGuard } from './services/guards/auth.guard';
import { AppGuard } from './services/guards/app.guard';
import { ModalModule } from 'ngb-modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './shared/component/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AppGuard],
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'auth',
    canActivate: [AuthGuard],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent,
  },
];
// const routes: Routes = [
//     { path: 'dashboard', canActivate: [AppGuard], loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
//     { path: '', redirectTo: 'auth', pathMatch: 'full' },
//     { path: 'auth', canActivate: [AppGuard], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },

//     { path: '**', redirectTo: '' },
// ];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
