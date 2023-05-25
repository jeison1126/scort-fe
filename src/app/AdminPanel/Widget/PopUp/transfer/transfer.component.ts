import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Transfer } from 'src/app/Models/Transfer';
import { ApiService } from 'src/app/Services/api.service';
import { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent {

    alertOpt: SweetAlertOptions = {};
    data!: Transfer;
    adminprList: any[] = [];
    adminProductList: any[] = [];
    @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
    dataSource = new MatTableDataSource<any>(this.adminProductList);
    buttdisa = false;
    failcanceltx = false;
    msjcanceltx = '';
    failservercanceltx = false;
    transactionsRespo: any;
    timer = 0;


    constructor(
        private loader: LoadingBarService,
        private apiService: ApiService,
        private router: Router,
        //private toastyService: ToastaService,
    ) { }

    ngOnInit() {
        
        
    }

    aprobe_transfer(id_transfe:number) {      
        let ref = this.data.reference;
        console.log(ref);
        this.buttdisa = !this.buttdisa;
        let jsonObjChangeState = {
            "state": 2
        }
        let jsonObjEmailReply ={
            "reference" : ref,
            "state": 2
        }
        this.apiService.sendEmailReplyTransfer(jsonObjEmailReply).subscribe();
        this.apiService.ChangeStateAprobe(id_transfe, jsonObjChangeState).subscribe(res => this.onClose(res));
        
    }

    reject_transfer(id_transfe:number){      
        let ref = this.data.reference;          
        this.buttdisa = !this.buttdisa;
        let jsonObjChangeState = {
            "state": 3
        }
        let jsonObjEmailReply ={
            "reference" : ref,
            "state": 3
        }
        this.apiService.sendEmailReplyTransfer(jsonObjEmailReply).subscribe();
        this.apiService.ChangeStateAprobe(id_transfe, jsonObjChangeState).subscribe(res => this.onClose(res));
    }

    onClose(response:any) {
        window.location.reload();
    }


}
