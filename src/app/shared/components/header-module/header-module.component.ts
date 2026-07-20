import { Component, inject, input, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header-module',
  standalone: true,
  imports: [MatIcon, MatButton],
  templateUrl: './header-module.component.html',
  styleUrl: './header-module.component.scss',
})
export class HeaderModuleComponent {
  readonly authService = inject(AuthService);

  readonly moduleName = input.required<string>();
  readonly add = output<void>();

  readonly isAdmin = this.authService.isAdmin;
}
