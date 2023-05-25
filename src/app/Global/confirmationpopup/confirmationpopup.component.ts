import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmationpopup',
  templateUrl: './confirmationpopup.component.html',
  styleUrls: ['./confirmationpopup.component.css']
})
export class ConfirmationpopupComponent implements OnInit {

  message : string | undefined;
   
  constructor(public dialogRef: MatDialogRef<ConfirmationpopupComponent>) { }

  ngOnInit() {
  }

}
