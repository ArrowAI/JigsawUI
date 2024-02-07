// Angular
import { Location } from "@angular/common";
import {
	AfterViewInit,
	Component,
	Input,
	OnDestroy,
	OnInit,
} from "@angular/core";
// RxJS
import { Subscription } from "rxjs";
import { environment } from "./../../../../../../environments/environment";
// import * as environment from '../../../../../../assets/app-config.json';

// Layout
import { SubheaderService } from "../../../../../core/_base/layout";
import {
	Breadcrumb,
	ActionButton,
} from "../../../../../core/_base/layout/services/subheader.service";

@Component({
	selector: "kt-subheader3",
	templateUrl: "./subheader3.component.html",
	styleUrls: ["./subheader3.component.scss"],
})
export class Subheader3Component implements OnInit, OnDestroy, AfterViewInit {
	// Public properties
	@Input() fluid: boolean;
	@Input() clear: boolean;

	today: number = Date.now();
	title: string = "";
	desc: string = "";
	breadcrumbs: Breadcrumb[] = [];
	actionButton: ActionButton[] = [];
	showBack: any;
	showDemo: any = null;

	// Private properties
	private subscriptions: Subscription[] = [];

	/**
	 * Component constructor
	 *
	 * @param subheaderService: SubheaderService
	 */
	constructor(
		public subheaderService: SubheaderService,
		private _location: Location
	) {}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		this.showDemo = localStorage.getItem("demoAccount");
	}
	openDemo() {

		// let url = environment.DEMO_TYPES.find(
		// 	(demo) =>  demo.type == this.showDemo
		// ).url;
		// console.log(url);
		// window.open(url);
	}

	/**
	 * After view init
	 */
	ngAfterViewInit(): void {
		this.subscriptions.push(
			this.subheaderService.title$.subscribe((bt) => {
				// breadcrumbs title sometimes can be undefined
				if (bt) {
					Promise.resolve(null).then(() => {
						this.title = bt.title;
						this.desc = bt.desc;
						this.showBack = bt.showBack;
					});
				}
			})
		);

		this.subscriptions.push(
			this.subheaderService.breadcrumbs$.subscribe((bc) => {
				Promise.resolve(null).then(() => {
					this.breadcrumbs = bc;
				});
			})
		);
		this.subscriptions.push(
			this.subheaderService.actionButton$.subscribe((ac) => {
				Promise.resolve(null).then(() => {
					this.actionButton = ac;
				});
			})
		);
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.subscriptions.forEach((sb) => sb.unsubscribe());
	}
	goBack() {
		this._location.back();
	}
	saveFunction(data) {
		this.subheaderService.callFunction(data);
	}
}
