export class ModuleConfig {
	public defaults: any = {
		
		aside: {
			self: {},
			items: [{
				'name':'dashboard',
				'url':'https://static.dev.arrowai.in/dashboard_ui/main.js',
				'componentName':'dashboard-module'
			},
			
			]
		}
	};

	public get configs(): any {
		return this.defaults;
	}
}
