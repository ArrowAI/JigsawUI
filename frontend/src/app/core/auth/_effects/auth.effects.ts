// Angular
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// RxJS
import { filter, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { defer, Observable, of } from 'rxjs';
// NGRX
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
// Auth actions
import { AuthActionTypes, Login, Logout, Register, UserLoaded, UserRequested, LoadElements, ElementLoaded } from '../_actions/auth.actions';
import { AuthService } from '../_services/index';
import { AppState } from '../../reducers';
import { environment } from '../../../../environments/environment';
// import * as environment from '../../../../assets/app-config.json';

import { isUserLoaded } from '../_selectors/auth.selectors';
import { CommonService } from '../../common/common.service';
import { element } from 'protractor';

@Injectable()
export class AuthEffects {
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType<Login>(AuthActionTypes.Login),
            tap(action => {
                localStorage.setItem(environment.authTokenKey, action.payload.authToken);
                this.store.dispatch(new UserRequested());
            })
        ),
        { dispatch: false }
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType<Logout>(AuthActionTypes.Logout),
            tap(() => {
                let token = localStorage.getItem(environment.authTokenKey)
                localStorage.removeItem(token);
                localStorage.removeItem(environment.authTokenKey);
                localStorage.clear();
                this.auth.logout();
                this.router.navigate(['/auth/login']);
            })
        ),
        { dispatch: false }
    );

    loadElements$ = createEffect(() =>
        this.actions$.pipe(
            ofType<LoadElements>(AuthActionTypes.LoadElements),
            mergeMap(() => this.common.getElementList()),
            tap(elements => {
                console.log("elements", elements);
                this.store.dispatch(new ElementLoaded({ elements: elements.data }));
            })
        ),
        { dispatch: false }
    );

    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType<Register>(AuthActionTypes.Register),
            tap(action => {
                localStorage.setItem(environment.authTokenKey, action.payload.authToken);
            })
        ),
        { dispatch: false }
    );

    loadUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType<UserRequested>(AuthActionTypes.UserRequested),
            withLatestFrom(this.store.pipe(select(isUserLoaded))),
            filter(([action, _isUserLoaded]) => !_isUserLoaded),
            mergeMap(([action, _isUserLoaded]) => this.auth.getUserByToken()),
            tap(_user => {
                console.log("user config is",_user);
                if (_user.auth && _user.auth == false) {
                    this.store.dispatch(new Logout());
                } else {
                    let user = JSON.parse(localStorage.getItem("activeUser"))
                    _user.username = user.name;
                    _user.fullname = _user.name;
                    _user.email = user.email;
                    if (_user.hasOwnProperty('applications')) {
                        let activeApp = _user.applications.find(app => {
                            return app['_id'] == localStorage.getItem("activeApplication");
                        })
                        if (!!activeApp) {
                            _user.activeApplication = activeApp
                        }
                    }
                    let userToken = localStorage.getItem(environment.authTokenKey);
                    localStorage.setItem(userToken, JSON.stringify(_user));
                    this.store.dispatch(new LoadElements())
                    this.store.dispatch(new UserLoaded({ user: _user }));
                }
            })
        ),
        { dispatch: false }
    );

    init$: Observable<Action> = defer(() => {
        const userToken = localStorage.getItem(environment.authTokenKey);
        let observableResult = of({ type: 'NO_ACTION' });
        if (userToken) {
            observableResult = of(new Login({ authToken: userToken }));
        }
        return observableResult;
    });

    private returnUrl: string;

    constructor(private actions$: Actions,
        private router: Router,
        private auth: AuthService,
        private common: CommonService,
        private store: Store<AppState>) {

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.returnUrl = event.url;
            }
        });
    }
}