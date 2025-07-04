import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthPageComponent } from './auth-page.component';
import { provideStore } from '@ngrx/store';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../../environments/environment';

describe('AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPageComponent],
      providers: [
        provideStore(),
        provideAuth(() => getAuth()),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
