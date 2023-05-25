import { Component, OnInit } from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-deletelistdialog',
  templateUrl: './deletelistdialog.component.html',
  styleUrls: ['./deletelistdialog.component.css']
})
export class DeletelistdialogComponent implements OnInit {

data : string | undefined;

constructor(public dialogRef : MatDialogRef<DeletelistdialogComponent>){}
  
ngOnInit() {
}

yes(){
    this.dialogRef.close("yes");
 }

}
