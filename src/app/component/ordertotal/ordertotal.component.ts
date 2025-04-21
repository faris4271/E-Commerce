import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../basket/basket/basket.service';
import { IBasketTotal } from '../../Models/BasketModel';

@Component({
  selector: 'app-ordertotal',
  standalone: false,
  templateUrl: './ordertotal.component.html',
  styleUrl: './ordertotal.component.scss'
})
export class OrdertotalComponent implements OnInit{
  ngOnInit(): void {
   this.basketservices.BasketTotal$.subscribe((value:IBasketTotal)=>{
    this.baskettotal=value;
   }
  )
  }
  constructor(private basketservices:BasketService) { }
 baskettotal:IBasketTotal;
}
