import { Routes } from '@angular/router';

import { ProductosComponent } from './dashboard/pages/productos/productos.component';
import { CategoriasComponent } from './dashboard/pages/categorias/categorias.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
{
  path: 'menu',
  component: DashboardComponent,
  children:[
    {
      path: 'productos',
      title: 'Productos',
      component: ProductosComponent,

    },
    {
      path: 'categorias',
      title: 'Categorias',
      component: CategoriasComponent,

    },

  ]
},

{ path: '', redirectTo: '/menu', pathMatch: 'full' },
];
