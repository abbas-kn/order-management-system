import { Component, effect } from '@angular/core';
import { LeadsService } from '../../../shared/services/leads.service';
import { NgFor } from '@angular/common';
import { NewOrder } from '../../../shared/models/newOrder.model';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent {
  newOrders: NewOrder[] = [];

  constructor(private leadsService: LeadsService) {
    effect(() => {
      this.newOrders = this.leadsService.newOrders();
    });
  }

  completeOrder(leadId: number) {
    this.leadsService.completeOrder(leadId);
  }
}
