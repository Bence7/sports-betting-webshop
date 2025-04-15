import { provideRouter } from '@angular/router';
import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import {
  provideAuth,
  getAuth,
  browserLocalPersistence,
} from '@angular/fire/auth';
import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { provideStore, StoreModule } from '@ngrx/store';
import { AuthStoreModule } from '../stores/auth/auth.module';
import { EffectsModule } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
const devMode = isDevMode();

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => {
      const auth = getAuth();
      auth.setPersistence(browserLocalPersistence);
      return auth;
    }),
    importProvidersFrom(
      StoreModule.forRoot(),
      EffectsModule.forRoot([]),
      AuthStoreModule
    ),
    provideStore(),
    ...(devMode ? [provideStoreDevtools()] : []),
  ],
};
