import { Injectable, PLATFORM_ID, Inject } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from './../../../../src/environments/environment';
// import * as environment from '../../../assets/app-config.json';


@Injectable({
  providedIn: 'root'
})
export class ApplicaitonService {


    constructor(private http: HttpClient,@Inject(PLATFORM_ID) private platformId: Object) { }
  
   addApplication(application:any) {
      var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
     return this.http.post(`${environment.API_SERVER}/application/addnewapplication`,{name:application.name,description:application.description},{headers:reqHeader});
   }
   
  
  
  }
  