import { Component, NgModule, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product/product.service';
import { Product } from '../../shared/models/products.model';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit{
  products:Product[]=[];
  productName:string;
  productPrice:number;
  productForm: FormGroup;

  constructor(private productService:ProductService){
    this.productName='';
    this.productPrice=0;
    this.productForm = new FormGroup({
      productName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      productPrice: new FormControl('', [Validators.required])
    })
  }
  ngOnInit(): void {
    this.loadProducts();
    if(!this.productService.hasDummyProduct()){
      this.loaddummyData();
      this.productService.markDummyDataLoaded();
    }
  }

  addProduct(): void {
    if (this.productName && this.productPrice>0){
      const newProduct: Product = { name:this.productName, price: this.productPrice };
      this.productService.addProduct(newProduct)
      this.clearData();
      this.loadProducts();
    }
    
  }
  clearData():void{
    this.productName='';
    this.productPrice=0;
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      products=>{
        this.products=products;
      }
    );
  }
  loaddummyData():void{
    const dummyProducts:Product[]=[
      {name:"Chinese",price:1500},
      {name:"Pizza",price:1000},
      {name:"Fries",price:500}
    ];
    dummyProducts.forEach(product=>
      this.productService.addProduct(product)
    );
  }

}
