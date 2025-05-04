// user-details.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User } from '../user.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User | null = null;
  selectedFile: File | null = null;
  private imageUploadModal: Modal | null = null;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    if (!this.user) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  openImageUpload() {
    if (!this.imageUploadModal) {
      const modalElement = document.getElementById('imageUploadModal');
      if (modalElement) {
        this.imageUploadModal = new Modal(modalElement);
      }
    }
    this.imageUploadModal?.show();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  uploadImage() {
    if (this.selectedFile && this.user) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (this.user) {
          // Create a new user object with all required properties
          const updatedUser: User = {
            name: this.user.name,
            username: this.user.username,
            email: this.user.email,
            profileImage: e.target.result as string,
            createdAt: this.user.createdAt
          };
          
          this.user = updatedUser;
          
          // Update user in localStorage/sessionStorage
          const currentUser = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser') || '{}');
          currentUser.user = updatedUser;
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
      };
      reader.readAsDataURL(this.selectedFile);
      this.imageUploadModal?.hide();
    }
  }

  editProfile() {
    // Implement edit profile functionality
    console.log('Edit profile clicked');
  }

  changePassword() {
    // Implement change password functionality
    console.log('Change password clicked');
  }
}
