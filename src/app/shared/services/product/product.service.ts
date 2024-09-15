import { Injectable } from '@angular/core';
import { Product } from '../../models/products.model';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private storageKey = 'products';
  private dummyDataLoadedKey='dummyData';

  constructor() { }

  getProducts():Observable<Product[]>{
    const storedProducts = localStorage.getItem(this.storageKey);
    const product= storedProducts ? JSON.parse(storedProducts) : [];
    return of (product)
  }

  addProduct(product:Product):void{
    this.getProducts().subscribe(products=>{
      products.push(product);
      localStorage.setItem(this.storageKey, JSON.stringify(products));
    });
  }
  removeProduct(productName:string):void{
    this.getProducts().subscribe(products => {
      const updatedProducts = products.filter(product => product.name !== productName);
      localStorage.setItem(this.storageKey, JSON.stringify(updatedProducts));
    });
  }
  hasDummyProduct():boolean{
    return localStorage.getItem(this.dummyDataLoadedKey)==='true';
  }
  markDummyDataLoaded(): void {
    localStorage.setItem(this.dummyDataLoadedKey, 'true');
  }

}
