import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentorRoutingModule } from './mentor-routing.module';
import { MentorComponent } from './mentor.component';
import { MentorProfileComponent } from './mentor-profile/mentor-profile.component';
import { UpdateComponent } from './mentor-profile/update/update.component';
import { MentorMenuComponent } from './mentor-menu/mentor-menu.component';
import { MentorDashboardComponent } from './mentor-dashboard/mentor-dashboard.component';



@NgModule({
  declarations: [MentorComponent, MentorProfileComponent, UpdateComponent, MentorMenuComponent, MentorDashboardComponent],
  imports: [
    CommonModule,
    MentorRoutingModule
  ]
})
export class MentorModule { }
