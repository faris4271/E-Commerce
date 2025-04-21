import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket.service';
import { IBasket, IBasketItem } from '../../../Models/BasketModel';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { OrdertotalComponent } from '../../../component/ordertotal/ordertotal.component';
@Component({
  selector: 'app-basket',
  standalone: false,
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit {
  basket: IBasket;
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basketService.Baskket.subscribe((basket) => {
      this.basket = basket;
    });
  }

  decreament(itemId: IBasketItem) {
    this.basketService.decreament(itemId);
  }
  increament(itemId: IBasketItem) {
    this.basketService.increament(itemId);
  }
  removeItem(itemId: IBasketItem) {
    this.basketService.removeItem(itemId);
  }
  
}

