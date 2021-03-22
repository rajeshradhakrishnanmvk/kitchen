import { Injectable } from '@angular/core';
import { AuthBookService } from './auth.book..service';

@Injectable({ providedIn: 'root' })
export class AppService {

    constructor(
        private authService: AuthBookService) { }

    initApp(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            if (!this.authService.isAuthenticated()) {
                if (window.location.href.indexOf('id_token') >= 0) {
                    await this.authService.completeAuthentication();
                    resolve(null);
                } else if (window.location.href.indexOf('error') >= 0) {
                    reject();
                } else {
                    return this.authService.login();
                }
            }
        });
    }
}