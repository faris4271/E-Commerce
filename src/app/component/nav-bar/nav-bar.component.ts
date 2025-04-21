import { Component, OnInit } from '@angular/core';
import {MatBadgeModule} from '@angular/material/badge';
import { BasketService } from '../../basket/basket/basket.service';
import { Observable } from 'rxjs';
import { IBasket } from '../../Models/BasketModel';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  constructor( private _service:BasketService) { }
  ngOnInit(): void {
    const basketId = localStorage.getItem('BasketId');
    if (basketId) {
      this._service.GetBasket(basketId).subscribe({
        next: (res) => {
          this.count = this._service.Baskket;
        },
        error: (err) => {
          console.error('Error fetching basket:', err.message);
          this.count = null; // Reset count if there's an error
        }
      });
    }
  }
count:Observable<IBasket> ;
  
  visibleMenu = false;
  visibleCart = false;
  visibleAccunt = false;
  visibleSearch = false;
  showMenu() {
    
    this.visibleMenu = !this.visibleMenu;
  }
  showCart() {
    this.visibleCart = !this.visibleCart;
  }
  showAccunt() {
    this.visibleAccunt = !this.visibleAccunt;
  }
  showSearch() {
    this.visibleSearch = !this.visibleSearch;
  }
 
  
}
