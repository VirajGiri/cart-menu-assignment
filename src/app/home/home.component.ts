import { Component, OnInit, ViewChild } from '@angular/core';
import { filter } from 'rxjs/internal/operators/filter';
import { cart } from '../interface/cart';
import { CartService } from '../Services/cart.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  menuItems:any = [];
  displayedColumns:any = []
  dataSource:any
  counter = 0;
  cartItem : cart[] = []
  isloading:boolean = false

  constructor(private cart:CartService) {
    this.isloading = true;
    this.cart.getMenu().subscribe(res =>{
      console.log("getMenu",res);
      this.isloading = false;
      this.menuItems = res;
      this.displayedColumns = ['Id','Item_name', 'Price', 'Actions'];
      this.dataSource = new MatTableDataSource(this.menuItems);
    })
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
      this.cart.getCartItemCounter().subscribe(res => {
        this.counter = res;
      });
  }

  addItemsTocart(data:cart){
    this.cart.addItemsTocart(data);
  }
  removeItemsFromCart(data:cart){
    this.cart.removeItemsFromCart(data);
  }

}


