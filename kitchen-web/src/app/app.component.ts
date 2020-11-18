import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kitchen-web';

  constructor(
    private authService: AuthService,
  ) {

  }

  signout() {
    this.authService.signout();
  }
}
