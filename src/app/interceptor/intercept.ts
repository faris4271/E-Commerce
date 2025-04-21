import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { delay, finalize, Observable } from 'rxjs';
import { LoadingService } from '../Services/load/loading.service';

@Injectable()
export class LoadInterceptor implements HttpInterceptor {
    constructor(private _service:LoadingService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this._service.loading();
        return next.handle(req).pipe(
            // delay(1000),
            finalize(()=>{
                this._service.hideloading();
            })
        );
    }
}