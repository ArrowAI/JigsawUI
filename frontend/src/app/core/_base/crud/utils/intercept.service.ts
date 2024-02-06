// Angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// import { environment } from '../../../../../environments/environment';
import * as environment from '../../../../../assets/app-config.json';

import { Action, select, Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { Logout } from '../../../auth';
//import { Logout } from '../../../../../app/core/auth';
// import { debug } from 'util';

/**
 * More information there => https://medium.com/@MetonymyQT/angular-http-interceptors-what-are-they-and-how-to-use-them-52e060321088
 */
@Injectable()
export class InterceptService implements HttpInterceptor {
	// intercept request and add token
	constructor(private store: Store<AppState>){

	}
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		var url =request.url;
		let method=request.method

		const userToken = localStorage.getItem(environment.authTokenKey);
		 if (url.indexOf(environment.API_SERVER)>=0 ) {
			request = request.clone({
					setHeaders: {
						key: userToken||''
					}
				});
		}
		else if(url.indexOf(environment.DREAM_FACTORY_URL)>=0 ){
			request = request.clone({
				setHeaders: {
					"X-DreamFactory-Api-Key": "d8d0db379f2cc83eeb02e77f89a35261948054bcb7a99ffcfb08a0764de7147b"
				}
			});
		}
		
		else{
			request = request.clone({
				setHeaders: {				
					'Content-Type':'application/json'
				}
			});
		}
		
		// tslint:disable-next-line:no-debugger
		// modify request
		// request = request.clone({
		// 	setHeaders: {
		// 		Authorization: `Bearer ${localStorage.getItem('accessToken')}`
		// 	}
		// });
		// console.log('----request----');
		// console.log(request);
		// console.log('--- end of request---');

		return next.handle(request).pipe(
			tap(
				event => {

					 if (event instanceof HttpResponse) {
					}

				},
				error => {
					if (url.indexOf(environment.API_SERVER+"/users/userConfig")>=0 && method=="GET")
					this.store.dispatch(new Logout());
					console.error(error);
					
				}
			)
		);
	}
}
