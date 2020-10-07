import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  login_email: string;
  login_password: string;
  login_progress: boolean = false;
  error_message: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  login() {
    this.login_progress = true;
    this.authService
      .login(this.login_email, this.login_password)
      .toPromise()
      .then((data) => {
        this.login_progress = false;
        this.router.navigate(['/']);
      })
      .catch((error_data) => {
        this.login_progress = false;
        this.error_message = error_data.error.message;
      });
  }
}
