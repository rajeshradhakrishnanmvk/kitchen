import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthBookService } from './auth.book..service'

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthBookService) { }

    canActivate(): boolean {
        if (this.authService.isAuthenticated()) {
            return true;
        }

        this.authService.login();
        return false;
    }
}