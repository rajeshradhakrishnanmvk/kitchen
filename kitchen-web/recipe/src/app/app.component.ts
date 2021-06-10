import { Component, OnInit, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';
import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'recipe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'recipe';
  loadedFeature = 'recipe';


  constructor(private authService: AuthService,
    private loggingService: LoggingService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new AuthActions.AutoLogin());
    this.loggingService.printLog('Hello from AppComponent ngOnInit');
  }
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}