import { Injectable, signal } from '@angular/core';
import { CompletedOrder } from '../models/completedOrder.model';
import { NewOrder } from '../models/newOrder.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeadsService {
  private leadIdCounter = 1;
  private orderCOuntKey='orderCount';
  newOrders = signal<NewOrder[]>(this.getLeadsFromLocalStorage());
  completedOrders = signal<CompletedOrder[]>(
    this.getCustomersFromLocalStorage()
  );

  constructor() {
    this.leadIdCounter = this.newOrders().length + 1;
  }

  private getLeadsFromLocalStorage(): NewOrder[] {
    const leads = localStorage.getItem('leads');
    return leads ? JSON.parse(leads) : [];
  }

  private getCustomersFromLocalStorage(): CompletedOrder[] {
    const customers = localStorage.getItem('customers');
    return customers ? JSON.parse(customers) : [];
  }

  private saveLeadsToLocalStorage(newOrders: NewOrder[]): void {
    localStorage.setItem('newOrders', JSON.stringify(newOrders));
    
  }
  getOrderCount():Observable<number>{
    const orderCount=localStorage.getItem(this.orderCOuntKey);
    return of(orderCount?Number(orderCount):0);
  }


  private saveCustomersToLocalStorage(completedOrders: CompletedOrder[]): void {
    localStorage.setItem('completedOrders', JSON.stringify(completedOrders));
  }

  addLead(name: string, email: string, phone: string,productName:string,quantity:number) {
    const newLead: NewOrder = {
      id: this.leadIdCounter++,
      name,
      email,
      phone,
      status: 'New',
      productName,
      quantity
    };
    const updatedLeads = [...this.newOrders(), newLead];
    this.newOrders.set(updatedLeads);
    this.saveLeadsToLocalStorage(updatedLeads);
    const oldCount=localStorage.getItem(this.orderCOuntKey)
    localStorage.setItem(this.orderCOuntKey,JSON.stringify(Number(oldCount)+1))
  }

  completeOrder(leadId: number) {
    const lead = this.newOrders().find((l) => l.id === leadId);
    if (lead) {
      const newOrders = this.newOrders().filter((l) => l.id !== leadId);
      this.newOrders.set(newOrders);
      this.saveLeadsToLocalStorage(newOrders);

      const newOrder: CompletedOrder = {
        id: lead.id,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
      };
      const completedOrders = [...this.completedOrders(), newOrder];
      this.completedOrders.set(completedOrders);
      this.saveCustomersToLocalStorage(completedOrders);
    }
  }
}
