import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../stores/auth/auth.actions';

@Component({
  selector: 'app-auth-page',
  imports: [ReactiveFormsModule],
  templateUrl: './auth-page.component.html',
})
export class AuthPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  protected readonly loginForm = this.fb.group({
    email: this.fb.control<string>('', [Validators.required, Validators.email]),
    password: this.fb.control<string>('', Validators.required),
  });

  protected submitLogin() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.store.dispatch(AuthActions.signIn({ email, password }));
      this.loginForm.reset();
    }
  }
}
