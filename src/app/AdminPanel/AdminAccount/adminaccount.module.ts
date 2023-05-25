import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminaccountRoutingModule } from './adminaccount-routing.module';
import { AccountsettingComponent } from './accountsetting/accountsetting.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AccountsettingComponent,
    EditprofileComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AdminaccountRoutingModule
  ]
})
export class AdminaccountModule { }
