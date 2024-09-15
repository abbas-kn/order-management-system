import { Component, OnInit } from '@angular/core';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { FormsModule } from '@angular/forms'; 
import { LeadsService } from '../../shared/services/leads.service';
import { CommonModule } from '@angular/common';


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
  addOrderFlag:boolean;
  constructor(public leadService:LeadsService){
    this.orderCount=0;
    this.addOrderFlag=true;
    this.setOrderCount();
    this.setAddOrderFlag();
  }
  ngOnInit(): void {
    this.setOrderCount()
  }

  setOrderCount(){
    this.leadService.getOrderCount().subscribe(count=>{
      this.orderCount=count;
      this.setAddOrderFlag();
    });
  }

  addOrder() {
    this.isOrder = false;
    this.setOrderCount();
  }

  viewOrders() {
    this.isOrder = true;
  }
  setAddOrderFlag(){
    if (this.orderCount<2)
      this.addOrderFlag=true;
    else 
      this.addOrderFlag=false;
  }
}
