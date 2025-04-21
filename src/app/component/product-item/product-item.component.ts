import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../Models/IProduct';
import { BasketService } from '../../basket/basket/basket.service';

@Component({
  selector: 'app-product-item',
  standalone: false,
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent implements OnInit {
  constructor(private _Services:BasketService){}
ngOnInit(): void {
  this.product;
}
@Input() product: IProduct;

SetBasketValue()
{
  this._Services.AddItemToBasket(this.product);
}
}
