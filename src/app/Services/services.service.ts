import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../Models/IPagination';
import { Param_Product } from '../Models/Params-Product';
import { ICategory } from '../Models/ICategory';
import { IProduct } from '../Models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  constructor(private http:HttpClient) { }
basUrl:string="https://localhost:7178/api/"
  getallProduct(product:Param_Product){
    let param=new HttpParams();
    if(product.CategoryId){
      param=param.append("categoryid",product.CategoryId);
    }
    if(product.Sort){
      param=param.append("Sort",product.Sort);
    }
    if(product){
      param=param.append("search",product.Search);
    }
    param=param.append("PageNumber",product.PageNumber);
    param=param.append("PageSize",product.PageSize);
    return this.http.get<IPagination>(this.basUrl+'Productes/Get-All',{params:param})
  }
  getallCategory(){
    return this.http.get<ICategory[]>(this.basUrl+'Category/Get_All')
  }
  GetProductById(id:number)
  {
    return this.http.get<IProduct>(this.basUrl+"Productes/GetById/"+id);
  }
}
