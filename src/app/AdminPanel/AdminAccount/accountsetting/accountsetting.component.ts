import { Component } from '@angular/core';
import { AdminPanelServiceService } from '../../Service/AdminPanelService.service';

@Component({
  selector: 'app-accountsetting',
  templateUrl: './accountsetting.component.html',
  styleUrls: ['./accountsetting.component.css']
})
export class AccountsettingComponent {

  popUpDeleteUserResponse : any;
	
	selected = "1 month";

	reasons : any [] = [ 
		"This is temporary. I'll be back.",
		"My account was hacked.",
		"I have a privacy concern.",
		"Other"
	]

	howLongDeactivate : any [] = [
		"1 week",
		"1 month",
		"6 months",
		"1 year"
	]

	constructor(public service : AdminPanelServiceService) { }

	ngOnInit() {
		console.log("ESTPY EN NG___________1");
	}

	/** 
     *onDelete method is used to open a delete dialog.
     */
   onDelete(){
      this.service.deleteDialog("Are you sure you want to delete this account permanently?").
         subscribe( res => {this.popUpDeleteUserResponse = res},
                    err => console.log(err),
                    ()  => this.popUpDeleteUserResponse)
   }

}
