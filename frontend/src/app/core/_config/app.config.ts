export class AppConfig {
	public bots: any = [{
		name: 'ArrowAI Bot',
		type: 'arrowAIBot',
		impimentationType: 'module',
		moduleName:'creator'
	}, {
		name: 'Dialog Flow Bot',
		type: 'dialogFlowBot',
		impimentationType: 'module',
		moduleName: 'dialogFlow'
	},
	{
		name: 'knowledgebase',
		type: 'knowledgebaseBot',
		impimentationType: 'module',
		moduleName: 'knowledgebase'
	}
		, {
		name: 'Custom Bot',
		type: 'customBot',
		impimentationType: 'module',
		moduleName: 'custom'
	}];
	public get botList(): any {
		return this.bots;
	}
}


