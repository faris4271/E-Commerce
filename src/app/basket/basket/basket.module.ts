import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasketRoutingModule } from './basket-routing.module';
import { BasketComponent } from './basket/basket.component';
import { OrdertotalComponent } from '../../component/ordertotal/ordertotal.component';


@NgModule({
  declarations: [
    BasketComponent,
    OrdertotalComponent
  ],
  imports: [
    CommonModule,
    BasketRoutingModule,

  ]
})
export class BasketModule { }
