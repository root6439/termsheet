import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: User | null = null;

  get isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  get currentUser(): User | null {
    if (!this._user) {
      const user = localStorage.getItem('user');

      if (user) {
        this.setUser(JSON.parse(user));
      }
    }

    return this._user;
  }

  setUser(user: User): void {
    this._user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }
}
