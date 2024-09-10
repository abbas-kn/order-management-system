import { Component, effect } from '@angular/core';
import { CompletedOrder } from '../../../shared/models/completedOrder.model';
import { LeadsService } from '../../../shared/services/leads.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-completed-orders',
  standalone: true,
  imports: [NgFor],
  templateUrl: './completed-orders.component.html',
  styleUrl: './completed-orders.component.scss',
})
export class CompletedOrdersComponent {
  completedOrders: CompletedOrder[] = [];

  constructor(private leadsService: LeadsService) {
    effect(() => {
      this.completedOrders = this.leadsService.completedOrders();
    });
  }
}
