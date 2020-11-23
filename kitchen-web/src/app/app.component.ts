import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kitchen-web';

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.router.navigateByUrl('/');
  }

  signout() {
    this.authService.signout();
  }
}
