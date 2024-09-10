import { Component } from '@angular/core';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderCreateComponent } from './order-create/order-create.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [OrderListComponent, OrderCreateComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  isOrder: boolean = true;

  addOrder() {
    this.isOrder = false;
  }

  viewOrders() {
    this.isOrder = true;
  }
}
