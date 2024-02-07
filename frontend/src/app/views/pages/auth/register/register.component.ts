// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { finalize, takeUntil, tap } from 'rxjs/operators';
// Translate
import { TranslateService } from '@ngx-translate/core';
// NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
// Auth
import { AuthNoticeService, AuthService, Register, User } from '../../../../core/auth';
import { Subject } from 'rxjs';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { core } from '@angular/compiler';

@Component({
	selector: 'kt-register',
	templateUrl: './register.component.html',
	encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit, OnDestroy {
	registerForm: FormGroup;
	loading = false;
	errors: any = [];
	userType: string;


	private unsubscribe: Subject<any>; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 *
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param router: Router
	 * @param auth: AuthService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 */
	constructor(
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private router: Router,
		private auth: AuthService,
		private store: Store<AppState>,
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute
	) {
		this.unsubscribe = new Subject();
	}

	/*
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
    */

	/**
	 * On init
	 */
	ngOnInit() {
		this.initRegisterForm();
		this.route.queryParams.subscribe(params => {
			this.userType = params['type'] || 'core';
		});
	}

	/*
    * On destroy
    */
	ngOnDestroy(): void {
		this.unsubscribe.next(null);
		this.unsubscribe.complete();
		this.loading = false;
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */

	initRegisterForm() {
		this.registerForm = this.fb.group({
			fullname: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			email: ['', Validators.compose([
				Validators.required,
				Validators.email,
				Validators.minLength(3),
				// https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
				Validators.maxLength(320)
			]),
			],
			username: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			]),
			],
			password: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			confirmPassword: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			phone: [],
			agree: [false, Validators.compose([Validators.required])]
		}, {
			validator: ConfirmPasswordValidator.MatchPassword
		});
	}


	// https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address

	// submitRegisteration(){
	// 	console.log("In registration")
	// }

	/**
	 * Form Submit
	 */
	submit() {
		console.log("IN")
		console.log("registerForm", this.registerForm)
		const controls = this.registerForm.controls;

		// check form
		// if (this.registerForm.invalid) {
		// 	Object.keys(controls).forEach(controlName =>
		// 		controls[controlName].markAsTouched()
		// 	);
		// 	return;
		// }

		this.loading = true;

		if (!controls['agree'].value) {
			this.authNoticeService.setNotice('You must agree the terms and condition', 'danger');
			return;
		}
		const _user: User = new User();
		_user.clear();
		switch (this.userType) {
			case 'core':
				_user.domin = 'https://cloudarrowai.web.app'
				break;
			case 'event':
				_user.domin = 'https://conferencybackend.web.app'
				break;
			case 'hr':
				_user.domin = 'https://cloudarrowai.web.app'
		}
		_user.email = controls['email'].value;
		_user.username = controls['username'].value;
		_user.fullname = controls['fullname'].value;
		_user.password = controls['password'].value;
		_user.phone = controls['phone'].value;
		_user.type = this.userType || "core";
		_user.roles = [];
		
		console.log("user", _user)
		this.auth.register(_user).pipe(
			tap(user => {
				if (user) {

					if (user.hasOwnProperty('key')) {
						this.store.dispatch(new Register({ authToken: user['key'][0] }));
						this.router.navigateByUrl(`/auth/login?type=${this.userType}`); // Main page
					} else {
						this.authNoticeService.setNotice(user.message, 'danger');
					}

					//	this.store.dispatch(new Register({authToken: user.accessToken}));
					// pass notice message to the login page
					//	this.authNoticeService.setNotice(this.translate.instant('AUTH.REGISTER.SUCCESS'), 'success');
					//	this.router.navigateByUrl('/auth/login');
				} else {
					this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
				}
			}),
			takeUntil(this.unsubscribe),
			finalize(() => {
				this.loading = false;
				this.cdr.markForCheck();
			})
		).subscribe();
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.registerForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
}
