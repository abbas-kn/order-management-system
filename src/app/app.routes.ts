import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CompletedOrdersComponent } from './pages/orders/completed-orders/completed-orders.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { LoginComponent } from './pages/login/login/login.component';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate:[authGuard]
  },
  {
    path: 'completedorders',
    component: CompletedOrdersComponent,
    canActivate:[authGuard]
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate:[authGuard]
  },
  {
    path:'product/add',
    component:AddProductComponent,
    canActivate:[authGuard]
  },
  {
    path:'login',
    component:LoginComponent
  }
];
