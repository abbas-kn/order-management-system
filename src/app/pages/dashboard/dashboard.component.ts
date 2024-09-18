import { Component, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CompletedOrder } from '../../shared/models/completedOrder.model';
import { NewOrder } from '../../shared/models/newOrder.model';
import { LeadsService } from '../../shared/services/leads.service';
import { AuthService } from '../../shared/services/auth/auth.service';

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

  constructor(private leadsService: LeadsService, private authService:AuthService) {
    effect(() => {
      this.newOrders = this.leadsService.newOrders();
      this.completedOrders = this.leadsService.completedOrders();
    });
  }

  logOut(){
    this.authService.logOut();
  }


}
