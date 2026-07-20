import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { User } from '../../core/models/user';
import { AuthService } from '../../core/services/auth.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  readonly loginService = inject(LoginService);
  readonly snackbarService = inject(SnackbarService);
  readonly authService = inject(AuthService);
  readonly router = inject(Router);

  readonly loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    const { email, password } = this.loginForm.getRawValue();

    this.loginService.login(email!, password!).subscribe({
      next: (user: User) => {
        this.authService.setUser(user);
        this.router.navigateByUrl('/deals');
      },
      error: () => {
        this.snackbarService.error('Invalid email or password.');
      },
    });
  }
}
