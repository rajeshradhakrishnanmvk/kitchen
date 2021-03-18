import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
//import { AuthService } from './services/auth.service';
import { AuthService } from './auth/auth.service';

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

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.autoLogin();
  }
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
