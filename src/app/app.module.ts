import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/api-services/interceptor';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

import { LandingPageComponent } from './pages/landing-page/landing-page.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserComponent } from './pages/user/user.component';
import { LinkBoxComponent } from './components/link-box/link-box.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { ProfileComponent } from './pages/profile/profile.component';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PasswordRecoveryComponent } from './pages/password-recovery/password-recovery.component';
import { LoadingComponent } from './components/loading/loading.component';
import { AddConnectionDialogComponent } from './components/add-connection-dialog/add-connection-dialog.component';
import { EditConnectionDialogComponent } from './components/edit-connection-dialog/edit-connection-dialog.component';
import { DeleteAccountDialogComponent } from './components/delete-account-dialog/delete-account-dialog.component';
import { DesignCircleComponent } from './components/design-circle/design-circle.component';
import { ProfilePhotoComponent } from './components/profile-photo/profile-photo.component';
import { BackgroundPhotoComponent } from './components/background-photo/background-photo.component';
import { FavoritingComponent } from './components/favoriting/favoriting.component';
import { FullnameComponent } from './components/fullname/fullname.component';
import { BiographyComponent } from './components/biography/biography.component';
import { SearchOptionComponent } from './components/search-option/search-option.component';
import { EditPhotoDialogComponent } from './components/edit-photo-dialog/edit-photo-dialog.component';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';
import { ImageCropperModule } from 'ngx-image-cropper';
import { GeneralSettingsComponent } from './components/settings-page-components/general-settings/general-settings.component';
import { UsernameSettingsComponent } from './components/settings-page-components/username-settings/username-settings.component';
import { PasswordSettingsComponent } from './components/settings-page-components/password-settings/password-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SignInComponent,
    SignUpComponent,
    SearchPageComponent,
    UserCardComponent,
    UserComponent,
    LinkBoxComponent,
    ProfileComponent,
    FavoritesComponent,
    SettingsComponent,
    NotFoundComponent,
    PasswordRecoveryComponent,
    LoadingComponent,
    AddConnectionDialogComponent,
    EditConnectionDialogComponent,
    DeleteAccountDialogComponent,
    DesignCircleComponent,
    ProfilePhotoComponent,
    BackgroundPhotoComponent,
    FavoritingComponent,
    FullnameComponent,
    BiographyComponent,
    SearchOptionComponent,
    EditPhotoDialogComponent,
    DragAndDropDirective,
    GeneralSettingsComponent,
    UsernameSettingsComponent,
    PasswordSettingsComponent,
  ],
  imports: [
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    CommonModule,
    MatSelectModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    ImageCropperModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
