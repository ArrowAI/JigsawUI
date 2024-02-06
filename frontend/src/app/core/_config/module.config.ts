export class ModuleConfig {
	public defaults: any = {
		
		aside: {
			self: {},
			items: [{
				'name':'dashboard',
				'url':'https://static.dev.arrowai.in/dashboard_ui/main.js',
				'componentName':'dashboard-module'
			},
			{
				'name':'chat',
				'url':'https://static.dev.arrowai.in/chat/main.js',
				'componentName':'chat-module'
			},
			{
				'name':'customer',
				'url':'http://static.dev.arrowai.in/users-management/main.js',
				'componentName':'user-module'
			},
			{
				'name':'bots',
				'url':'http://static.dev.arrowai.in/bot_element/main.js',
				'componentName':'bots-module'
			},
			{
				'name':'dev',
				'url':'http://static.dev.arrowai.in/flow/main.js',
				'componentName':'app-webcomponent'
			},
			{
				'name':'integrations',
				'url':'http://static.dev.arrowai.in/integration/main.js',
				'componentName':'integration-module'
			},
			{
				'name':'broadcast',
				'url':'http://static.dev.arrowai.in/campaign/main.js',
				'componentName':'campaign-module'
			},{
				'name':'settings',
				'url':'http://static.dev.arrowai.in/settings/main.js',
				'componentName':'setting-module'
			}
			
			]
		}
	};

	public get configs(): any {
		return this.defaults;
	}
}
