import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ForgotpasswordchangeComponent } from './forgotpasswordchange/forgotpasswordchange.component';
import { RegisterComponent } from './register/register.component';
import { SigninComponent } from './signin/signin.component';
import { ThankyouComponent } from './thankyou/thankyou.component';

export const SessionRoutes: Routes = [
  { 
		path: '', 
		component: SigninComponent 
	},
   { 
      path: 'signin', 
      component: SigninComponent 
   },
	{
		path: 'signup',
		component: RegisterComponent
	},
   {
      path: 'thank-you',
      component: ThankyouComponent
   },
   {
      path: 'forgot-password',
      component: ForgotpasswordComponent
   },
   {
      path: 'forgot-password/:token',
      component: ForgotpasswordchangeComponent
   }
];

