import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
//import { AuthService } from './services/auth.service';
import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'kitchen-web';
  loadedFeature = 'recipe';
  // constructor(
  //   private router: Router,
  //   private authService: AuthService,
  // ) {
  //   this.router.navigateByUrl('/');
  // }

  // signout() {
  //   this.authService.signout();
  // }

  constructor(private authService: AuthService, private loggingService: LoggingService) { }

  ngOnInit() {
    this.authService.autoLogin();
    this.loggingService.printLog('Hello from AppComponent ngOnInit');
  }
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
