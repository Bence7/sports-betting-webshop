import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../stores/auth/auth.actions';

@Component({
  selector: 'app-admin-page',
  imports: [],
  templateUrl: './admin-page.component.html',
})
export class AdminPageComponent {
  private readonly store = inject(Store);
  protected logOut() {
    this.store.dispatch(AuthActions.signOut());
  }
}
