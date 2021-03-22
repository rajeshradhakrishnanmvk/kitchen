import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { AppService } from "../services/app.service";
import { AuthBookService } from "../services/auth.book..service";
import { DataStorageService } from "../shared/data-storage.service";



@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    collapsed: boolean = true;
    private userSub: Subscription;
    isAuthenticated = false;
    isBooks = false;
    constructor(private dataStorageService: DataStorageService,
        private authService: AuthService, private appService: AppService,
        private authBookService: AuthBookService) {

    }
    onBooksLoad() {
        this.isBooks = true;
        this.appService.initApp();
    }
    ngOnInit() {
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
        });
    }
    onSaveData() {
        this.dataStorageService.storeRecipes();
    }
    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }
    onLogout() {
        if (this.isBooks) {
            this.authBookService.signout();
        }
        this.authService.logout();
    }
    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}