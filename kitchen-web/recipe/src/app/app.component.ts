// import '../../node_modules/jquery/dist/jquery.min.js';
// import "../../node_modules/@popperjs/core/dist/umd/popper.min.js";
// import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";
// import "../../node_modules/glightbox/dist/js/glightbox.min.js";
// import "../../node_modules/glightbox/dist/css/glightbox.min.css";
// import "../../src/assets/js/custom.js";
import { Component, OnInit } from '@angular/core';
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