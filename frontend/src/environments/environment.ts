
export const environment = {
	production: true,
	FACEBOOK_GRAPH: "https://graph.facebook.com/v3.2",
	isMockEnabled: false, // You have to switch this, when your real back-end is done
	authTokenKey: '',
	firebase: {
		apiKey: "",
		authDomain: "arrowai-kubernetes.firebaseapp.com",
		databaseURL: "https://arrowai-kubernetes.firebaseio.com",
		projectId: "arrowai-kubernetes",
		storageBucket: "arrowai-kubernetes.appspot.com",
		messagingSenderId: "",
		appId: "",
		measurementId: ""
	},
	INTERACTION_ENGINE: 'https://interaction.dev.arrowai.in',
	SOCKET_SERVER: "https://interaction.dev.arrowai.in",
	CONSOLE_URL: 'https://console.arrowai.in',
	DREAM_FACTORY_URL: 'https://api.arrowai.in/api/v2/chat_developer',
	API_SERVER: 'https://api.dev.arrowai.in',
	API_SERVER_LOCAL: 'https://api.dev.arrowai.in',
	AIHR_SERVER: "https://aihr.arrowai.in",
	CHAT_ENGINE: "https://chatengine.arrowai.in",
	CHAT_COMPONENT_TEST_URL: "https://localhost:3000",
	DASHBOARD_API: "https://dashboard-api-790-srnzdkes3a-as.a.run.app/api",
	ARROW_CHAT_URL: "",
	EVENT_SERVER:"https://event.dev.arrowai.in",
	CLAUD_STORAGE_URL:'https://asia-southeast1-arrowai-kubernetes.cloudfunctions.net',
	DEMO_URL: "https://arrowaiweb.web.app/demo"
	//   API_SERVER:'https://api.dev.arrowai.in'

};
