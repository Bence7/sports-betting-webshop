import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  validatePassword,
} from '@angular/fire/auth';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { from, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth = inject(Auth);
  public async registerUser(email: string, password: string) {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }

  public async sendPasswordResetEmail(email: string) {
    return await sendPasswordResetEmail(this.auth, email);
  }

  public async validatePassword(password: string) {
    return await validatePassword(this.auth, password);
  }

  public checkValidPassword(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ passwordValid: boolean } | null> => {
      if (!control.value) {
        return of(null);
      }

      return from(validatePassword(this.auth, control.value)).pipe(
        map((response) => {
          console.log(response.isValid);
          return response.isValid ? null : { passwordValid: true };
        })
      );
    };
  }
}
