import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../../../src/environments/environment';
// import * as environment from '../../../../../assets/app-config.json';

 
@Injectable({
  providedIn: 'root'
})
export class ClevertapService {

  constructor(private _http:HttpClient) { }

  getCleverTapData(){
    return this._http.get(`${environment.DASHBOARD_API}/getChart`)
  }

  getCleverTapToday(){
    return this._http.get(`${environment.DASHBOARD_API}/getChartToday`)
  }
  getActiveUser(){
    return this._http.get(`${environment.DASHBOARD_API}/getChartUser`)

  }
  
  getCampainData(appID){
    return this._http.get(`${environment.API_SERVER}/campaigns/${appID}`,{})
  }

  getBots(appID){
  var json= {
      "action":"listbots",
   
      "appId":appID
  }
 return this._http.post(`${environment.API_SERVER}/bots`,json)
  }
 
  getMonthUser(date,month,year){
 return this._http.post(`${environment.DASHBOARD_API}/getMonthNewUser`,{date,month,year});
  }

  getMonthActiveUser(date,month,year){
    return this._http.post(`${environment.DASHBOARD_API}/getMonthActiveUser`,{date,month,year});
 
  }
  getMonthConversation(date,month,year){
    return this._http.post(`${environment.DASHBOARD_API}/getMonthConversation`,{date,month,year});

  }
}
