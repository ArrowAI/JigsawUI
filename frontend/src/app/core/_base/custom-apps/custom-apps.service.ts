import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
//import { Http, Headers, RequestOptions } from '@angular/http';
import {AuthService } from '../../auth/_services/auth.service'
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../crud';
// RxJS
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomAppsService {
  public headers;

  constructor(private http: HttpClient,private httpUtils: HttpUtilsService) { 
   // this.headers=AuthService.dreamheader();
  
  }




public getInstallAppList<T>(): Observable<T> {
  return this.http.get<T>('https://api.arrowai.in/api/v2/chat_developer/_table/applications_key?filter=(app_id%3D%2258906f07faad6f52008b456a%22)&limit=1&order=create_date%20desc',{headers:this.headers})
}

	
  
  installNewApp(){
   return[{name:'facebook',icon:'fa fa-flaticon-facebook-letter-logo fa-3x',descripiotn:' Automate your Facebook Messanger with arrow ai bot '}]
  }
  getAppLsitByType(){

  }
  getAppViewById(){

    return this.http.get(""+ '/users/authenticateUser');

  }
}
