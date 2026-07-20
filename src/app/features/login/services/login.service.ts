import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly apiUrl = 'api/users';
  private readonly http = inject(HttpClient);

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, { email, password });
  }
}
