import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { TechnologyComponent } from './technology/technology.component';
import { ManageDomainsComponent } from './manage-domains/manage-domains.component';
import { ManagePaymentsComponent } from './manage-payments/manage-payments.component';
import { ManageTrainersComponent } from './manage-trainers/manage-trainers.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  canActivate: [AuthGuard],
  children: [
    { path: 'dashboard', component: AdminDashboardComponent, pathMatch: 'full' },
    { path: 'manage-users', component: ManageUsersComponent, pathMatch: 'full' },
    { path: 'manage-trainers', component: ManageTrainersComponent, pathMatch: 'full' },
    { path: 'manage-payments', component: ManagePaymentsComponent, pathMatch: 'full' },
    { path: 'manage-domains', component: ManageDomainsComponent, pathMatch: 'full' },
    { path: 'technology', component: TechnologyComponent, pathMatch: 'full' },
    { path: 'app-settings', component: AppSettingsComponent, pathMatch: 'full' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
