import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map } from 'rxjs';
import { error } from 'console';
import { IProduct } from '../../Models/IProduct';
import { Basket, IBasket, IBasketItem, IBasketTotal } from '../../Models/BasketModel';
import e from 'express';

@Injectable({
  providedIn: 'root'
})
 export class BasketService {

  constructor(private http:HttpClient) { }
  basurl:string="https://localhost:7178/api/";
  private BasketSource=new BehaviorSubject<IBasket>(null);
  Baskket=this.BasketSource.asObservable();
  private BasketTotalSource=new BehaviorSubject<IBasketTotal>(null);
  BasketTotal$=this.BasketTotalSource.asObservable();
  calculat()
  {
   const basket=this.CurentValue()
   const shipping:number=0;
   const subtotoal:number=basket.basketItem.reduce((a,c)=>
  {
   return (c.price*c.quantity)+a
  },0)
   const total=subtotoal+shipping;
   this.BasketTotalSource.next({Shiping: shipping,Subtotal: subtotoal,Total: total})
   
  }



  GetBasket(id:string)
  {
  return this.http.get(this.basurl+'Basket/Get-Basket'+id).pipe(
    map((value: IBasket) => {
      this.BasketSource.next(value);
      this.calculat()
      return value;
    }),
    catchError((err) => {
      console.error('Error fetching basket:', err);
      throw err;
    })
  );
  }
  SetBasket(basket:IBasket)
  {
    return this.http.post(this.basurl+'Basket/Update-Basket',basket).subscribe(res=>{
      this.BasketSource.next(res as IBasket);
      this.calculat()
    })
  }
  CurentValue()
  {
    return this.BasketSource.value;
  }
  AddItemToBasket(product:IProduct,quantity:number=1)
  {
    const ItemAdd:IBasketItem=this.MapProductToBasket(product,quantity);
    let basket=this.CurentValue();
    if (!basket) {
      basket = this.CreatBasket();
    }
  
    if (!basket.id) {
      basket = this.CreatBasket();
    }
    basket.basketItem=this.AddOrUpdate(basket.basketItem,ItemAdd,quantity);
    return this.SetBasket(basket);
  }
  AddOrUpdate(basketItem: IBasketItem[], ItemAdd: IBasketItem, quantity: number): IBasketItem[] {
   const index= basketItem.findIndex(item=> item.id === ItemAdd.id) 
    if(index===-1)
    {
      ItemAdd.quantity=quantity;
      basketItem.push(ItemAdd);
    }
    else{
       basketItem[index].quantity+=quantity;
    }
    return basketItem;
  }
   CreatBasket(): IBasket {
     const basket:Basket=new Basket();
     basket.basketItem = []; 
     localStorage.setItem('BasketId', basket.id);
     return basket;
  }
   MapProductToBasket(product: IProduct, quantity: number):IBasketItem {
    return {
      id:product.id,
      name:product.name,
      category:product.categoryName,
      image:product.photos[0].imageName,
      price:product.new_price,
      quantity:quantity,
      description:product.description
      
    }
   
  }
  increament(itemId: IBasketItem) {
    const basket = this.CurentValue();
    const index = basket.basketItem.findIndex(item => item.id === itemId.id);
    if (index !== -1) {
      basket.basketItem[index].quantity++;
      this.SetBasket(basket);
    }
    

  }
  decreament(itemId: IBasketItem) {
    const basket = this.CurentValue();
    const index = basket.basketItem.findIndex(item => item.id === itemId.id);
    if (index !== -1) {
      if (basket.basketItem[index].quantity > 1) {
        basket.basketItem[index].quantity--;
      } else {
        basket.basketItem.splice(index, 1);
      }
      this.SetBasket(basket);
    }
  }
  removeItem(itemId: IBasketItem) {
    const basket = this.CurentValue();
    if(basket.basketItem.some(item=> item.id===itemId.id))
    {
      basket.basketItem=basket.basketItem.filter(item=> item.id!==itemId.id);
      if(basket.basketItem.length>0)
      {
        this.SetBasket(basket);
      }

     else{
        this.DeletAllItemBasket(basket);
      }
    }
   

  }
  DeletAllItemBasket(basket:IBasket) {
  {
    return this.http.delete(this.basurl+'Basket/Delet-Basket'+basket.id).subscribe(res=>{
      this.BasketSource.next(null);
      localStorage.removeItem('BasketId');
    }
    )
   
  }
  
}
}
