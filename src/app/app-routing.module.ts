import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { UserComponent } from './pages/user/user.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { SettingsComponent } from './pages/settings/settings.component';

import { AuthGuardService as AuthGuard } from './services/auth-services/auth-guard.service';
import { LoggedInAuthGuardService as LoggedInAuthGuard } from './services/auth-services/logged-in-auth-guard.service';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PasswordRecoveryComponent } from './pages/password-recovery/password-recovery.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [LoggedInAuthGuard],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [LoggedInAuthGuard],
  },
  {
    path: 'password-recovery',
    component: PasswordRecoveryComponent,
    canActivate: [LoggedInAuthGuard],
  },
  { path: 'search', component: SearchPageComponent },
  { path: 'user', component: UserComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [AuthGuard],
  },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
