// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './views/theme/base/base.component';
import { ErrorPageComponent } from './views/theme/content/error-page/error-page.component';
// Auth
import { AuthGuard } from './core/auth';
const routes: Routes = [
	{ path: 'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },
	{
		path: '',
		component: BaseComponent,
		// canActivate: [AuthGuard],
		children: [
			{
				path: 'marketplace',
				loadChildren: () => import('./views/uimodules/ui-module/ui-module.module').then(m => m.UiModuleModule)
			},
			// {
			// 	path: 'customeApps',
			// 	loadChildren: () => import('./views/pages/custom-apps/custom-app.module').then(m => m.CustomAppModule)
			// },
			// {
			// 	path: 'segments',
			// 	loadChildren: () => import('./views/pages/segmentation/segmentation.module').then(m => m.SegmentationModule)
			// },
			
			// {
			// 	path: 'chat',
			// 	loadChildren: () => import('./views/pages/chat/chat.module').then(m => m.ChatModule)

			// },
			// {
			// 	path: 'broadcast',
			// 	loadChildren: () => import('./views/pages/campaigns/campaign.module').then(m => m.CampaignModule)

			// },
			// {
			// 	path: 'settings',
			// 	loadChildren: () => import('./views/pages/application-settings/application-settings.module').then(m => m.ApplicationSettingsModule)
			// },
			// {
			// 	path: 'ticketing',
			// 	loadChildren: () => import('./views/submodule/ticketing/ticketing.module').then(m => m.TicketingModule)
			// },
			// {
			// 	path: 'quiz',
			// 	loadChildren: () => import('./views/pages/quizmodule/quiz.module').then(m => m.QuizModule)
			// },
			// {
			// 	path: 'poll',
			// 	loadChildren: () => import('./views/submodule/poll/poll.module').then(m => m.PollModule)
			// },
			// {
			// 	path: 'assesment',
			// 	loadChildren: () => import('./views/submodule/assessment/assessment.module').then(m => m.AssessmentModule)
			// },
			// {
			// 	path: 'candidate',
			// 	loadChildren: () => import('./views/submodule/candidate/candidate.module').then(m => m.CandidateModule)
			// },
			// {
			// 	path: 'jobrole',
			// 	loadChildren: () => import('./views/submodule/job-role/job-role.module').then(m => m.JobRoleModule)
			// },
			
			// {
			// 	path: 'bots',
			// 	loadChildren: () => import('./views/pages/bot/bots.module').then(m => m.BotsModule)
			// },
			// {
			// 	path: 'integrations',
			// 	loadChildren: () => import('./views/pages/integrations/integration.module').then(m => m.IntegrationModule)
			// },
			// {
			// 	path: 'customer',
			// 	loadChildren: () => import('./views/pages/user-management/user-management.module').then(m => m.UserManagementModule)
			// },
			// {
			// 	path: 'builder',
			// 	loadChildren: () => import('./views/theme/content/builder/builder.module').then(m => m.BuilderModule)
			// },
			// {
			// 	path: 'creator',
			// 	loadChildren: () => import('./views/pages/bot-creator/bot-creator.module').then(m => m.BotCreatorModule)
			// },
			// {
			// 	path: 'product',
			// 	loadChildren: () => import('./views/pages/products/products.module').then(m => m.ProductsModule)
			// },
			// {
			// 	path: 'knowledgebase',
			// 	loadChildren: () => import('./views/pages/knowledgebase/knowledgebase.module').then(m => m.KnowledgebaseModule)
			// },
			// {
			// 	path: 'dev',
			// 	loadChildren: () => import('./views/pages/devlopment/devlopment.module').then(m => m.DevlopmentModule)
			// },
			// {
			// 	path: 'report',
			// 	loadChildren: () => import('./views/pages/cadbury-report/cadbury-report.module').then(m => m.CadburyReportModule)
			// },
			{
				path: 'external',
				loadChildren: () => import('../elements/core/core.module').then(m => m.CoreModule)
			},

			// {
			// 	path: 'travel',
			// 	loadChildren: () => import('./views/pages/travelmodule/travel.module').then(m => m.TravelModule)
			// },
			// {
			// 	path: 'hotel',
			// 	loadChildren: () => import('./views/pages/hotelmodule/hotel.module').then(m => m.HotelModule)
			// },
			// {
			// 	path: 'leave',
			// 	loadChildren: () => import('./views/pages/leavemodule/leave.module').then(m => m.LeaveModule)
			// },
			
			{
				path: 'error/403',
				component: ErrorPageComponent,
				data: {
					'type': 'error-v6',
					'code': 403,
					'title': '403... Access forbidden',
					'desc': 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
				}
			},
			{ path: 'error/:type', component: ErrorPageComponent },
			{ path: '', redirectTo: 'home', pathMatch: 'full' },
			{ path: '**', redirectTo: 'home', pathMatch: 'full' }
		]
	},
	{ path: '**', redirectTo: 'error/403', pathMatch: 'full' },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
