import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadsService } from '../../../shared/services/leads.service';
import { AlphabetsOnlyDirective } from '../../../shared/directives/alphabets-only.directive';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-order-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AlphabetsOnlyDirective],
  templateUrl: './order-create.component.html',
  styleUrl: './order-create.component.scss',
})
export class OrderCreateComponent {
  orderForm: FormGroup;

  constructor(private leadsService: LeadsService) {
    this.orderForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
        Validators.maxLength(15),
      ]),
    });
  }

  addOrder() {
    if (this.orderForm.valid) {
      const { name, email, phone } = this.orderForm.value;
      this.leadsService.addLead(name, email, phone);
      this.orderForm.reset();
    }
  }
}
