import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  RequestCount:number=0;
  constructor(private _spinnerService: NgxSpinnerService) { }
loading()
{
  this.RequestCount++;
  this._spinnerService.show(undefined,{
     bdColor : "rgba(0, 0, 0, 0.8)",
      size : "medium",
       color: "#fff",
        type :"square-jelly-box",
        fullScreen : true

  })

}
hideloading()
{
  this.RequestCount--;
  if(this.RequestCount<=0)
  {
   this.RequestCount=0;
   this._spinnerService.hide();
  }
}
}
