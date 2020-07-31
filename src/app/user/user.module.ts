import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserMenuComponent } from './user-menu/user-menu.component';


@NgModule({
  declarations: [UserComponent, UserDashboardComponent, UserProfileComponent, UserMenuComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
