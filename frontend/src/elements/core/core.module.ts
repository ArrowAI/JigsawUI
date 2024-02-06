import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';
import { RouterModule } from '@angular/router';
import { ModuleComponent } from './module/module.component';
import { ModuleHolderComponent } from './module-holder/module-holder.component'
import { LazyElementsModule } from '@angular-extensions/elements';
import { BrowserModule } from '@angular/platform-browser';
// import { SendCampaignDialogComponent } from './send-campaign-dialog/send-campaign-dialog.component';
// Material
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
	MatChipsModule,
} from '@angular/material';
import { InterceptService } from '../../app/core/_base/crud';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
const routes = [
	{
		path: '',
		component: CoreComponent,
		children: [
			{
				path: '',
				redirectTo: 'module',
				pathMatch: 'full'
			},
			{
				path: 'module',
				component: ModuleComponent
			},
			{
				path: 'module/:id',
				component: ModuleComponent
			},
			{
				path: 'module/:id/:id',
				component: ModuleComponent
			}
		]
	}
];

@NgModule({
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	declarations: [CoreComponent, ModuleComponent, ModuleHolderComponent],
	imports: [
		CommonModule,
		// BrowserModule,

		LazyElementsModule,
		RouterModule.forChild(routes),
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
		FormsModule,
		ReactiveFormsModule
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

	],
	entryComponents: [],

})
export class CoreModule { }
