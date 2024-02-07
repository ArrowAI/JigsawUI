// Angular
import {
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit,
	ViewEncapsulation,
} from "@angular/core";
import { User as fUser } from 'firebase/auth';
import { Logout } from '../../../../core/auth';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// RxJS
import { Observable, Subject, EMPTY } from "rxjs";
import { finalize, takeUntil, tap, take, catchError } from "rxjs/operators";
// Translate
import { TranslateService } from "@ngx-translate/core";
// Store
import { Store } from "@ngrx/store";
import { AppState } from "../../../../core/reducers";
// Auth
import {
	AuthNoticeService,
	AuthService,
	Login,
	User,
	UserLoaded,
} from "../../../../core/auth";

@Component({
	selector: "kt-login",
	templateUrl: "./login.component.html",
	encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, OnDestroy {
	// Public params
	loginForm: FormGroup;
	loading = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];
	demo: boolean = false;
	demoUsers = [
		{
			type: "core",
			email: "platformdemouser@arrowai.com",
			password: "demo",
		},
		{
			type: "hr",
			email: "demohr@arrowai.in",
			password: "123456",
		},
		{
			type: "e-commerce",
			email: "e-commercedemo@arrowai.in",
			password: "demo",
		},
		{
			type: "medical",
			email: "medicaldemo@arrowai.in",
			password: "demo",
		},
	];

	private unsubscribe: Subject<any>;

	private returnUrl: any;
	private userType: string;
	user$: Observable<fUser> = this.auth.user$;

	// Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 *
	 * @param router: Router
	 * @param auth: AuthService
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 * @param route
	 */
	constructor(
		private router: Router,
		private auth: AuthService,
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute
	) {
		this.unsubscribe = new Subject();
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */

	getDemoUser(type) {
		let user = this.demoUsers.find((user) => user.type == type);
		return user;
	}
	ngOnInit(): void {
		this.initLoginForm();

		// redirect back to the returnUrl before login
		this.route.queryParams.subscribe((params) => {
			this.returnUrl = params["returnUrl"] || "/";
			this.userType = params["type"] || "core";
			this.demo = params["demo"] || false;
		});
		this.auth.user$.subscribe((data) => {
			console.log(data);
		});
		if (!!this.demo) {
			
			this.store.dispatch(new Logout());
			let { email, password } = this.getDemoUser(this.userType);
			localStorage.setItem("demoAccount",this.userType)
			this.login(email, password);
		}
	}
	register() {
		this.router.navigateByUrl("auth/register?type=" + this.userType); // Main page
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
		this.unsubscribe.next(null);
		this.unsubscribe.complete();
		this.loading = false;
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	initLoginForm() {
		this.loginForm = this.fb.group({
			email: [
				"",
				Validators.compose([
					Validators.required,
					Validators.email,
					Validators.minLength(3),
					Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
				]),
			],
			password: [
				"",
				Validators.compose([
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(100),
				]),
			],
		});
	}

	/**
	 * Form Submit
	 */
	submitLogin() {
		const controls = this.loginForm.controls;
		/** check form */
		if (this.loginForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.login(controls["email"].value, controls["password"].value);
	}
	login(email, password) {
		this.loading = true;

		const authData = {
			email,
			password,
			domin: "",
		};
		switch (this.userType) {
			case "core":
				authData.domin = "https://cloudarrowai.web.app";
				break;
			case "event":
				authData.domin = "https://conferencybackend.web.app";
				break;
			case "hr":
				authData.domin = "https://cloudarrowai.web.app";
		}
		this.auth
			.login(authData.email, authData.password, authData.domin)
			.pipe(
				tap((user) => {
					console.log("user++++++++++++++++++");
					if (user.hasOwnProperty("code") && user["code"] == 0) {
						this.store.dispatch(
							new Login({ authToken: user["data"].key })
						);
						if (!!user["data"])
							localStorage.setItem(
								"activeUser",
								JSON.stringify(user["data"])
							);

						this.router.navigateByUrl(this.returnUrl); // Main page
					} else {
						this.authNoticeService.setNotice(
							this.translate.instant(
								"AUTH.VALIDATION.INVALID_LOGIN"
							),
							"danger"
						);
					}
				}),
				takeUntil(this.unsubscribe),
				finalize(() => {
					this.loading = false;
					this.cdr.markForCheck();
				})
			)
			.subscribe();
	}

	googleLogin() {
		this.auth
			.loginViaGoogle()
			.pipe(
				take(1),
				catchError((error) => {
					this.authNoticeService.setNotice(error, "danger");
					return EMPTY;
				})
			)
			.subscribe((response) => {
				console.log(response);
				if (response.hasOwnProperty("additionalUserInfo")) {
					if (response.additionalUserInfo.isNewUser) {
						if (response.hasOwnProperty("additionalUserInfo")) {
							const _user: User = new User();
							_user.clear();
							if (
								response["additionalUserInfo"]["profile"][
									"email"
								] == null
							) {
								this.authNoticeService.setNotice(
									this.translate.instant(
										"we are facing some issue with google login. please try another options."
									),
									"danger"
								);
							}
							switch (this.userType) {
								case "core":
									_user.domin =
										"https://cloudarrowai.web.app";
									break;
								case "event":
									_user.domin =
										"https://conferencybackend.web.app";
									break;
								case "hr":
									_user.domin =
										"https://cloudarrowai.web.app";
							}
							_user.email =
								response["additionalUserInfo"]["profile"][
									"email"
								];
							_user.username =
								response["additionalUserInfo"]["profile"][
									"given_name"
								];
							_user.fullname =
								response["additionalUserInfo"]["profile"][
									"name"
								];
							_user.password = "";
							_user.phone = "";
							_user.type = this.userType;
							_user.roles = [];
							_user.isSocial = true;
							this.auth.register(_user).subscribe((data) => {
								this.auth
									.socialLogin(_user)
									.pipe(
										tap((user) => {
											console.log(
												"user++++++++++++++++++"
											);
											if (
												user.hasOwnProperty("code") &&
												user["code"] == 0
											) {
												this.store.dispatch(
													new Login({
														authToken:
															user["data"].key,
													})
												);

												this.router.navigateByUrl(
													this.returnUrl
												); // Main page
											} else {
												this.authNoticeService.setNotice(
													this.translate.instant(
														"AUTH.VALIDATION.INVALID_LOGIN"
													),
													"danger"
												);
											}
										}),
										takeUntil(this.unsubscribe),
										finalize(() => {
											this.loading = false;
											this.cdr.markForCheck();
										})
									)
									.subscribe();
							});
						}
					} else {
						if (response.hasOwnProperty("user")) {
							const _user: User = new User();
							_user.clear();
							if (
								response["additionalUserInfo"]["profile"][
									"email"
								] == null
							) {
								this.authNoticeService.setNotice(
									this.translate.instant(
										"we are facing some issue with google login. please try another options."
									),
									"danger"
								);
							}

							_user.email =
								response["additionalUserInfo"]["profile"][
									"email"
								];
							_user.username =
								response["additionalUserInfo"]["profile"][
									"given_name"
								];
							_user.fullname =
								response["additionalUserInfo"]["profile"][
									"name"
								];
							_user.password = "";
							_user.phone = "";
							_user.roles = [];
							_user.isSocial = true;
							this.auth
								.socialLogin(_user)
								.pipe(
									tap((user) => {
										console.log("user++++++++++++++++++");
										if (
											user.hasOwnProperty("code") &&
											user["code"] == 0
										) {
											this.store.dispatch(
												new Login({
													authToken: user["data"].key,
												})
											);
											if (!!user["data"])
												localStorage.setItem(
													"activeUser",
													JSON.stringify(user["data"])
												);

											this.router.navigateByUrl(
												this.returnUrl
											); // Main page
										} else {
											this.authNoticeService.setNotice(
												this.translate.instant(
													"AUTH.VALIDATION.INVALID_LOGIN"
												),
												"danger"
											);
										}
									}),
									takeUntil(this.unsubscribe),
									finalize(() => {
										this.loading = false;
										this.cdr.markForCheck();
									})
								)
								.subscribe();
						}
					}
				}
			});
	}
	gitLogin() {
		this.auth
			.loginViaGitHub()
			.pipe(
				take(1),
				catchError((error) => {
					this.authNoticeService.setNotice(error, "danger");
					return EMPTY;
				})
			)
			.subscribe((response) => {
				console.log(response);
				if (response.hasOwnProperty("additionalUserInfo")) {
					if (response.additionalUserInfo.isNewUser) {
						if (response.hasOwnProperty("additionalUserInfo")) {
							const _user: User = new User();
							_user.clear();
							if (
								response["additionalUserInfo"]["profile"][
									"email"
								] == null
							) {
								this.authNoticeService.setNotice(
									this.translate.instant(
										"we are facing some issue with github login. please try another options."
									),
									"danger"
								);
							}
							switch (this.userType) {
								case "core":
									_user.domin =
										"https://cloudarrowai.web.app";
									break;
								case "event":
									_user.domin =
										"https://conferencybackend.web.app";
									break;
								case "hr":
									_user.domin =
										"https://cloudarrowai.web.app";
							}
							_user.email =
								response["additionalUserInfo"]["profile"][
									"email"
								];
							_user.username =
								response["additionalUserInfo"]["profile"][
									"login"
								];
							_user.fullname =
								response["additionalUserInfo"]["profile"][
									"login"
								];
							_user.password = "";
							_user.phone = "";
							_user.roles = [];
							_user.type = this.userType;
							_user.isSocial = true;
							this.auth.register(_user).subscribe((data) => {
								this.auth
									.socialLogin(_user)
									.pipe(
										tap((user) => {
											console.log(
												"user++++++++++++++++++"
											);
											if (
												user.hasOwnProperty("code") &&
												user["code"] == 0
											) {
												this.store.dispatch(
													new Login({
														authToken:
															user["data"].key,
													})
												);
												if (!!user["data"])
													localStorage.setItem(
														"activeUser",
														JSON.stringify(
															user["data"]
														)
													);

												this.router.navigateByUrl(
													this.returnUrl
												); // Main page
											} else {
												this.authNoticeService.setNotice(
													this.translate.instant(
														"AUTH.VALIDATION.INVALID_LOGIN"
													),
													"danger"
												);
											}
										}),
										takeUntil(this.unsubscribe),
										finalize(() => {
											this.loading = false;
											this.cdr.markForCheck();
										})
									)
									.subscribe();
							});
						}
					} else {
						if (response.hasOwnProperty("user")) {
							const _user: User = new User();
							_user.clear();
							if (
								response["additionalUserInfo"]["profile"][
									"email"
								] == null
							) {
								this.authNoticeService.setNotice(
									this.translate.instant(
										"we are facing some issue with github login. please try another options."
									),
									"danger"
								);
							}
							_user.email =
								response["additionalUserInfo"]["profile"][
									"email"
								];
							_user.username =
								response["additionalUserInfo"]["profile"][
									"login"
								];
							_user.fullname =
								response["additionalUserInfo"]["profile"][
									"login"
								];
							_user.password = "";
							_user.phone = "";
							_user.roles = [];
							_user.isSocial = true;
							this.auth
								.socialLogin(_user)
								.pipe(
									tap((user) => {
										console.log("user++++++++++++++++++");
										if (
											user.hasOwnProperty("code") &&
											user["code"] == 0
										) {
											this.store.dispatch(
												new Login({
													authToken: user["data"].key,
												})
											);
											if (!!user["data"])
												localStorage.setItem(
													"activeUser",
													JSON.stringify(user["data"])
												);

											this.router.navigateByUrl(
												this.returnUrl
											); // Main page
										} else {
											this.authNoticeService.setNotice(
												this.translate.instant(
													"AUTH.VALIDATION.INVALID_LOGIN"
												),
												"danger"
											);
										}
									}),
									takeUntil(this.unsubscribe),
									finalize(() => {
										this.loading = false;
										this.cdr.markForCheck();
									})
								)
								.subscribe();
						}
					}
				}
			});
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.loginForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result =
			control.hasError(validationType) &&
			(control.dirty || control.touched);
		return result;
	}
}
