import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';


export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.page').then( m => m.AdminPage)
  },
  {
    path: 'mecanico',
    loadComponent: () => import('./mecanico/mecanico.page').then( m => m.MecanicoPage)
  },
  {
    path: 'repartidor',
    loadComponent: () => import('./repartidor/repartidor.page').then( m => m.RepartidorPage)
  },
];
