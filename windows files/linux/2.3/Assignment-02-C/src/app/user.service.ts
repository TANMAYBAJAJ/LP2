// src/app/user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  name: string;
  username: string;
  email: string;
  password?: string;
  profileImage?: string;
  createdAt?: Date;
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, user);
  }

  login(loginData: LoginData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, loginData);
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    if (userStr) {
      return JSON.parse(userStr).user;
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }
}
