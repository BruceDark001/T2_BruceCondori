import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { ProductosComponent } from './pages/productos/productos';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'productos', component: ProductosComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];