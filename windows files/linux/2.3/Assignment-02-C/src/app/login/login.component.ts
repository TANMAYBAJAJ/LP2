import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
    rememberMe: false
  };

  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  login() {
    this.isLoading = true;
    this.errorMessage = '';

    this.userService.login(this.loginData).subscribe({
      next: (response) => {
        this.isLoading = false;
        // Store user data in localStorage or service
        if (this.loginData.rememberMe) {
          localStorage.setItem('currentUser', JSON.stringify(response));
        } else {
          sessionStorage.setItem('currentUser', JSON.stringify(response));
        }
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Login failed. Please check your credentials.';
      }
    });
  }
}
