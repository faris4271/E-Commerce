import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
baseUrl=environment.basUrl;
  constructor(private http:HttpClient) { }
  register(user:any){
    return this.http.post(this.baseUrl+'Accunt/register',user);
  }
}
