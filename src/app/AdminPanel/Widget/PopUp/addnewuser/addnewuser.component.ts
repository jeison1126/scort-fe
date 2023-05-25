import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addnewuser',
  templateUrl: './addnewuser.component.html',
  styleUrls: ['./addnewuser.component.css']
})
export class AddnewuserComponent implements OnInit {

  addNewUserForm!    : FormGroup;
	emailPattern 		   : string = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";

	constructor( private formBuilder : FormBuilder,
					 public dialogRef    : MatDialogRef<AddnewuserComponent>) { }

	ngOnInit() {
		this.addNewUserForm = this.formBuilder.group({
			name 	     : ['',[Validators.required]],
			email 		 : ['',[Validators.required,Validators.pattern(this.emailPattern)]],
			accessType       : ['',[Validators.required]]
		})
	}

	// onFormSubmit method is submit a add new user form.
	onFormSubmit(){
		this.dialogRef.close(this.addNewUserForm.value);
	}
}
