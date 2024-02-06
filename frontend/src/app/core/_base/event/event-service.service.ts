import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/_services/auth.service'
import { HttpUtilsService, QueryParamsModel, QueryResultsModel } from '../crud';

// RxJS
import { Observable, BehaviorSubject } from 'rxjs';
// import { environment } from './../../../../../src/environments/environment';
import * as environment from '../../../../assets/app-config.json';

import { HeaderService } from '../layout/services/header-service';
import { SubheaderService, MenuAsideService } from '../layout';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { Login, UserLoaded } from '../../auth';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient,
    private httpUtils: HttpUtilsService,
    private headerService: HeaderService,
    private store: Store<AppState>,
    private menuAsideService: MenuAsideService,
    private subheaderService: SubheaderService) {

  }
  public elementEventObs$: BehaviorSubject<any> = new BehaviorSubject(null);


  elementEvent(eventDetail: any, applicationDetail: any, allElements: any, user) {
    let event = eventDetail.detail;
    if (event != null)
      switch (event.method) {
        case 'setHeaderTabs':
          let { tabs } = event.data;
          this.headerService.setHeaderTabs(tabs);
          break
        case 'setBreadcrumbs':
          let { breadcrumbs } = event.data;
          this.subheaderService.setBreadcrumbs(breadcrumbs);
          break
        case 'setActiveTab':
          let { activeTab } = event.data;
          // this.reloadApplicationConfig();
          this.headerService.setActiveTab(activeTab)
          break
        case 'setTitle':
          let { showBack, title } = event.data;
          this.subheaderService.setTitle(title, showBack)
          break
        case 'hideSubHeader':
          let { showHide } = event.data;
          this.subheaderService.hideSubHeader(showHide);
          break;
        case 'sendMessageToUser':
          this.sendMessageToUser(event.data);
          break;
        case 'getInstalledModule':
          this.getInstalledModule(event.data, applicationDetail, allElements);
          break;
        case 'getActiveUser':
          this.getActiveUser(user);
          break;
        case 'changeApplicationConfig':
          this.changeApplicationConfig(event.data, user,event.type);
          break;
        default:
          console.log("invalid event");
      }
  }
  changeApplicationConfig(event, activeUser,type) {
    // alert();
    console.table("event change application config",event)
    switch (type) {
      case 'integration':
        activeUser.integration = event.integration;
        break;
      case 'bots':
        activeUser.integration = event.bots;
        break;
      case 'modules':
        activeUser.installedModules = event.installedModules;
        this.menuAsideService.loadMenu(activeUser['activeApplication']['installedModules'])
        break;
    }
    let userToken = localStorage.getItem(environment.authTokenKey);
    localStorage.setItem(userToken, JSON.stringify(activeUser))
    // this.store.dispatch(new UserLoaded({ user: activeUser }));
  }
  getActiveUser(user) {
    window.dispatchEvent(new CustomEvent("customEvent", {
      detail: {
        type: "activeUser",
        ActiveUser: user
      }
    }));
  }
  getInstalledModule(event, activeApplication, allElements) {
    let modules = []
    let installedModule = activeApplication['installedModules'].filter(module => module.type == event.type);
    allElements.forEach(module => {
      installedModule.forEach(installed => {
        if (installed._id)
          if (module._id == installed._id) {
            modules.push(module)
          }
      });

    })
    window.dispatchEvent(new CustomEvent("customEvent", {
      detail: {
        type: "installedModules",
        installedModules: modules
      }
    }));
  }
  sendMessageToUser(eventDetail) {
    this.setElementEventObs(eventDetail);
  }
  setElementEventObs(event: any) {
    this.elementEventObs$.next(event);
  }
  getElementEventObs(): Observable<any> {
    return this.elementEventObs$.asObservable();
  }
}
