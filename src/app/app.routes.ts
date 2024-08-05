import { Routes } from '@angular/router';
import { HomeComponent } from './website/home/home.component';


export const routes: Routes = [
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
    { path: 'home',        component: HomeComponent }
];
