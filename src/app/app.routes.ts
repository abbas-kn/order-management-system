import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CompletedOrdersComponent } from './pages/orders/completed-orders/completed-orders.component';
import { OrdersComponent } from './pages/orders/orders.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'completedorders',
    component: CompletedOrdersComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
];
