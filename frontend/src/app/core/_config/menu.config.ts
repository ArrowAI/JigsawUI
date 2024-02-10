export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: [
				// {section: 'Home'},
				{
					title: 'Dashboards',
					root: true,
					alignment: 'left',
					page: '/home',
					translate: 'MENU.DASHBOARD',
				},
				{
					title: 'Dashboards',
					root: true,
					alignment: 'left',
					page: '/home',
					translate: 'MENU.DASHBOARD',
				},
			]
		},
		aside: {
			self: {},
			items: [
				{ section: 'Home' },
				// {
				// 	title: 'Dashboard',
				// 	root: true,
				// 	icon: 'flaticon2-architecture-and-city',
				// 	page: '/external/module/dashboard',
				// 	bullet: 'dot',
				// 	id: 1,
				// 	type:"default"
				// },
				// {section: 'Converstions'},
				// {
				// 	id: 2,
				// 	title: 'Chat',
				// 	root: true,
				// 	icon: 'flaticon2-chat-1',
				// 	page: '/external/module/chat',

				// 	bullet: 'dot',
				// 	type:"default"
				// },
				// {
				// 	id: 3,
				// 	title: 'Bots',
				// 	root: true,
				// 	icon: 'fas fa-robot',
				// 	page: '/external/module/bots',
				// 	// page: '/core/module/employee',
				// 	bullet: 'dot',
				// 	type:"default"
				// },
				// {
				// 	id: 5,
				// 	title: 'Users',
				// 	root: true,
				// 	icon: 'flaticon2-avatar',
				// 	page: '/external/module/customer',

				// 	bullet: 'dot',
				// 	type:"default"
				// },
				// {
				// 	id: 6,
				// 	title: 'Campaign',
				// 	root: true,
				// 	icon: 'flaticon2-rocket-1',
				// 	page: '/external/module/broadcast',
				// 	bullet: 'dot',
				// 	type:"default"
				// },

				// {
				// 	id: 8,
				// 	title: 'Workflows',
				// 	root: true,
				// 	icon: 'flaticon2-graphic-1',
				// 	page: '/workflow',
				// 	bullet: 'dot',
				// 	type:"default"
				// },
				// {section: 'Applications'},
				// {
				// 	id: 9,
				// 	title: 'Ticketing',
				// 	root: true,
				// 	bullet: 'dot',
				// 	icon: 'flaticon-open-box',
				// 	page: '/ticketing',
				// },
				// {
				// 	id: 10,
				// 	title: 'Quiz',
				// 	root: true,
				// 	bullet: 'dot',
				// 	icon: 'flaticon-questions-circular-button',
				// 	page: '/quiz',
				// },
				// {
				// 	id: 11,
				// 	title: 'Poll',
				// 	root: true,
				// 	bullet: 'dot',
				// 	icon: 'flaticon2-digital-marketing',
				// 	page: '/poll',
				// },
				// {
				// 	id: 12,
				// 	title: 'Employee',
				// 	root: true,
				// 	bullet: 'dot',
				// 	icon: 'flaticon2-avatar',
				// 	page: '/employee',
				// },
				// {
				// 	id: 13,
				// 	title: 'Recruitment',
				// 	root: true,
				// 	bullet: 'dot',
				// 	icon: 'flaticon2-avatar',
				// 	page: '/recruitment',
				// },
				// {
				// 	id: 14,
				// 	title: 'Reports',
				// 	root: true,
				// 	bullet: 'dot',
				// 	icon: 'flaticon2-graphic-1',
				// 	page: '/report',
				// },
				// {
				// 	id: 15,
				// 	title: 'Travel',
				// 	root: true,
				// 	bullet: 'dot',
				// 	icon: 'fas fa-bus-alt',
				// 	page: '/travel',
				// },
				// {
				// 	id: 16,
				// 	title: 'Leave',
				// 	root: true,
				// 	bullet: 'dot',
				// 	icon: 'fas fa-info-circle',
				// 	page: '/leave',
				// },
				// {
				// 	id: 17,
				// 	title: 'Hotel',
				// 	root: true,
				// 	bullet: 'dot',
				// 	icon: 'fas fa-hotel',
				// 	page: '/hotel',
				// },
				// {
				// 	id: 18,
				// 	title: 'Testing',
				// 	root: true,
				// 	bullet: 'dot',
				// 	icon: 'far fa-check-circle',
				// 	page: '/testing',
				// },
				// {
				// 	id: 19,
				// 	title: 'Assesment',
				// 	root: true,
				// 	bullet: 'dot',
				// 	icon: 'far fa-check-circle',
				// 	page: '/assesment',
				// },
				// {
				// 	id: 20,
				// 	title: 'Jobrole',
				// 	root: true,
				// 	bullet: 'dot',
				// 	icon: 'far fa-check-circle',
				// 	page: '/jobrole',
				// },
				// {
				// 	id: 21,
				// 	title: 'Candidate',
				// 	root: true,
				// 	bullet: 'dot',
				// 	icon: 'far fa-check-circle',
				// 	page: '/candidate',
				// },
				
				{
					id: 4,
					title: 'Module Marketplace',
					root: true,
					icon: 'fab fa-steam-symbol',
					page: '/marketplace',
					bullet: 'dot',
					type:"default"
				},
				// {
				// 	id: 'default',
				// 	title: 'Dev', // shecheduler,code,table
				// 	root: true,
				// 	icon: 'far fa-file-code',
				// 	page: '/external/module/dev',
				// 	bullet: 'dot',
				// },
				// {
				// 	id: 'default',
				// 	title: 'Settings',
				// 	root: true,
				// 	icon: 'flaticon-cogwheel-2',
				// 	page: '/external/module/settings',
				// 	bullet: 'dot',
				// }

			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
