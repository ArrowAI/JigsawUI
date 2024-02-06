// Angular
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// RxJS
import { BehaviorSubject, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
// Object-Path
import * as objectPath from 'object-path';
// Services
import { PageConfigService } from './page-config.service';
import { MenuConfigService } from './menu-config.service';


export interface TabAction {
	url: string;
	baseUrl: string;
}


export interface Tabs {
	name: string;
	url: string;
	baseRoute: string;
}

@Injectable()
export class HeaderService {
	// Public properties
	tabs$: BehaviorSubject<Tabs[]> = new BehaviorSubject<Tabs[]>([]);
	selectedaTab$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
	selectTab$: BehaviorSubject<Tabs> = new BehaviorSubject<Tabs>({name:'',url:'',baseRoute:''});
	constructor(
		) {

	}
	/**
	 * 
	 * Manually set Actions Buttons
	 */
	setHeaderTabs(tabs: Tabs[] | any[]) {
		this.tabs$.next(tabs);
	}
	navigateToRoute(tab) {
		console.log(tab);
		this.selectTab$.next(tab);
	}
	setActiveTab(index){
		// this.selectedaTab$.next(index);
	}


}
