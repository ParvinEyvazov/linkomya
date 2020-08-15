import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "sign-in", component: SignInComponent },
  { path: "sign-up", component: SignUpComponent },
  { path: "search", component: SearchPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
