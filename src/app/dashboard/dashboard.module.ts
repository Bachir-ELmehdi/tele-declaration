import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AgmCoreModule } from '@agm/core';


const routes: Routes = [
	{
		path: '',
		data: {
			title: 'Dashboard'
		},
		component: DashboardComponent
	}
];

@NgModule({
	imports: [FormsModule, CommonModule, RouterModule.forChild(routes), ChartsModule,
		NgCircleProgressModule.forRoot({
			"radius": 20,
			"space": -10,
			"outerStrokeGradient": true,
			"outerStrokeWidth": 10,
			"outerStrokeColor": "#4882c2",
			"outerStrokeGradientStopColor": "#53a9ff",
			"innerStrokeColor": "#e7e8ea",
			"innerStrokeWidth": 10,
			"title": "Inv",
			"animateTitle": true,
			"animationDuration": 1000,
			"showUnits": false,
			"showBackground": false,
			"clockwise": false,
			"startFromZero": false
		  }),
		  AgmCoreModule.forRoot({
			apiKey: 'AIzaSyCKZKr2TBbbXUTqaLLVK-JhsJcg68GKOE0'
		  })
	],
	declarations: [DashboardComponent]
})
export class DashboardModule   {
	

}
