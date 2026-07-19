import { computed, effect, Injectable, signal } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _user = signal<User | null>(null);
  readonly isAdmin = computed(() => this._user()?.role === 'admin');
  readonly user = this._user.asReadonly();

  constructor() {
    const user = localStorage.getItem('user');

    if (user) {
      this.setUser(JSON.parse(user));
    }

    effect(() => localStorage.setItem('user', JSON.stringify(this._user())));
  }

  setUser(user: User | null): void {
    this._user.set(user);
  }

  get isAuthenticated(): boolean {
    return this.user() !== null;
  }
}
