import { Component, OnInit } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ServicesService } from '../../Services/services.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../Models/IProduct';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from '../../basket/basket/basket.service';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  product:IProduct;
  MainImage:string;
  quantity:number=1;
constructor(
  private _service:ServicesService,
  private basketservices:BasketService,
  private rout:ActivatedRoute,
  private toast:ToastrService,
  
){}
  ngOnInit(): void {
    this.GetProductById();
  }
GetProductById()
{
 this._service.GetProductById(Number(this.rout.snapshot.paramMap.get("id"))).subscribe(data=>{
  this.product=data;
  this.MainImage=data.photos[0].imageName;
 }
  
 )
}
ChangImage(imag:string){
this.MainImage=imag;
}
increament()
{
if(this.quantity<10)
{
  this.quantity++;
  this.toast.success("Added to basket","Success",)
}
else
{
  this.toast.error("You can't add more than 10 items","Error")
}
}
decreament()
{
  if(this.quantity>1)
  {
    this.quantity--;
    this.toast.success("Removed from basket","Success")
  }
  else
  {
    this.toast.error("You can't remove more than one item","Error")
  }
}
AddToBasket()
{
  this.basketservices.AddItemToBasket(this.product,this.quantity);
    this.toast.success("Added to basket","Success")

}
calculateDiscount(Oldprice:number, NewPrice:number):number
{
  return Math.round(((Oldprice - NewPrice) / Oldprice) * 100);

}
}