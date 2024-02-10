import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn:'root'})
export class AppConfigService {
   private appConfig;

   constructor (private injector: Injector) { }
   loadAppConfig() {
    // console.log("loadAppConfig Called")
       let http = this.injector.get(HttpClient);
       return http.get('/assets/app-config.json')
       .toPromise()
       .then(data => {
           this.appConfig = data;
       })
   }
   get config() {
       console.log(this.appConfig)
       return this.appConfig;
   }
}
