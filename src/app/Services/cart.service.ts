import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { cart } from '../interface/cart';
import { catchError } from 'rxjs/internal/operators/catchError';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  localUrl: string = 'https://run.mocky.io/v3/9d71cb03-a9f9-4d70-bae2-9d3adaa1cfe7';
  menuItems:any = [];
  cartItem : cart[] = [];
  
  private counter$ = new BehaviorSubject<number>(this.cartItem.length);
  constructor(private http: HttpClient) { }


  getMenu():Observable<cart>{
    return this.http.get<cart>(this.localUrl)
  }


  addItemsTocart(data:cart){
    this.cartItem.push(data);
    this.counter$.next(this.cartItem.length);
  }
  removeItemsFromCart(data:cart){
    let idx = this.cartItem.indexOf(data);
    if(idx > -1){
      this.cartItem.splice(idx, 1);
      this.counter$.next(this.cartItem.length);
    }
  }
  getCartItem(){
    return this.cartItem;
  }
  getCartItemCounter(): Observable<number>{
    return this.counter$.asObservable();
  }
  clearCart(){
    this.cartItem = []; 
    this.counter$.next(this.cartItem.length);
  }
}
