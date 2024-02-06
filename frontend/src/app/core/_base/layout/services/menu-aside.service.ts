// Angular
import { Injectable } from '@angular/core';
// RxJS
import { BehaviorSubject } from 'rxjs';
// Object path
import * as objectPath from 'object-path';
// Services
import { MenuConfigService } from './menu-config.service';

@Injectable()
export class MenuAsideService {
	// Public properties
	menuList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

	/**
	 * Service constructor
	 *
	 * @param menuConfigService: MenuConfigService
	 */
	constructor(private menuConfigService: MenuConfigService) {
		// this.loadMenu();
	}

	/**
	 * Load menu list
	 */
	loadMenu(installedModule = []) {
		// alert("menu aside serve")
		// get menu list
		const menuItems: any[] = objectPath.get(this.menuConfigService.getMenus(), 'aside.items');
		const installedMemu = [];
		
		installedModule.forEach(module => {
			if(module!=null)
			if(module.type=="application")
			 installedMemu.push({
				id:module._id,
				 title: module.menuName,
			 root: true,
			 bullet: 'dot',
			 icon:decodeURIComponent(module.menuIcon) || "fab fa-creative-commons-nd",
			 page: `/external/module/${module.name}`})	
		});
		this.menuList$.next(menuItems);
	}
}
