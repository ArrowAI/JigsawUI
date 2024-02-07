import {
	Component,
	OnInit,
	Output,
	EventEmitter,
	AfterViewInit,
	ChangeDetectorRef,
	ViewEncapsulation,
	OnDestroy,
} from "@angular/core";
import { ModuleConfig } from '../../../app/core/_config/module.config';
import { Store, select } from "@ngrx/store";
import { AppState } from "../../../app/core/reducers";
import {
	currentUser,
	Login,
	activeUser,
} from "../../../app/core/auth";
// import { environment } from "./../../../../src/environments/environment";
import * as environment from '../../../assets/app-config.json';

import { DomSanitizer } from "@angular/platform-browser";
import { SubheaderService } from "../../../app/core/_base/layout";
import { HeaderService } from "../../../app/core/_base/layout/services/header-service";
import { CommonService } from "../../../app/core/common/common.service";

import { ActivatedRoute, Params, Router } from "@angular/router";
import { EventService } from "../../../app/core/_base/event/event-service.service";
// import { SendCampaignDialogComponent } from '../send-campaign-dialog/send-campaign-dialog.component';
import { MatDialog } from "@angular/material/dialog";
import { SendUserMessageComponent } from "../../../app/views/pages/send-user-message/send-user-message.component";
import { element } from "protractor";
import { MessagingService } from "../../../app/sevices/messaging.service";
// import { DynamicBuilder } from './dynamic.component';
import { Howl, Howler } from "howler";
import { Subscription } from "rxjs";
@Component({
	selector: "kt-module",
	template: `
	<ng-template #loading>
		<div class="centered" class="kt-splash-screen">
			<img alt="Logo" src="./assets/media/logos/logo.png" />
			<mat-spinner
				class="mat-spinner mat-progress-spinner mat-primary mat-progress-spinner-indeterminate-animation"
				diameter="40"
				mode="indeterminate"
				role="progressbar"
				style="width: 40px; height: 40px;"
				><svg
					focusable="false"
					preserveAspectRatio="xMidYMid meet"
					viewBox="0 0 34 34"
					style="width: 40px; height: 40px;"
				>
					<circle
						cx="50%"
						cy="50%"
						r="15"
						style="animation-name: mat-progress-spinner-stroke-rotate-40; stroke-dasharray: 94.2478px; stroke-width: 10%;"
					></circle></svg
			></mat-spinner>
		</div>
	</ng-template>
	<div *ngIf="user">
		<ax-lazy-element
			*axLazyElementDynamic="
				componentName;
				url: elementUrl;
				loadingTemplate: loading
			"
			[applicationid]="applicationId"
			[selected_tab_url]="selectedTab"
			(contaxtId)="(componentId)"
			(elementevent)="elementEvent($event)"
		>
		</ax-lazy-element>
	</div>
`,

	// templateUrl: './module.component.html',
	styleUrls: ["./module.component.scss"],
	encapsulation: ViewEncapsulation.None 
	// providers: [DynamicBuilder],
})
export class ModuleComponent implements OnInit, AfterViewInit, OnDestroy {
	user: any;
	private sub: any;
	constructor(
		private store: Store<AppState>,
		private subheaderService: SubheaderService,
		private headerService: HeaderService,
		private cdr: ChangeDetectorRef,
		private commonService: CommonService,
		private route: ActivatedRoute,
		private domSanatizer: DomSanitizer,
		private eventService: EventService,
		private dialog: MatDialog,
		private messagingService: MessagingService,
		private router: Router
	) { }
	content;
	component: any;
	componentId: string;
	elementUrl: string;
	applicationId: string ;
	elementName: string;
	allElements = [];
	installedModule = [];
	selectedTab = "/";
	componentName;
	showLoader: boolean = false;
	show;
	private subscriptions: Subscription = new Subscription();

	ngOnInit() {
		this.subscriptions.add(
			this.store.pipe(select(activeUser)).subscribe((data) => {
				let { user, elements } = data;
				console.table(data);
				this.cdr.detectChanges();
				//if (!elements.length) return;
				this.allElements = new ModuleConfig().configs.aside.items;
				this.subscriptions.add(
					this.route.params.subscribe((params: Params) => {
						this.cdr.detectChanges();
						let moduleName = params["id"];
						this.selectedTab = "/";
						this.elementUrl = "";
						this.componentName = "";
						this.componentId = "";
						this.cdr.detectChanges();
						this.showLoader = true;
						this.user = undefined;
						this.cdr.detectChanges();
						let data = this.allElements.find(
							(elem) => elem.name === moduleName
						);
						this.elementUrl = data.url;
						this.elementName = data.componentName;
						this.cdr.detectChanges();
						this.componentId = data.name;
						this.subscriptions.add(
							this.store.pipe(select(currentUser)).subscribe((user) => {
								this.user = user;
								console.log(this.user);
								if (!!user) {
									this.applicationId = user["activeApplication"]["_id"];
									this.componentName = data.componentName;
									this.cdr.detectChanges();
									this.headerService.setHeaderTabs([]);
									this.subheaderService.hideSubHeader(false);
									this.messagingService.requestPermission(
										this.applicationId
									);
									this.messagingService.receiveMessage();
									this.subscriptions.add(
										this.messagingService.currentMessage.subscribe(
											(notification) => {
												var sound = new Howl({
													src: [
														"../../../../assets/message_notification.mp3",
													],
												});
												if (notification != null) sound.play();
											}

										)
									);
								}
								else {
									const userToken = localStorage.getItem(
										environment.authTokenKey
									);
									this.store.dispatch(
										new Login({ authToken: userToken })
									);
								}
							})

						);
					})
				);
				this.subscriptions.add(
					this.eventService.elementEventObs$.subscribe((data) => {

					})
				);
				this.subscriptions.add(
					this.headerService.selectTab$.subscribe((selectedTab) => {
						this.changeRoute(selectedTab.url);
					})
				);
			})
		);
	}


	send(campaign: any, activeUser) {
		let data = {
			campaign,
			activeUser,
		};
		const dialogRef = this.dialog.open(SendUserMessageComponent, {
			data: data,
		});
		dialogRef.afterClosed().subscribe((res) => {
			if (!res) {
				return;
			}
		});
	}
	event() { }
	elementEvent(eventDetail: any) {
		let application = this.user["activeApplication"],
			elements = this.allElements,
			user = this.user;
		this.eventService.elementEvent(
			eventDetail,
			application,
			elements,
			user
		);
		// console.log(eventDetail);
		// let event = eventDetail.detail;
		// switch (event.method) {
		//   case 'setHeaderTabs':
		//     let { tabs } = event.data;
		//     this.headerService.setHeaderTabs(tabs);
		//     break
		//   case 'setBreadcrumbs':
		//     let { breadcrumbs } = event.data;
		//     this.subheaderService.setBreadcrumbs(breadcrumbs);
		//     break
		//   case 'setActiveTab':
		//     let { activeTab } = event.data;
		//     this.headerService.setActiveTab(activeTab)
		//     break
		//   case 'setTitle':
		//     let { showBack, title } = event.data;
		//     this.subheaderService.setTitle(title, showBack)
		//     break
		//   case 'hideSubHeader':
		//     let { showHide } = event.data;
		//     this.subheaderService.hideSubHeader(showHide);
		//   case 'getInstalledModule':
		//     this.getInstalledModule(event.data)

		// }
	}
	getInstalledModule(event) {
		let modules = [];
		this.installedModule = this.user["activeApplication"][
			"installedModules"
		].filter((module) => module.type == event.type);
		this.allElements.forEach((module) => {
			this.installedModule.forEach((installed) => {
				if (installed._id)
					if (module._id == installed._id) {
						modules.push(module);
					}
			});
		});
		window.dispatchEvent(
			new CustomEvent("customEvent", {
				detail: {
					type: "installedModules",
					installedModules: modules,
				},
			})
		);
	}
	isRegistered = function (name) {
		return document.createElement(name).constructor !== HTMLElement;
	};

	public loadScript(url) {
		console.log("preparing to load...");
		let node = document.createElement("script");
		node.src = url;
		node.type = "text/javascript";
		node.async = true;
		node.charset = "utf-8";
		document.getElementsByTagName("head")[0].appendChild(node);
	}
	changeRoute(route) {
		try {
			this.selectedTab = route;
			// this.component = document.querySelector(this.componentName);
			// this.component['selected_tab_url'] = route;
			this.cdr.detectChanges();
		} catch (error) { }
	}
	valueChanged(e) {
		alert();
	}
	ngAfterViewInit() { }
	ngOnDestroy() {
		this.sub.unsubscribe();
		this.subscriptions.unsubscribe();
		// var myobj = document.getElementById(this.componentId);
		// console.log(myobj);
		// myobj.remove();
		// this.cdr.detectChanges()
	}
}
