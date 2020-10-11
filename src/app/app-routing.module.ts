import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { RoutGuardService } from './service/rout-guard/rout-guard.service';
import { ErrorComponent } from './auth/error/error.component';

export const Approutes: Routes = [
	{path : '' ,component:LoginComponent},
	{path : 'login' ,component:LoginComponent},
	{path : 'logout' ,component:LogoutComponent,canActivate :[RoutGuardService]},
	{path : 'sign-up' ,component:SignUpComponent},

	{
		path: '',
		component: FullComponent,canActivate :[RoutGuardService],
		children: [
			{ path: 'dashboard', redirectTo: '/dashboard', pathMatch: 'full'  },
			{
				path: 'dashboard',
				loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
			},
			{
				path: 'component',
				loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
			}
		]
	},
	{path: 'error', component : ErrorComponent},
    {path: '**', component : ErrorComponent},
];
