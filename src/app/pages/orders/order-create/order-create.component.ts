import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadsService } from '../../../shared/services/leads.service';
import { AlphabetsOnlyDirective } from '../../../shared/directives/alphabets-only.directive';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from '../../../shared/models/products.model';
import { ProductService } from '../../../shared/services/product/product.service';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-order-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AlphabetsOnlyDirective,FormsModule],
  templateUrl: './order-create.component.html',
  styleUrl: './order-create.component.scss',
})
export class OrderCreateComponent implements OnInit {
  orderForm: FormGroup;
  products: Product[];
  selectedProduct:boolean;

  constructor(private leadsService: LeadsService,private productService:ProductService) {
    this.products=[];
    this.selectedProduct=false;
    this.orderForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
        Validators.maxLength(15),
      ]),
      product:new FormControl([null, Validators.required]),
      quantity:new FormControl('',[
        Validators.required,
        Validators.min(0),
      ])
    });
  }
  ngOnInit(): void {
    this.setProductDropdown()
  }

  addOrder() {
    if (this.orderForm.valid) {
      const { name, email, phone,product,quantity } = this.orderForm.value;
      this.leadsService.addLead(name, email, phone,product,quantity);
      this.orderForm.reset();
    }
  }
  setProductDropdown(){
    this.productService.getProducts().subscribe(products=>{
      this.products=products;
    });
  }
  onSelected(value:string):void{
    if (value=="selectProduct") 
      this.selectedProduct=false;
    else if (value)
      this.selectedProduct=true;
    else 
    this.selectedProduct=false;
  }
}
