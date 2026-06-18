import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './demo/auth/auth.guard';
import { roleGuard } from './demo/auth/role.guard';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { EmployeComponent } from './theme/layout/employe/employe.component';
import { ManagerComponent } from './theme/layout/manager/manager.component';
import { GuestComponent } from './theme/layout/guest/guest.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, roleGuard],
    data: { roles: ['admin'] },
    children: [
      { path: '', redirectTo: 'default', pathMatch: 'full' },
      {
        path: 'default',
        loadComponent: () => 
          import('./demo/dashboard/view-admin/default.component')
            .then((c) => c.DefaultComponent)
      },
      {
        path: 'calendrier',
        loadComponent: () => 
          import('./demo/view-admin/calendrier/calendrier.component')
            .then((c) => c.CalendrierComponent)
      },
      {
        path: 'compte-employe',
        loadComponent: () => 
          import('./demo/view-admin/compte-employe/compte-employe.component')
            .then((c) => c.CompteEmployeComponent)
      },
      {
        path: 'leave-request',
        loadComponent: () => 
          import('./demo/view-admin/leave-request/leave-request.component')
            .then(m => m.LeaveRequestComponent)
      }
    ]
  },
  {
    path: 'employe',
    component: EmployeComponent,
    canActivate: [AuthGuard, roleGuard],
    data: { roles: ['employee'] },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => 
          import('./demo/dashboard/view-employe/default.component')
            .then((c) => c.DefaultComponent)
      },
      {
        path: 'calendrier',
        loadComponent: () => 
          import('./demo/view-employe/calendrier/calendrier.component')
            .then((c) => c.CalendrierComponent)
      },
      {
        path: 'mes-demandes',
        loadComponent: () => 
          import('./demo/view-employe/mes-demandes-conge/mes-demandes-conge.component')
            .then((c) => c.MesDemandesCongeComponent)
      },
      {
        path: 'historiques',
        loadComponent: () => 
          import('./demo/view-employe/historique-conge/historique-conge.component')
            .then((c) => c.HistoriqueCongeComponent)
      }
      
    ]
  },
  {
    path: 'manager',
    component: ManagerComponent,
    canActivate: [AuthGuard, roleGuard],
    data: { roles: ['manager'] },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => 
          import('./demo/dashboard/view-manager/default.component')
            .then((c) => c.DefaultComponent)
      },
      {
        path: 'calendrier',
        loadComponent: () => 
          import('./demo/view-employe/calendrier/calendrier.component')
            .then((c) => c.CalendrierComponent)
      },
      {
        path: 'leave-request',
        loadComponent: () => 
          import('./demo/view-manager/leave-request/leave-request.component')
          
            .then((c) => c.LeaveRequestComponent)
      },
      {
        path: 'historiques',
        loadComponent: () => 
          import('./demo/view-employe/mes-demandes-conge/mes-demandes-conge.component')
            .then((c) => c.MesDemandesCongeComponent)
      }
      
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => 
          import('./demo/pages/authentication/login/login.component')
            .then((m) => m.LoginComponent)
      },
      
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}