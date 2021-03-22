import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserManager, User } from 'oidc-client';

@Injectable({ providedIn: 'root' })
export class AuthBookService {

    public user: User;
    private userManager: UserManager;

    constructor() {
        this.userManager = new UserManager({
            authority: environment.authority,
            client_id: environment.clientId,
            redirect_uri: environment.redirectUri,
            response_type: environment.responseType,
            scope: environment.scope
        });
        this.userManager.getUser().then(user => {
            this.user = user;
        });
    }

    login() {
        return this.userManager.signinRedirect();
    }

    async completeAuthentication() {
        return this.userManager.signinRedirectCallback().then(user => {
            this.user = user;
        });
    }

    isAuthenticated(): boolean {
        return this.user != null && !this.user.expired;
    }

    signout() {
        this.userManager.signoutRedirect();
    }

}