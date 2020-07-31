import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [{
  path: '', component: UserComponent,
  canActivate: [AuthGuard],
  children: [
    { path: 'dashboard', component: UserDashboardComponent, pathMatch: 'full' },
    { path: 'public-profile', component: UserProfileComponent, pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
