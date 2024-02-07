// Angular
import {
	BrowserModule,
	HAMMER_GESTURE_CONFIG,
} from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule, NgZone } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { OverlayModule } from "@angular/cdk/overlay";
// Angular in memory
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
// Perfect Scroll bar
import {
	PERFECT_SCROLLBAR_CONFIG,
	PerfectScrollbarConfigInterface,
} from "ngx-perfect-scrollbar";
// SVG inline

// Env
import { environment } from "../environments/environment";
// import * as environment from '../assets/app-config.json';
// Hammer JS
import "hammerjs";
// NGX Permissions
import { NgxPermissionsModule } from "ngx-permissions";
// NGRX
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
// State
import { metaReducers, reducers } from "./core/reducers";
// Copmponents
import { AppComponent } from "./app.component";
// Modules
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";
import { ThemeModule } from "./views/theme/theme.module";
// Partials
import { PartialsModule } from "./views/partials/partials.module";
// Layout Services

import {
	DataTableService,
	// FakeApiService,
	KtDialogService,
	LayoutConfigService,
	LayoutRefService,
	MenuAsideService,
	MenuConfigService,
	MenuHorizontalService,
	PageConfigService,
	SplashScreenService,
	SubheaderService,
} from "./core/_base/layout";
// Auth
import { AuthModule } from "./views/pages/auth/auth.module";
import { AuthService } from "./core/auth";
// CRUD
import {
	HttpUtilsService,
	LayoutUtilsService,
	TypesUtilsService,
} from "./core/_base/crud";
// Config
import { LayoutConfig } from "./core/_config/layout.config";
// Highlight JS
import { HIGHLIGHT_OPTIONS } from "ngx-highlightjs";
import * as typescript from "highlight.js/lib/languages/typescript";
import * as scss from "highlight.js/lib/languages/scss";
import * as xml from "highlight.js/lib/languages/xml";
import * as json from "highlight.js/lib/languages/json";

import { InlineSVGModule } from "ng-inline-svg";
import { AngularFireModule } from "@angular/fire/compat";

import { HeaderService } from "./core/_base/layout/services/header-service";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
// import { SafePipe } from './core/chat/pipes/safe.pipe';
import { ServiceWorkerModule } from "@angular/service-worker";
// import { ServiceWorkerModule } from '@angular/service-worker';

import { AngularFireMessaging, AngularFireMessagingModule } from "@angular/fire/compat/messaging";

import { AppConfigService } from "./app-config.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

// tslint:disable-next-line:class-name
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
	wheelSpeed: 0.5,
	swipeEasing: true,
	minScrollbarLength: 40,
	maxScrollbarLength: 300,
};

export function initializeLayoutConfig(appConfig: LayoutConfigService) {
	// initialize app by loading default demo layout config
	return () => {
		if (appConfig.getConfig() === null) {
			appConfig.loadConfigs(new LayoutConfig().configs);
		}
	};
}


export function hljsLanguages(): any[] {
	return [
		{ name: "typescript", func: typescript },
		{ name: "scss", func: scss },
		{ name: "xml", func: xml },
		{ name: "json", func: json },
	];
}
const appInitializerFn = (appConfig: AppConfigService) => {
	return () => {
		// console.log(appco)
		return appConfig.loadAppConfig();
	}
 };
 

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		NgxPermissionsModule.forRoot(),
		PartialsModule,
		CoreModule,
		OverlayModule,
		StoreModule.forRoot(reducers, { metaReducers }),
		EffectsModule.forRoot([]),
		StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
		StoreDevtoolsModule.instrument(),
		AuthModule.forRoot(),
		TranslateModule.forRoot(),
		MatProgressSpinnerModule,
		InlineSVGModule.forRoot(),
		ThemeModule,
		// AngularFireMessagingModule,
		// AngularFireModule.initializeApp(environment.firebase),
		ServiceWorkerModule.register("ngsw-worker.js", {
			enabled: environment.production
		})
	],
	exports: [],
	providers: [
		AppConfigService,
       {
           provide: APP_INITIALIZER,
           useFactory: appInitializerFn,
           multi: true,
           deps: [AppConfigService]
       },
		AuthService,
		LayoutConfigService,
		LayoutRefService,
		MenuConfigService,
		PageConfigService,
		KtDialogService,
		DataTableService,
		SplashScreenService,
		{
			provide: PERFECT_SCROLLBAR_CONFIG,
			useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
		},
		// {
		// 	provide: HAMMER_GESTURE_CONFIG,
		// 	useClass: GestureConfig,
		// },
		{
			// layout config initializer
			provide: APP_INITIALIZER,
			useFactory: initializeLayoutConfig,
			deps: [LayoutConfigService],
			multi: true,
		},
		{
			provide: HIGHLIGHT_OPTIONS,
			useValue: {
				typescript: () => import('highlight.js/lib/languages/typescript'),
				scss: () => import('highlight.js/lib/languages/scss'),
				json: () => import('highlight.js/lib/languages/json'),
				xml: () => import('highlight.js/lib/languages/xml')
			},
		},
		{
			provide: LocationStrategy,
			useClass: HashLocationStrategy,
		},
		// template services
		SubheaderService,
		MenuHorizontalService,
		MenuAsideService,
		HttpUtilsService,
		TypesUtilsService,
		LayoutUtilsService,

		HeaderService,
	],
	bootstrap: [AppComponent],
})
export class AppModule {
	constructor(private ngZone: NgZone) {
		(window as any).ngZone = this.ngZone;
	}
}
