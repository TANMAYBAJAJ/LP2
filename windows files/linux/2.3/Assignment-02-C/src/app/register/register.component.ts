import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user = {
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  register() {
    if (this.user.name === '') {
      alert('Please enter Name');
      return;
    }

    if (this.user.username === '') {
      alert('Please enter Username');
      return;
    }

    if (this.user.email === '') {
      alert('Please enter Email');
      return;
    }

    if (this.user.password === '') {
      alert('Please enter Password');
      return;
    }

    if (this.user.confirmPassword === '') {
      alert('Please confirm Password');
      return;
    }

    if (this.user.password !== this.user.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Remove confirmPassword before sending to server
    const { confirmPassword, ...userData } = this.user;

    this.userService.register(userData).subscribe({
      next: (response) => {
        this.isLoading = false;
        // Store user data in localStorage or service
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}
