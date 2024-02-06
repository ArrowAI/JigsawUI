// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';

// import { UserManagementModule } from './user-management/user-management.module';
// import { MyPageComponent } from './my-page/my-page.component';
// import { TestpageComponent } from './testpage/testpage.component';
// import { EventsComponent } from './events/events.component';




// import { BotsComponent } from './bots/bots.component';
//import { IntegrationsComponent } from './integrations/integrations.component';
// import { BotsComponent } from './bots/bots.component';

// import { UserProfileComponent } from './user-profile/user-profile.component';

import { NewApplicaitonComponent } from './application/new-applicaiton/new-applicaiton.component';
// import { ApplicationListComponent } from './application/application-list/application-list.component';

// import { SettingsComponent } from './settings/settings.component';
// import { UsersApplicationComponent } from './users-application/users-application.component'
// import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
// import { AngularFireModule } from '@angular/fire';
// import { environment } from './../../../environments/environment';
import * as environment from '../../../assets/app-config.json';

import {
	MatInputModule,
	MatPaginatorModule,
	MatProgressSpinnerModule,
	MatSortModule,
	MatTableModule,
	MatSelectModule,
	MatMenuModule,
	MatProgressBarModule,
	MatButtonModule,
	MatCheckboxModule,
	MatDialogModule,
	MatTabsModule,
	MatNativeDateModule,
	MatCardModule,
	MatRadioModule,
	MatIconModule,
	MatDatepickerModule,
	MatExpansionModule,
	MatAutocompleteModule,
	MAT_DIALOG_DEFAULT_OPTIONS,
	MatSnackBarModule,
	MatTooltipModule,
	MatChipsModule
} from '@angular/material';
import {
	InterceptService, HttpUtilsService,
	TypesUtilsService, LayoutUtilsService
} from '../../core/_base/crud';
import { ActionNotificationComponent } from '../partials/content/crud';
import { TranslateModule } from '@ngx-translate/core';
import { ApplicationListComponent } from './application/application-list/application-list.component';
import { FiltersComponent } from '../partials/common/filters/filters.component';
import { SendUserMessageComponent } from './send-user-message/send-user-message.component';
// import { CommonService } from '../../../../src/app/core/common/common.service';
// import { DialogFlowComponent } from './dialog-flow/dialog-flow.component';



@NgModule({

	//declarations: [MyPageComponent, TestpageComponent, EventsComponent, SettingsComponent, IntegrationsComponent, UserProfileComponent, NewApplicaitonComponent, ApplicationListComponent],
	// declarations: [ApplicationListComponent],
	exports: [],
	imports: [
		// AngularFireModule.initializeApp(environment.firebase),
		CommonModule,
		HttpClientModule,
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
	],
	providers: [
		InterceptService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptService,
			multi: true
		},
		{
			provide: MAT_DIALOG_DEFAULT_OPTIONS,
			useValue: {
				hasBackdrop: true,
				panelClass: 'kt-mat-dialog-container__wrapper',
				height: 'auto',
				width: '900px'
			}
		},
		HttpUtilsService,
		TypesUtilsService,
		LayoutUtilsService,
		// AngularFireDatabase,
		// CommonService,

	],
	entryComponents: [
		ActionNotificationComponent,
		NewApplicaitonComponent,
		SendUserMessageComponent



	],
	declarations: [
		// MyPageComponent,
		//  TestpageComponent,
		//   EventsComponent,
		//    SettingsComponent,
		//     UserProfileComponent,
		ApplicationListComponent,
		FiltersComponent,
		SendUserMessageComponent
		//  UsersApplicationComponent,
		//   DialogFlowComponent
		// NewApplicaitonComponent
	],
})
export class PagesModule {
}
