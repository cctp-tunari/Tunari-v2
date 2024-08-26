import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyC0GpkiZ4KcT6GvGZ4arJh-cCt2Agarbkc",
      authDomain: "tunari-65fdc.firebaseapp.com",
      databaseURL: "https://tunari-65fdc-default-rtdb.firebaseio.com",
      projectId: "tunari-65fdc",
      storageBucket: "tunari-65fdc.appspot.com",
      messagingSenderId: "484537151866",
      appId: "1:484537151866:web:e0d065daa179bf9c3526c3",
      measurementId: "G-GLPT50FQ7G"
    })),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideHttpClient()
  ]
};