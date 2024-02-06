import { Action } from '@ngrx/store';
import { User } from '../_models/user.model';

export enum AuthActionTypes {
    Login = '[Login] Action',
    Logout = '[Logout] Action',
    Register = '[Register] Action',
    UserRequested = '[Request User] Action',
    UserLoaded = '[Load User] Auth API',
    UserUpdated= '[Update User] Auth API',
    LoadElements= '[User Module] Auth API',
    ElementLoaded='[User Module Loaded] Auth API'
}

export class Login implements Action {
    readonly type = AuthActionTypes.Login;
    constructor(public payload: { authToken: string }) { }
}
export class LoadElements implements Action {
    readonly type = AuthActionTypes.LoadElements;
    constructor() { }
}
export class ElementLoaded implements Action {
    readonly type = AuthActionTypes.ElementLoaded;
    constructor(public payload: { elements: any[] }) { }
}

export class Logout implements Action {
    readonly type = AuthActionTypes.Logout;
}

export class Register implements Action {
    readonly type = AuthActionTypes.Register;
    constructor(public payload: { authToken: string }) { }
}


export class UserRequested implements Action {
    readonly type = AuthActionTypes.UserRequested;
}

export class UserLoaded implements Action {
    readonly type = AuthActionTypes.UserLoaded;
    constructor(public payload: { user: any }) { }
}

export class UserUpdated implements Action {
    readonly type = AuthActionTypes.UserUpdated;
    constructor(public payload: { user: User }) { }
}




export type AuthActions = Login | Logout | Register | UserRequested | UserLoaded | UserUpdated | LoadElements |ElementLoaded;
