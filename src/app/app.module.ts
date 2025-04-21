import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatBadgeModule} from '@angular/material/badge';
import { AppRoutingModule } from './app-routing.module';
import { MatTableModule } from '@angular/material/table';
import { AppComponent } from './app.component';
import { ProductComponent } from './component/product/product.component';
import { ProductItemComponent } from './component/product-item/product-item.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { HomeComponent } from './component/home/home.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

import { ProductModule } from './component/product/product/product.module';
import { LoadInterceptor } from './interceptor/intercept';
import { CommonModule } from '@angular/common';
import { OrdertotalComponent } from './component/ordertotal/ordertotal.component';
import { BasketModule } from './basket/basket/basket.module';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductItemComponent,
    NavBarComponent,
    ProductDetailsComponent,
    HomeComponent,
   
    
    // MatTableModule should not be declared here
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
   FormsModule,
    HttpClientModule,
    PaginationModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MatBadgeModule,
    
    CommonModule,
    MatTableModule, // MatTableModule should only be imported here
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton:true,
      countDuplicates:true,
      progressBar:true
    })
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi()),
    {provide:HTTP_INTERCEPTORS,useClass:LoadInterceptor,multi:true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
