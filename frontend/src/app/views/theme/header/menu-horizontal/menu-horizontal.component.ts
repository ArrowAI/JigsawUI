// Angular
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	OnInit,
	Renderer2
} from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
// RxJS
import { filter } from 'rxjs/operators';
// Object-Path
import * as objectPath from 'object-path';
// Layout
import {
	LayoutConfigService,
	MenuConfigService,
	MenuHorizontalService,
	MenuOptions,
	OffcanvasOptions
} from '../../../../core/_base/layout';
// HTML Class
import { HtmlClassService } from '../../html-class.service';
import { currentUser, Logout, User, UserLoaded, UserRequested, Login } from '../../../../core/auth';
import { Observable } from 'rxjs';
// NGRX
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { LayoutUtilsService } from '../../../../core/_base/crud';
import { TranslateService } from '@ngx-translate/core';
import { NewApplicaitonComponent } from '../../../pages/application/new-applicaiton/new-applicaiton.component';
import { environment } from '../../../../../../src/environments/environment';
// import * as environment from '../../../../../assets/app-config.json';

import { HeaderService } from '../../../../core/_base/layout/services/header-service';
export interface Tabs {
	name: string;
	url: string;
	baseRoute: string;
}
@Component({
	selector: 'kt-menu-horizontal',
	templateUrl: './menu-horizontal.component.html',
	styleUrls: ['./menu-horizontal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})


export class MenuHorizontalComponent implements OnInit, AfterViewInit {
	// Public properties
	currentRouteUrl: any = '';

	tabs$: Tabs[];
	user$: Observable<User>;

	rootArrowEnabled: boolean;

	menuOptions: MenuOptions = {
		submenu: {
			desktop: 'dropdown',
			tablet: 'accordion',
			mobile: 'accordion'
		},
		accordion: {
			slideSpeed: 200, // accordion toggle slide speed in milliseconds
			expandAll: false // allow having multiple expanded accordions in the menu
		},
		dropdown: {
			timeout: 50
		}
	};

	offcanvasOptions: OffcanvasOptions = {
		overlay: true,
		baseClass: 'kt-header-menu-wrapper',
		closeBy: 'kt_header_menu_mobile_close_btn',
		toggleBy: {
			target: 'kt_header_mobile_toggler',
			state: 'kt-header-mobile__toolbar-toggler--active'
		}
	};

	/**
	 * Component Conctructor
	 *
	 * @param el: ElementRef
	 * @param htmlClassService: HtmlClassService
	 * @param menuHorService: MenuHorService
	 * @param menuConfigService: MenuConfigService
	 * @param layoutConfigService: LayouConfigService
	 * @param router: Router
	 * @param render: Renderer2
	 * @param cdr: ChangeDetectorRef
	 */
	constructor(

		private el: ElementRef,
		public htmlClassService: HtmlClassService,
		public menuHorService: MenuHorizontalService,
		private menuConfigService: MenuConfigService,
		private layoutConfigService: LayoutConfigService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private render: Renderer2,
		private cdr: ChangeDetectorRef,
		private store: Store<AppState>,
		public dialog: MatDialog,
		private layoutUtilsService: LayoutUtilsService,
		private translate: TranslateService,
		private headerService: HeaderService
	) {
	}


	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * After view init
	 */
	ngAfterViewInit(): void {
	}

	/**
	 * On init
	 */
	selectedTab = 0;
	ngOnInit(): void {
		this.user$ = this.store.pipe(select(currentUser));
		this.headerService.tabs$.subscribe(data => {
			this.tabs$ = data;
			console.log(data);
			this.cdr.detectChanges();
		})
		this.headerService.selectedaTab$.subscribe(selected => {
			this.selectedTab = selected;
		})
		this.rootArrowEnabled = this.layoutConfigService.getConfig('header.menu.self.root-arrow');
		this.currentRouteUrl = this.router.url;
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(event => {
				this.currentRouteUrl = this.router.url;
				this.cdr.markForCheck();
			});
	}

	/**
	 * Return Css Class Name
	 * @param item: any
	 */
	getItemCssClasses(item) {
		let classes = 'kt-menu__item';

		if (objectPath.get(item, 'submenu')) {
			classes += ' kt-menu__item--submenu';
		}

		if (!item.submenu && this.isMenuItemIsActive(item)) {
			classes += ' kt-menu__item--active kt-menu__item--here';
		}

		if (item.submenu && this.isMenuItemIsActive(item)) {
			classes += ' kt-menu__item--open kt-menu__item--here';
		}

		if (objectPath.get(item, 'resizer')) {
			classes += ' kt-menu__item--resize';
		}

		const menuType = objectPath.get(item, 'submenu.type') || 'classic';
		if ((objectPath.get(item, 'root') && menuType === 'classic')
			|| parseInt(objectPath.get(item, 'submenu.width'), 10) > 0) {
			classes += ' kt-menu__item--rel';
		}

		const customClass = objectPath.get(item, 'custom-class');
		if (customClass) {
			classes += ' ' + customClass;
		}

		if (objectPath.get(item, 'icon-only')) {
			classes += ' kt-menu__item--icon-only';
		}

		return classes;
	}

	/**
	 * Returns Attribute SubMenu Toggle
	 * @param item: any
	 */
	getItemAttrSubmenuToggle(item) {
		let toggle = 'hover';
		if (objectPath.get(item, 'toggle') === 'click') {
			toggle = 'click';
		} else if (objectPath.get(item, 'submenu.type') === 'tabs') {
			toggle = 'tabs';
		} else {
			// submenu toggle default to 'hover'
		}

		return toggle;
	}

	/**
	 * Returns Submenu CSS Class Name
	 * @param item: any
	 */
	getItemMenuSubmenuClass(item) {
		let classes = '';

		const alignment = objectPath.get(item, 'alignment') || 'right';

		if (alignment) {
			classes += ' kt-menu__submenu--' + alignment;
		}

		const type = objectPath.get(item, 'type') || 'classic';
		if (type === 'classic') {
			classes += ' kt-menu__submenu--classic';
		}
		if (type === 'tabs') {
			classes += ' kt-menu__submenu--tabs';
		}
		if (type === 'mega') {
			if (objectPath.get(item, 'width')) {
				classes += ' kt-menu__submenu--fixed';
			}
		}

		if (objectPath.get(item, 'pull')) {
			classes += ' kt-menu__submenu--pull';
		}

		return classes;
	}

	/**
	 * Check Menu is active
	 * @param item: any
	 */
	isMenuItemIsActive(item): boolean {
		if (item.submenu) {
			return this.isMenuRootItemIsActive(item);
		}

		if (!item.page) {
			return false;
		}

		return this.currentRouteUrl.indexOf(item.page) !== -1;
	}

	/**
	 * Check Menu Root Item is active
	 * @param item: any
	 */
	isMenuRootItemIsActive(item): boolean {
		if (item.submenu.items) {
			for (const subItem of item.submenu.items) {
				if (this.isMenuItemIsActive(subItem)) {
					return true;
				}
			}
		}

		if (item.submenu.columns) {
			for (const subItem of item.submenu.columns) {
				if (this.isMenuItemIsActive(subItem)) {
					return true;
				}
			}
		}

		if (typeof item.submenu[Symbol.iterator] === 'function') {
			for (const subItem of item.submenu) {
				const active = this.isMenuItemIsActive(subItem);
				if (active) {
					return true;
				}
			}
		}

		return false;
	}
	/**
	 * Change User Applications
	 * @parm application:any
	 */
	changeApplication(_user, selectedApplication) {
		if (!!selectedApplication) {
			let newUser = Object.assign({}, _user);
			console.log(selectedApplication);
			//selectedApplication._id="5c57d2c10591b310008b4567"
			newUser['activeApplication'] = selectedApplication;
			//console.log(_user);
			this.store.dispatch(new UserLoaded({ user: newUser }));

		}


	}
	onTabChanged(index) {
		this.headerService.navigateToRoute(this.tabs$[index])
	}
	addNewApp() {
		let saveMessageTranslateParam = 'ECOMMERCE.SEGMENT.EDIT.';
		saveMessageTranslateParam = 'ADD_MESSAGE';
		const _saveMessage = this.translate.instant(saveMessageTranslateParam);
		const dialogRef = this.dialog.open(NewApplicaitonComponent, { data: "" });
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}
			const userToken = localStorage.getItem(environment.authTokenKey);
			this.store.dispatch(new Login({ authToken: userToken }));



			//    this.layoutUtilsService.showActionNotification(_saveMessage, _messageType);

		});

	}
}
