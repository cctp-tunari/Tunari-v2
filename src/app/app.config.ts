import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"tunari-65fdc","appId":"1:484537151866:web:e0d065daa179bf9c3526c3","storageBucket":"tunari-65fdc.appspot.com","apiKey":"AIzaSyC0GpkiZ4KcT6GvGZ4arJh-cCt2Agarbkc","authDomain":"tunari-65fdc.firebaseapp.com","messagingSenderId":"484537151866","measurementId":"G-GLPT50FQ7G"})), provideAuth(() => getAuth())]
};
