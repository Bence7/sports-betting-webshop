import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from '../../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideAuth(() => getAuth()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
