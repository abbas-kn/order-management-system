import { Component, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CompletedOrder } from '../../shared/models/completedOrder.model';
import { NewOrder } from '../../shared/models/newOrder.model';
import { LeadsService } from '../../shared/services/leads.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  newOrders: NewOrder[] = [];
  completedOrders: CompletedOrder[] = [];

  constructor(private leadsService: LeadsService) {
    effect(() => {
      this.newOrders = this.leadsService.newOrders();
      this.completedOrders = this.leadsService.completedOrders();
    });
  }
}
