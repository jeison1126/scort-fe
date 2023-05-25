import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Transactions } from 'src/app/Models/Transactions';
import { ApiService } from 'src/app/Services/api.service';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  alertOpt: SweetAlertOptions = {};
    data!: Transactions;
    adminprList: any[] = [];
    adminProductList: any[] = [];
    @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
    dataSource = new MatTableDataSource<any>(this.adminProductList);
    buttdisa = false;
    buttdisacontra = false;
    failcanceltx = false;
    msjcanceltx = '';
    failservercanceltx = false;
    transactionsRespo: any;
    timer = 0;

    constructor(
        private loader: LoadingBarService,
        public dialogRef: MatDialogRef<TransactionComponent>,
        private apiService: ApiService,
        private router: Router,
        //private toastyService: ToastaService,
    ) { }

    ngOnInit() {
    }

    anul_transaction(id_tx:number) {
        this.buttdisa = !this.buttdisa;
        let jsonObjCancel = {
            'id_tx': id_tx
        }
        this.apiService.setCancelTransaction(id_tx, jsonObjCancel).subscribe(res => this.onClose(res));
    }

    contra_c(id_tx:number){
        this.buttdisacontra = !this.buttdisacontra;
        let jsonObjContra = {
            'id_tx': id_tx
        }
        this.apiService.setContraTransaction(id_tx, jsonObjContra).subscribe(res => this.onCloseContra(res));
    }


    onClose(response:any) {
        this.failcanceltx = false;
        let myJSON = JSON.stringify(response);
        let obj = JSON.parse(myJSON);
        // console.log(obj.data.msgresp);
        // console.log(obj.data.num_autorizacion);
        // console.log(obj.data.num_recibo);
        // console.log(obj.data.date);
        if (obj.result == 200) {
            if (obj.data.msgresp == '00') {
                this.dialogRef.close("yes");
                this.MessajeCancelTransaction(obj.data.msgresp, obj.data.num_autorizacion, obj.data.num_recibo, obj.data.date);
                setInterval(() => {
                    window.location.reload();
                }, 3000)
            } else {
                this.failcanceltx = true;
                this.msjcanceltx = obj.data.msgresp;
            }
        } else {
            this.failservercanceltx = true;
        }
    }

    onCloseContra(response:any) {
        this.dialogRef.close("yes");
        window.location.reload();
    }



    MessajeCancelTransaction(msgresp:any, num_autorizacion: number, num_recibo:number, date:any) {
        let myObj_transaction = {
            message: "Se realizo la cancelación de la transacción correctamente",
            msgresp: msgresp,
            num_autorizacion: num_autorizacion,
            num_recibo: num_recibo,
            date: date
        };
        this.transactionsRespo = myObj_transaction;
        this.apiService.PopUpTransaccionCancelResponse(this.transactionsRespo);
    }

}
