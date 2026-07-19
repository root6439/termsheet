import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly apiUrl = 'api/users';
  private readonly http = inject(HttpClient);

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}`, { email, password });
  }
}
