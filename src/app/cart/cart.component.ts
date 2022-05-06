import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { cart } from '../interface/cart';
import { CartService } from '../Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

     
  menuItems:any = [];
  displayedColumns:any = []
  dataSource:any
  counter = 0;
  cartItem : cart[] = []
  constructor(private cart:CartService) { 
    this.menuItems = this.cart.getCartItem();
    this.displayedColumns = ['Id','Item_name', 'Price', 'Actions'];
    this.dataSource = new MatTableDataSource(this.menuItems);
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public calculateTotal() {
    return this.menuItems.reduce((accum: any, curr: { price: number; }) => accum + curr.price, 0);
  }
  totalItem(){
    return this.menuItems.length;
  }

  removeItemsFromCart(data:cart){
    this.cart.removeItemsFromCart(data);
    this.menuItems = this.cart.getCartItem();
    this.displayedColumns = ['Id','Item_name', 'Price', 'Actions'];
    this.dataSource = new MatTableDataSource(this.menuItems);
  }

  clearCartItem(){
    this.cart.clearCart();
    this.menuItems = [];
    this.displayedColumns = ['Id','Item_name', 'Price', 'Actions'];
    this.dataSource = new MatTableDataSource(this.menuItems);
  }
  getDiscount(total:number){
    let discount;
    let percent;
    if(total >= 101 && total <= 500){
      discount = total*0.1
      percent = '(10%)';
      return discount + percent;
    }else if(total > 500){
      discount = total*0.2;
      percent = '(20%)';
      return discount + percent;
    }else{
      discount = total;
      percent = '(0%)';
      return discount + '(0%)';
    }

  }
}
