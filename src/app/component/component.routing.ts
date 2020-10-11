import { Routes } from '@angular/router';

import { NgbdpregressbarBasicComponent } from './progressbar/progressbar.component';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
import { NgbdAccordionBasicComponent } from './accordion/accordion.component';
import { NgbdAlertBasicComponent } from './alert/alert.component';
import { NgbdCarouselBasicComponent } from './carousel/carousel.component';
import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdModalBasicComponent } from './modal/modal.component';
import { NgbdPopTooltipComponent } from './popover-tooltip/popover-tooltip.component';
import { NgbdratingBasicComponent } from './rating/rating.component';
import { NgbdtabsBasicComponent } from './tabs/tabs.component';
import { NgbdtimepickerBasicComponent } from './timepicker/timepicker.component';
import { CardsComponent } from './card/card.component';
import { ToastComponent } from './toast/toast.component';
import { FormComponent } from './form/form.component';
import { HistoryComponent } from './history/history.component';
import { CompaniesManageComponent } from './companies-manage/companies-manage.component';
import { UsersManageComponent } from './users-manage/users-manage.component';
import { CompanyComponent } from './company/company.component';
import { UserComponent } from './user/user.component';

export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'progressbar',
				component: NgbdpregressbarBasicComponent,
				data: {
					title: 'Progressbar'
				}
			},
			{
				path: 'form',
				component: FormComponent,
				data: {
					title: 'Generation Xml File'
				}
			},
			{
				path: 'history',
				component: HistoryComponent,
				data: {
					title: 'History Of Invoices'
				}
			},
			{
				path: 'company/:id/:test',
				component: CompanyComponent,
				data: {
					title: 'Operation Company'
				}
			},
			{
				path: 'companies-manage',
				component: CompaniesManageComponent,
				data: {
					title: 'Manage Companies'
				}
			},
			{
				path: 'users-manage',
				component: UsersManageComponent,
				data: {
					title: 'Manage Users'
				}
			},
			{
				path: 'user/:id',
				component: UserComponent,
				data: {
					title: 'Manage Users'
				}
			},
			{
				path: 'card',
				component: CardsComponent,
				data: {
					title: 'Cards'
				}
			},
			{
				path: 'pagination',
				component: NgbdpaginationBasicComponent,
				data: {
					title: 'Pagination'
				}
			},
			{
				path: 'accordion',
				component: NgbdAccordionBasicComponent,
				data: {
					title: 'Accordion'
				}
			},
			{
				path: 'alert',
				component: NgbdAlertBasicComponent,
				data: {
					title: 'Alert'
				}
			},
			{
				path: 'carousel',
				component: NgbdCarouselBasicComponent,
				data: {
					title: 'Carousel'
				}
			},
			{
				path: 'dropdown',
				component: NgbdDropdownBasicComponent,
				data: {
					title: 'Dropdown'
				}
			},
			{
				path: 'modal',
				component: NgbdModalBasicComponent,
				data: {
					title: 'Modal'
				}
			},
			{
				path: 'poptool',
				component: NgbdPopTooltipComponent,
				data: {
					title: 'Popover & Tooltip'
				}
			},
			{
				path: 'rating',
				component: NgbdratingBasicComponent,
				data: {
					title: 'Rating'
				}
			},
			{
				path: 'tabs',
				component: NgbdtabsBasicComponent,
				data: {
					title: 'Tabs'
				}
			},
			{
				path: 'timepicker',
				component: NgbdtimepickerBasicComponent,
				data: {
					title: 'Timepicker'
				}
			},
			{
				path: 'toast',
				component: ToastComponent,
				data: {
					title: 'Toast',
				}
			}
		]
	}
];
