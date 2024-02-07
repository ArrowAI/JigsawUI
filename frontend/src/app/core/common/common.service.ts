import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { HttpUtilsService, QueryResultsModel } from '../_base/crud';
import { HttpClient } from '@angular/common/http';
// import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import 'clipboard';

import 'prismjs';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';
import { environment } from './../../../environments/environment';
// import * as environment from '../../../assets/app-config.json';

import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
// import { activeUser } from '../auth';
import { element } from 'protractor';
declare var Prism: any;
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private data = new BehaviorSubject('');
  currentData = this.data.asObservable()

  constructor(
    private http: HttpClient,
    private httpUtils: HttpUtilsService,
    private store: Store<AppState>,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  updateMessage(item: any) {
    this.data.next(item);
  }
  // READ
  getModuleList() {
    //	return this.http.post<any>("https://apiserver.arrowai.in");
    return {
      "_id": "5c57d2c10591b310008b4567",
      "name": "Royal Enfield Support",
      "users": [
        {
          "user_id": "578666b63a488b4d008b4567",
          "created_at": 1552157394028,
          "role": "owner",
          "username": ""
        },
        {
          "user_id": "5d00966a3389481200000000",
          "created_at": 1552157394028,
          "role": "rep",
          "username": "payal"
        }
      ],
      "menus": [],
      "bots": [
        {
          "bot_id": "5ca5fb477721bdfc2800002d",
          "bot_text": "Royal Enfield Support",
          "language": "en"
        }
      ],
      "public": 1,
      "repository": "owner",
      "default_module": [
        {
          "features": {
            "trigger": {
              "name": "57ac73c051977e4d008b4569",
              "id": "57ac73c051977e4d008b4569"
            }
          }
        }
      ],
      "category": "web",
      "description": "Royal enfield hr support",
      "image_url": "",
      "tags": "1",
      "addedIntegration": {
        "2": {
          "state": "2",
          "status": true
        },
        "4": {
          "status": true,
          "state": "4"
        },
        "13": {
          "status": true,
          "state": "13"
        },
        "14": {
          "status": true,
          "state": "14"
        },
        "17": {
          "status": true,
          "state": "17"
        }
      },
      "integration": {
        "web": {
          "config": ""
        },
        "facebook": {
          "accessToken": "EAAJOdDhYZCe0BANEJrM1Bs3FSVaoLiCK6WmBlOY0IsnXJGWfCtjfzZBiSsOjsZBBRnNlwyd0wAgLHZAStdQ61FpCFrsNzqrCDZAxDfZAeaO58WmdpWmnLStvVZBiLrWMdC7JmQk4gYKISVzXYvg4R7sDJHHing4ZBaxOiavNgTvR2XOmPZCmqac8n",
          "validationToken": "1234",
          "status": true
        },
        "android": {
          "config": ""
        }
      },
      "enableModes": 0,
      "sorrySentence": [],
      "timeout": 300,
      "unclearMaxCount": 3,
      "userEmails": [],
      "__v": 0,
      "webhookUrl": "Dialog Flow Bot"
    }

  }
  getApplicaionIntegration(applicaitonId, integration): Observable<any> {
    return of({})
    // let integrationList = []
    // console.log(applicaitonId);
    // return this.db.list('applications/' + applicaitonId + "/integration").snapshotChanges()
    //   .pipe(map(items => {            // <== new way of chaining
    //     let integrationConfig = items.map(a => {
    //       const data = a.payload.val();
    //       const key = a.payload.key;
    //       return <any>{ key, data };           // or {key, ...data} in case data is Obj
    //     });
    //     for (var integrationKey in integration) {
    //       var selectedIntegration = {};
    //       if (integration.hasOwnProperty(integrationKey)) {
    //         selectedIntegration["integration"] = integrationKey;
    //         const savedIntegration = integrationConfig.filter(filterIntegration => filterIntegration['key'] == integrationKey);
    //         savedIntegration.forEach((bots: any) => {
    //           for (var botKey in bots) {
    //             if (bots.hasOwnProperty(botKey)) {
    //               selectedIntegration[botKey] = bots[botKey];
    //             }
    //           }
    //         });
    //       }
    //       if (!selectedIntegration.hasOwnProperty('data')) {
    //         selectedIntegration['data'] = { botType: '', selectedBot: '' }
    //       }
    //       if (selectedIntegration.hasOwnProperty('data')) {
    //         if (!selectedIntegration['data'].hasOwnProperty('botType')) {
    //           selectedIntegration['data'] = { botType: '', selectedBot: '' }
    //         }
    //       }
    //       integrationList.push(selectedIntegration)
    //     }
    //     return integrationList;
    //   }));

  }
  saveAutomationInFirebase(applicationId, integration, integrationConfig) {
    let postData = {
      "appId": applicationId,
      "integrationId": integration,
      "integrationConfig": integrationConfig
    }
    return this.http.post<any>(environment.API_SERVER + "/integration", postData).pipe(
      map((res: any) => {
        return res
      }))
    //
  }

  getConversationPerDay(applicaitonId: string): Observable<any> {
    let postData = {
      appId: applicaitonId
    }
    return this.http.post<any>(environment.AIHR_SERVER + "/dashboard/averageConversationPerDay", postData).pipe(
      map((res: any) => {
        return res
      }))
  }
  totalInteractionPerDay(applicaitonId: string): Observable<any> {
    let postData = {
      appId: applicaitonId
    }
    return this.http.post<any>(environment.AIHR_SERVER + "/dashboard/totalInteractionPerDay", postData).pipe(
      map((res: any) => {
        return res
      }))

  }
  enableIntegration(applicationId: string, integration: string, postData: any) {

    return this.http.post<any>(environment.API_SERVER + "/integration", postData).pipe(
      map((res: any) => {
        return res
      }))
  }
  updateSystemConfiguration(applicationId, applicaiton, systemProperty, userProperty) {

    let applicaitonDetail = applicaiton;
    // delete applicaitonDetail['_id'];
    let applicationUsers = applicaitonDetail.users.map(data => {
    })
    applicaitonDetail['userProperties'] = userProperty;
    applicaitonDetail['systemProperties'] = systemProperty;
    let postData = {
      applicationId: applicationId,
      applicationDetail: {
        userProperties: userProperty,
        systemProperties: systemProperty
      }
    }
    console.log(postData);
    return this.http.post<any>(environment.API_SERVER + "/application/updateApplication", postData).pipe(
      map((res: any) => {
        return res
      }))
  }
  updateApplication(applicaiton) {

    return this.http.post<any>(environment.API_SERVER + "/application/updateApplication", applicaiton).pipe(
      map((res: any) => {
        return res
      }))
  }
  getApplicationEventSchema() {
    return {
      "applicationId": "fdhsfgdsfgdjshfgdsjf",
      "events": [{
        "name": "New User Created",
        "variable": "newUser",
        type: 'string',
        "properties": [{
          "name": "Channel",
          "type": "enum",
          "variable": "integration",
          'values': ['web', 'facebook', 'whatsapp', 'dialogFlow']
        }],

      },
      {
        "name": "Message Send",
        "variable": "newMessage",
        "properties": [{
          "name": "Channel",
          "type": "enum",
          "variable": "integration",
          'values': ['web', 'facebook', 'whatsapp', 'dialogFlow']
        }],

      }, {
        "name": "Raise Ticket",
        "variable": "raiseTicket",
        "properties": [{
          "name": "Channel",
          "type": "enum",
          "variable": "integration",
          'values': ['web', 'facebook', 'whatsapp', 'dialogFlow']
        }],

      }]
    }
  }
  getUserProperty() {
    return [{
      "name": "Employee_ID",
      "type": "string",
      variable: "Employee_ID"
    },
    {
      "name": "Email_ID",
      "type": "string",
      variable: "Email_ID",
    },
    {
      "name": "Role",
      variable: "Role",
      "type": "string",
    },
    {
      "name": "First_Name",
      variable: "First_Name",
      "type": "string",

    }, {
      "name": "Middle_Name",
      variable: "Middle_Name",
      "type": "string"
    }, {
      "name": "Last_Name",
      variable: "Last_Name",
      "type": "string"

    }, {
      "name": "Gender",
      variable: "Gender",
      "type": "string"

    }, {
      "name": "Designation",
      variable: "Designation",
      "type": "string"
    }, {
      "name": "Department",
      variable: "Department",
      "type": "string"


    }, {
      "name": "Location",
      variable: "Location",
      "type": "string"

    }]

  }


  saveIntegrationAutomation(applicationId, integration, integrationConfig) {
    let postData = {
      "appId": applicationId,
      "integrationId": integration,
      "integrationConfig": integrationConfig
    }
    return this.http.post<any>(environment.API_SERVER + "/integration", postData).pipe(
      map((res: any) => {
        return res
      }))
    //
  }
  getElementsFromStore() {
    // this.store.pipe(select(activeUser)).subscribe(elements => {
    //   return of(elements);
    // })
  }
  getElementList() {
    return this.http.get<any>(`${environment.API_SERVER}/elements`);
  }
  getAgentChatModuleList() {
    return this.http.get<any>(`${environment.API_SERVER}/agentchatmodules`);
  }
  getElementDetail(elementName) {
    return this.http.get<any>(`${environment.API_SERVER}/elements/${elementName}`);
  }
  getAllIntegrations(): Observable<any[]> {
    return this.http.get<any[]>(environment.API_SERVER + "/integration/integrationMarketPlace").pipe(
      map((res: any) => {
        // res["id"]=res._id;
        return res
      }))
    //
  }
  search(queryParams: any, applicationId, token): Observable<any> {
    const httpHeaders = this.httpUtils.getHTTPHeaders();
    return this.http.post<QueryResultsModel>(`${environment.INTERACTION_ENGINE}/users/getUsers`, {
      "limit": 50,
      "page": 0,
      "filters": [{ "match": queryParams.filter }],
      "fields": { "_id": 1, "data": 1 }, "sortBy": { "data.name": 1 },
      "sessionid": token,
      // "applicationId": queryParams['filter']['applicationId'],
      "app_id": applicationId
    }
      , {
        headers: httpHeaders
      }).pipe(map(res => {
        return res['users']
      }))
    // const url = 'https://api.github.com/search/repositories';
    // return this.http
    //   .get<any>(url, {
    // 	observe: 'response',
    // 	params: {
    // 	  q: query,
    // 	  sort: 'stars',
    // 	  order: 'desc'
    // 	}
    //   })
    //   .pipe(
    // 	map((res: any) => {
    // 	  return res.body;
    // 	})
    //   );
  }
  sendComponents(data) {
    return this.http.post<any>(`${environment.INTERACTION_ENGINE}/campaign/sendComponent`, data);

  }

  getNotification(applicationId) {
    return this.http.get<any>(`${environment.INTERACTION_ENGINE}/notification/${applicationId}`);

  }


}
