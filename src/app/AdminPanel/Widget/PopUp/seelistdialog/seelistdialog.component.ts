import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-seelistdialog',
  templateUrl: './seelistdialog.component.html',
  styleUrls: ['./seelistdialog.component.css']
})
export class SeelistdialogComponent {

  public config: PerfectScrollbarConfigInterface = {};

	todayDate = new Date();
	
	constructor(public dialogRef : MatDialogRef<SeelistdialogComponent>) { }

	ngOnInit() {
	}

}
