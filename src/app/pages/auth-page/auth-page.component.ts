import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../stores/auth/auth.actions';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-auth-page',
  imports: [ReactiveFormsModule],
  templateUrl: './auth-page.component.html',
})
export class AuthPageComponent {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  protected readonly loginForm = this.fb.group({
    email: this.fb.control<string>('', [Validators.required, Validators.email]),
    password: this.fb.control<string>('', Validators.required),
  });

  protected readonly registerForm = this.fb.group({
    email: this.fb.control<string>('', [Validators.required, Validators.email]),
    password: this.fb.control<string>('', {
      validators: Validators.required,
      asyncValidators: this.authService.checkValidPassword(),
    }),
  });
  protected readonly passwordResetForm = this.fb.group({
    email: this.fb.control<string>('', [Validators.required, Validators.email]),
  });

  protected submitLogin() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.store.dispatch(AuthActions.signIn({ email, password }));
      this.loginForm.reset();
    }
  }

  protected async submitRegistration() {
    if (this.registerForm.invalid) return;
    console.log('register');

    const { email, password } = this.registerForm.value;
    if (email && password) {
      const response = await this.authService.registerUser(email, password);
      console.log(response.user);
      this.registerForm.reset();
    }
  }

  protected async sendPasswordReset() {
    if (this.passwordResetForm.invalid) return;

    const { email } = this.passwordResetForm.value;
    if (email) {
      const response = await this.authService.sendPasswordResetEmail(email);
      console.log(response);
    }
  }
}
