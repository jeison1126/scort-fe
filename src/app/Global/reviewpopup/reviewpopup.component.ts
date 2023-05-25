import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reviewpopup',
  templateUrl: './reviewpopup.component.html',
  styleUrls: ['./reviewpopup.component.css']
})
export class ReviewpopupComponent implements OnInit {
  
  singleProductDetails : any;
   reviews : any;

   constructor(public dialogRef: MatDialogRef<ReviewpopupComponent>) { }

   ngOnInit() {
   }

}
