import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-transactionresponse',
  templateUrl: './transactionresponse.component.html',
  styleUrls: ['./transactionresponse.component.css']
})
export class TransactionresponseComponent {

  data: any;

   constructor(
      public dialogRef: MatDialogRef<TransactionresponseComponent>,
      private apiService: ApiService,
      private router: Router,
      //private toastyService: ToastaService,
   ) { }

   ngOnInit() {
   }

}
