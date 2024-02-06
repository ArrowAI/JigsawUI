import { NgxPermissionsModule } from 'ngx-permissions';
// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Angular Material
import { MatButtonModule, MatProgressBarModule, 
	MatTabsModule, MatTooltipModule, MatInputModule, MatSelectModule, MatMenuModule, MatTableModule, MatAutocompleteModule, MatRadioModule, MatIconModule, MatNativeDateModule, MatDatepickerModule, MatCardModule, MatPaginatorModule, MatSortModule, MatCheckboxModule, MatProgressSpinnerModule, MatSnackBarModule, MatExpansionModule, MatDialogModule,
	 MatChipsModule } from '@angular/material';
// NgBootstrap
import { NgbProgressbarModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
// Translation
import { TranslateModule } from '@ngx-translate/core';
// Loading bar
import { LoadingBarModule } from '@ngx-loading-bar/core';
// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// Ngx DatePicker
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
// Perfect Scrollbar
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// SVG inline

// Core Module
import { CoreModule } from '../../core/core.module';
import { HeaderComponent } from './header/header.component';
import { AsideLeftComponent } from './aside/aside-left.component';
import { FooterComponent } from './footer/footer.component';
import { SubheaderComponent } from './subheader/subheader.component';
import { BrandComponent } from './brand/brand.component';
import { TopbarComponent } from './header/topbar/topbar.component';
import { MenuHorizontalComponent } from './header/menu-horizontal/menu-horizontal.component';
import { PartialsModule } from '../partials/partials.module';
import { BaseComponent } from './base/base.component';
import { PagesModule } from '../pages/pages.module';
import { HtmlClassService } from './html-class.service';
import { HeaderMobileComponent } from './header/header-mobile/header-mobile.component';
import { ErrorPageComponent } from './content/error-page/error-page.component';
import { PermissionEffects, permissionsReducer, RoleEffects, rolesReducer, authReducer, AuthEffects } from '../../core/auth';
import { InlineSVGModule } from 'ng-inline-svg';
// import { MaterialModule } from '../pages/material/material.module';
import { NewApplicaitonComponent } from '../pages/application/new-applicaiton/new-applicaiton.component';
import { AuthModule } from '../pages/auth/auth.module';
import { reducers,metaReducers } from '../../core/reducers';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
	declarations: [
		BaseComponent,

		FooterComponent,
		NewApplicaitonComponent,

		// headers
		HeaderComponent,
		BrandComponent,
		HeaderMobileComponent,

		// subheader
		SubheaderComponent,

		// topbar components
		TopbarComponent,

		// aside left menu components
		AsideLeftComponent,

		// horizontal menu components
		MenuHorizontalComponent,

		ErrorPageComponent,
		
	],
	exports: [
		BaseComponent,
		FooterComponent,


		// headers
		HeaderComponent,
		BrandComponent,
		HeaderMobileComponent,

		// subheader
		SubheaderComponent,

		// topbar components
		TopbarComponent,

		// aside left menu components
		AsideLeftComponent,

		// horizontal menu components
		MenuHorizontalComponent,

		ErrorPageComponent,
	],
	providers: [
		HtmlClassService,
	],
	imports: [
		CommonModule,
		FormsModule,
		MatSelectModule,
		RouterModule,
		NgxPermissionsModule.forChild(),
		StoreModule.forFeature('roles', rolesReducer),
		StoreModule.forFeature('permissions', permissionsReducer),
		EffectsModule.forFeature([PermissionEffects, RoleEffects]),
		StoreModule.forRoot(reducers, {metaReducers}),
		EffectsModule.forRoot([]),
		StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
		StoreDevtoolsModule.instrument(),
		AuthModule.forRoot(),
		PagesModule,
		PartialsModule,
		CoreModule,
		PerfectScrollbarModule,
		FormsModule,
		MatProgressBarModule,
		MatTabsModule,
		MatButtonModule,
		MatTooltipModule,
		TranslateModule.forChild(),
		LoadingBarModule,
		NgxDaterangepickerMd,
		InlineSVGModule.forRoot(),

		// ng-bootstrap modules
		NgbProgressbarModule,
		NgbTooltipModule,
		FormsModule,
		CoreModule,
		PartialsModule,

		FormsModule,
		ReactiveFormsModule,
		TranslateModule.forChild(),
		MatButtonModule,
		MatMenuModule,
		MatSelectModule,
		MatInputModule,
		MatTableModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatIconModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatExpansionModule,
		MatTabsModule,
		MatTooltipModule,
		MatDialogModule,
		MatChipsModule,

	]
	,entryComponents:[
		NewApplicaitonComponent

	]
})
export class ThemeModule {
}
