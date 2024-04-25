import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; // Adjust the path as necessary

const routes: Routes = [
  { path: '', component: HomeComponent } // This sets HomeComponent as the default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] // Export RouterModule so it can be imported elsewhere in your app
})
export class AppRoutingModule { }
