import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule } from '@angular/forms'

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageTrainersComponent } from './manage-trainers/manage-trainers.component';
import { ManageDomainsComponent } from './manage-domains/manage-domains.component';
import { TechnologyComponent } from './technology/technology.component';
import { ManagePaymentsComponent } from './manage-payments/manage-payments.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';

import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';




@NgModule({
  declarations: [AdminComponent,
    ManageUsersComponent, 
    ManageTrainersComponent, 
    ManageDomainsComponent, 
    TechnologyComponent, 
    ManagePaymentsComponent, 
    AppSettingsComponent, AdminMenuComponent, AdminDashboardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TableModule,
    DialogModule,
    DropdownModule,
    FormsModule
  ]
})
export class AdminModule { }
