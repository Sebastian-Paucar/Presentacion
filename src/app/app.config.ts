import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter,withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync} from '@angular/platform-browser/animations/async';
export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(BrowserAnimationsModule,HttpClientModule,BrowserModule),provideRouter(routes,withViewTransitions()), provideClientHydration(), provideAnimationsAsync(),]
};
