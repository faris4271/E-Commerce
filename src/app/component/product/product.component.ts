import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../Services/services.service';
import { IProduct } from '../../Models/IProduct';
import { Param_Product } from '../../Models/Params-Product';
import { ICategory } from '../../Models/ICategory';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ToastrService } from 'ngx-toastr';
import { ProductItemComponent } from '../product-item/product-item.component';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})

export class ProductComponent implements OnInit {
  Product:IProduct[]= [];
  Params=new Param_Product();
  TotalCount:number;
  Category:ICategory[]= [];
  sortingArray=[
  
    {name:"Price Low to High",value:"PriceAs"},
    {name:"Price High to Low",value:"PriceDes"},
  ];
 constructor(private _service:ServicesService,private toaster:ToastrService) { }
  ngOnInit(): void {
    
   this.GetCategory();
    this.GetallProducts();
    this.Params;
    this.sortingArray;
    
  }
  GetallProducts(){
   this._service.getallProduct(this.Params).subscribe(data=>{
      this.Product = data.product;
      this.Params.PageNumber = data.pageNumber;
      this.Params.PageSize = data.pageSize;
      this.TotalCount = data.count;
      this.toaster.success("all product loaded","SUCCESS")
    });
  }
  OnSearch(search:string){
    this.Params.Search = search;
    this.GetallProducts();
  }
  GetCategory(){
    this._service.getallCategory().subscribe(data=>{
      
      this.Category = data;
    });  }
    SetCategoryId(categoryId:number){
    this.Params.CategoryId = categoryId;
    this.GetallProducts()

}
selectvalu(event:Event)
{
  this.Params.Sort=(event.target as HTMLSelectElement).value;
  this.GetallProducts();

}
OnPageChange(event: any) {
  this.Params.PageNumber = event.page;
  this.GetallProducts();
}
}
