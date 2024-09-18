import { Component, OnInit } from '@angular/core';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { LeadsService } from '../../shared/services/leads.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [OrderListComponent, OrderCreateComponent,CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  isOrder: boolean = true;
  orderCount:number;
  orderFlag: boolean ;
  private flagSubscription: Subscription | null = null;

  constructor(public leadService:LeadsService){
    this.orderCount=0;
    this.orderFlag=true;
  }
  ngOnInit(): void {
    
    this.setFlag();
    this.setOrderCount();
  }

  setFlag(){
    this.flagSubscription = this.leadService.addOrderFlag$.subscribe(flag => {
      this.orderFlag = flag;
    });
  }

  setOrderCount(){
    this.leadService.getOrderCount().subscribe(count=>{
      this.orderCount=count;
      this.leadService.setAddOrderFlag();

    });
  }

  addOrder() {
    this.isOrder = false;
    this.setOrderCount();
  }

  viewOrders() {
    this.isOrder = true;
  }

  ngOnDestroy(): void {
    if (this.flagSubscription) {
      this.flagSubscription.unsubscribe();
    }
  }

}
