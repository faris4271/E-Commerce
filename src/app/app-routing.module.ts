import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './component/product/product.component';
import { ProductItemComponent } from './component/product-item/product-item.component';
import { HomeComponent } from './component/home/home.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {path:'home',component:HomeComponent},
  {path:'product',loadChildren:()=>import("./component/product/product/product.module").then(m=>m.ProductModule)},
  { path: "product-details/:id", component: ProductDetailsComponent },
  {path:'basket',loadChildren:()=>import("./basket/basket/basket.module").then(m=>m.BasketModule)},
  {path:'checkout',loadChildren:()=>import("./component/checkout/checkout.module").then(m=>m.CheckoutModule)},
   {path:'accunt',loadChildren:()=>import("./identity/identity.module").then(m=>m.IdentityModule)},
  { path: "**", redirectTo: "home", pathMatch: "full" },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
