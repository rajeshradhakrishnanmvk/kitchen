import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'book-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'book';

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