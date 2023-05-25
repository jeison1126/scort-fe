import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { StoreAdmin, StoreBankAccount, StoreDocs } from 'src/app/Models/StoreAdmin';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';
import { SweetAlertOptions } from 'sweetalert2';

export interface PercentageSale {
  id: string;
  percentage: string;
  description: string;
}

export interface PercentagePayment {
  id: string;
  percentage: string;
  description: string;
}

export interface Cuc {
  id: string;
  cuc: string;
}

@Component({
  selector: 'app-storevalidation',
  templateUrl: './storevalidation.component.html',
  styleUrls: ['./storevalidation.component.scss']
})
export class StorevalidationComponent implements OnInit  {

    id_store: any;
    address!: StoreAdmin;
    city!: StoreAdmin;
    city_id!: StoreAdmin;
    departament!: StoreAdmin;
    description!: StoreAdmin;
    email!: StoreAdmin;
    id_departament!: StoreAdmin;
    manager!: StoreAdmin;
    name_store!: StoreAdmin;
    number_identifier!: StoreAdmin;
    state_store!: StoreAdmin;
    storecategories!: StoreAdmin;
    telephone!: StoreAdmin;
    storecategories_description!: StoreAdmin;
    test: any;
    doc_identifier_doc: any;
    cam_com_doc: any;
    rut_doc: any;
    cert_bank_doc: any;
    storeDocsGrid: StoreDocs[] = [];
    doc: StoreDocs[] = [];
    account_number!: StoreBankAccount;
    bank!: StoreBankAccount;
    certification_url: any;
    id_bank_account!: StoreBankAccount;
    responsible!: StoreBankAccount;
    state!: StoreBankAccount;
    store!: StoreBankAccount;
    store_name_legal!: StoreBankAccount;
    typeaccount!: StoreBankAccount;
    panelOpenState = false;
    alertOpt: SweetAlertOptions = {};
    public percentagesaleFilterCtrl: FormControl = new FormControl();
    public percentagesaleCtrl: FormControl = new FormControl(null, [Validators.required]);
    percentage_sale$!: Observable<PercentageSale[]>;
    percentagesalelist: PercentageSale[] = [];
    percentagesale: PercentageSale[] = [];
    selectedPercentageSale: any;
    public percentagepaymentFilterCtrl: FormControl = new FormControl();
    public percentagepaymentCtrl: FormControl = new FormControl(null, [Validators.required]);
    percentage_payment$!: Observable<PercentagePayment[]>;
    percentagepaymentlist: PercentagePayment[] = [];
    percentagepayment: PercentagePayment[] = [];
    selectedPercentagePayment: any;
    public validate_percentage_sale: boolean = false;
    public validate_percentage_payment: boolean = false;
    public validate_cuc: boolean = false;
    id_percentage_sale: any;
    id_percentage_payment: any;
    selectedValue:any;

    register_type: any;
    location: any;
    mobile: any;
    identificationType: any;
    num_identify: any;
    name_product: any;
    description_product: any;
    age: any;


    cuc$!: Observable<Cuc[]>;
    public cucFilterCtrl: FormControl = new FormControl();
    selectedCuc: any;
    cuclist: Cuc[] = [];
    cuc: Cuc[] = [];
    id_cuc: any;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formGroup: FormBuilder,
        private toastyService: ToastrService,
        private apiService: ApiService,
        private _formBuilder: FormBuilder,
        private sanitizer: DomSanitizer) { }


    ngOnInit() {

        this.addBodyClass();

        this.route.params.subscribe((res:any) => {
            this.id_store = res.id_store;
        })

        this.apiService.getStoreData(this.id_store).subscribe(
            (res:any) => {
                this.id_percentage_sale = res.commission_sale_id;
                this.id_percentage_payment = res.commission_payment_id;
                this.id_cuc = res.cuc_id;
                this.apiService.getStoreDocuments(this.id_store).subscribe(
                    (data_docs:any) => {
                        this.apiService.getProductStoresbyStoreidWithout(this.id_store).subscribe(
                            (data_prod:any) => {
                                this.getStoreData(res, data_docs, data_prod);
                            }
                        );
                    }
                );
            }
        );

    }

    addBodyClass() {

        window.addEventListener('load', function () {
            document.querySelector('body')!.classList.add("loaded")
        });

    }

    getStoreData(response:any, data_docs:any, data_prod:any) {
        this.address = response.address;
        this.city = response.city;
        this.city_id = response.city_id;
        this.departament = response.departament;
        this.description = response.description;
        this.email = response.email;
        this.id_departament = response.id_departament;
        this.manager = response.manager;
        this.name_store = response.name_store;
        this.number_identifier = response.number_identifier;
        this.state_store = response.state_store;
        this.storecategories = response.storecategories;
        this.telephone = response.telephone;
        this.storecategories_description = response.storecategories_description;
        this.test = this.sanitizer.bypassSecurityTrustResourceUrl(environment.api.baseBucketImageUrl + '148_1.png');
        this.storeDocsGrid = [];
        this.storeDocsGrid = data_docs.map((item:any) => {
            if (item['id_document_type'] == 1) {
                this.doc_identifier_doc = item['url_document'];
            } else if (item['id_document_type'] == 2) {
                this.rut_doc = item['url_document'];
            } else if (item['id_document_type'] == 3) {
                this.cam_com_doc = item['url_document'];
            }
        });

        this.doc_identifier_doc = this.sanitizer.bypassSecurityTrustResourceUrl(this.doc_identifier_doc);
        this.rut_doc = this.sanitizer.bypassSecurityTrustResourceUrl(this.rut_doc);
        this.cam_com_doc = this.sanitizer.bypassSecurityTrustResourceUrl(this.cam_com_doc);
        this.address = response.address;
        this.register_type = response.register_type;
        this.location = response.location;
        this.mobile = response.mobile;
        this.identificationType = response.identificationType;
        this.num_identify = response.num_identify;

        let myJSON = JSON.stringify(data_prod);
        let obj = JSON.parse(myJSON);

        for (var i = 0; i < obj.length; i++) {
            this.name_product = obj[i].name_product;
            this.description_product = obj[i].description_product;
            this.age = obj[i].age;
        }

        // console.log(data_prod.age);

    }


    RechStore() {

        let status_up = { state_store: 0, status_store: 3 };
        this.apiService.updateStore(status_up, this.id_store).subscribe(
            response => {
                let JsonDataEmail = {
                    "email": this.email
                }
                this.apiService.sendEmailWelcomeRejectStore(JsonDataEmail).subscribe();
                this.router.navigate(['/admin-panel/store']);
            }
        );

    }


    AproveStore() {
        let JsonDataEmail = {
            "email": this.email
        }
        this.apiService.sendEmailWelcomeStore(JsonDataEmail).subscribe();

        let status_up = { state_store: 1, status_store: 2 };
        this.apiService.updateStore(status_up, this.id_store).subscribe(
            response => {
                this.apiService.getUserId(this.id_store).subscribe(
                    (response:any) => {
                        let user_id = response.user_id;
                        let JsonData = {
                            "type": 2
                        };
                        this.apiService.setUpdateUserTypeFront(JsonData, user_id).subscribe(
                            response => {
                                let JsonDataGroup = {
                                    "group_id": 3
                                };
                                this.apiService.setUpdateUserGroup(JsonDataGroup, user_id).subscribe(
                                    response => {
                                        this.router.navigate(['/admin-panel/store']);
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );

    }

}
