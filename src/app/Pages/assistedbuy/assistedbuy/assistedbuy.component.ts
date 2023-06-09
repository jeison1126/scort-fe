import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { delay, Observable, of, Subject } from 'rxjs';
import { Bank } from 'src/app/Models/Banks';
import { CategoryStore } from 'src/app/Models/CategoryStore';
import { City } from 'src/app/Models/City';
import { Departament } from 'src/app/Models/Departament';
import { SocietyType } from 'src/app/Models/SocietyType';
import { TypeAccount } from 'src/app/Models/TypeAccount';
import { ApiService } from 'src/app/Services/api.service';
import { EmbryoService } from 'src/app/Services/embryo.service';


interface TokenObj {
  token: string;
  user_id: string;
  type_user: string;
  non_field_errors: string;
  id_store: string;
  personal_name: string;
  user_email: string;
}

export interface Identifiers {
  id: string;
  type_identifier: string;
}

@Component({
  selector: 'app-assistedbuy',
  templateUrl: './assistedbuy.component.html',
  styleUrls: ['./assistedbuy.component.css']
})
export class AssistedbuyComponent implements OnInit {

    category$!: Observable<CategoryStore[]>;
    society$!: Observable<SocietyType[]>;
    depart$!: Observable<Departament[]>;
    city$!: Observable<City[]>;
    bank$!: Observable<Bank[]>;
    account_type$!: Observable<TypeAccount[]>;
    selectedPersonId = '5a15b13c36e7a7f00cf0d7cb';
    cam_com_docu: any;
    doc_identi_docu: any;
    rut_docu: any;
    bank_certification_docu: any;
    widthMin: Number = 700;
    heightMin: Number = 700;
    registerForm!: FormGroup;
    emailPattern: string = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
    storecategorylist: CategoryStore[] = [];
    storecategory: CategoryStore[] = [];
    societytypelist: SocietyType[] = [];
    societytype: SocietyType[] = [];
    departamentlist: Departament[] = [];
    departments: Departament[] = [];
    citietlist: City[] = [];
    cities: City[] = [];
    banklist: Bank[] = [];
    banks: Bank[] = [];
    typeaccountlist: TypeAccount[] = [];
    typeaccounts: TypeAccount[] = [];
    files_identifier_doc: File[] = [];
    selectedFiles_identifier_doc!: FileList;
    files_rut: File[] = [];
    selectedFiles_rut!: FileList;
    files_cam_com: File[] = [];
    selectedFiles_cam_com!: FileList;
    variable: any[] = [];
    name: any;
    selectedCity: any;
    selectedCategory: any;
    selectedSociety: any;
    selectedBAnk: any;
    selectedAccountType: any;
    public validate_user: boolean = false;
    identifierstlist: Identifiers[] = [];
    identifiers: Identifiers[] = [];
    identifier$!: Observable<Identifiers[]>;
    selectIdentifiers: any;

    public show: boolean = false;
    public show_spinner: boolean = false;
   /*  toastIconMax: ToastOptions = {
        title: "Logo comercio",
        msg: "Subir solo un logo para el comercio!",
        showClose: true,
        timeout: 4000,
        theme: "material"
    };
    toastRejectPixelsImg: ToastOptions = {
        title: "Dimension de imagen",
        msg: "No pudimos subir algunas de tus imágenes\n Deben tener formato jpg o png\n Deben tener más de 700 píxeles en uno de sus lados.",
        showClose: true,
        timeout: 8000,
        theme: "material"
    }; */

    public identifiersFilterCtrl: FormControl = new FormControl();
    private _onDestroy = new Subject<void>();
    // START ANGULAR MAT SEARCH CATEGORY STORE    
    public categorystoreCtrl: FormControl = new FormControl(null, [Validators.required]);
    public categorystoreFilterCtrl: FormControl = new FormControl();
    public filteredcategorystore!: CategoryStore[];
    // END ANGULAR MAT SEARCH CATEGORY STORE
    // START ANGULAR MAT SEARCH SOCIETY TYPE    
    public societytypeCtrl: FormControl = new FormControl(null, [Validators.required]);
    public societytypeFilterCtrl: FormControl = new FormControl();
    // END ANGULAR MAT SEARCH SOCIETY TYPE
    // START ANGULAR MAT SEARCH BANK
    public bankCtrl: FormControl = new FormControl(null, [Validators.required]);
    public bankFilterCtrl: FormControl = new FormControl();
    // END ANGULAR MAT SEARCH BANK

    // START ANGULAR MAT SEARCH BANK
    public typeaccountCtrl: FormControl = new FormControl(null, [Validators.required]);
    public typeaccountFilterCtrl: FormControl = new FormControl();
    // END ANGULAR MAT SEARCH BANK

    // END ANGULAR MAT SEARCH DEPARTMENT AND CITIES
    public departamentCtrll: FormControl = new FormControl(null, [Validators.required]);
    public departamentFilterCtrl: FormControl = new FormControl();
    public citieCtrl: FormControl = new FormControl(null, [Validators.required]);
    public citieFilterCtrl: FormControl = new FormControl();
    // END ANGULAR MAT SEARCH DEPARTMENT AND CITIES

    constructor(private route: ActivatedRoute,
        private router: Router,
        private formGroup: FormBuilder,
        public embryoService: EmbryoService,
        private apiService: ApiService,
        private changeDetectorRef: ChangeDetectorRef,
        private toastyService: ToastrService,
    ) { }

    ngOnInit() {
        // START ANGULAR MAT SEARCH CATEGORIES
        this.storecategory = [];
        this.apiService.getStoreCategories().subscribe(
            (data: CategoryStore[]) => {
                this.storecategorylist = data;
                for (var i in this.storecategorylist) {
                    let get_id_category = this.storecategorylist[i]['id'];
                    let get_name_category = this.storecategorylist[i]['name_category'];
                    this.storecategory.push({ name_category: get_name_category, id: get_id_category });
                }
                this.category$ = this.getCategories("", this.storecategory);
            },
        );


        // START ANGULAR MAT SEARCH SOCIETY TYPE
        this.societytype = [];
        this.apiService.getSocietyType().subscribe(
            (data: SocietyType[]) => {
                this.societytypelist = data;
                for (var i in this.societytypelist) {
                    let get_id = this.societytypelist[i]['id'];
                    let get_society_type = this.societytypelist[i]['society_type'];
                    this.societytype.push({ society_type: get_society_type, id: get_id });
                }

                this.society$ = this.getSocietyType("", this.societytype);

            },
        );

        // START ANGULAR MAT SEARCH DEPARTAMENT
        this.departments = [];
        this.apiService.getDepartmentsFront().subscribe(
            (data: Departament[]) => {
                this.departamentlist = data;
                for (var i in this.departamentlist) {
                    let get_id_departament = this.departamentlist[i]['id_departament'];
                    let get_departament = this.departamentlist[i]['departament'];
                    this.departments.push({ departament: get_departament, id_departament: get_id_departament });
                }
                this.depart$ = this.getDepartment("", this.departments);

            },
        );

        // START ANGULAR MAT SEARCH BANK
        this.banks = [];
        this.apiService.getBanksFront().subscribe(
            (data: Bank[]) => {
                this.banklist = data;
                for (var i in this.banklist) {
                    let get_id_bank = this.banklist[i]['id_bank'];
                    let get_bank = this.banklist[i]['bank'];
                    this.banks.push({ id_bank: get_id_bank, bank: get_bank });
                }
                this.bank$ = this.getBank("", this.banks);
            },
        );

        // START ANGULAR MAT SEARCH TYPE ACCOUNT
        this.typeaccounts = [];
        this.apiService.getTypeAccountFront().subscribe(
            (data: TypeAccount[]) => {
                this.typeaccountlist = data;
                for (var i in this.typeaccountlist) {
                    let get_id_typeaccount = this.typeaccountlist[i]['id_type_account'];
                    let get_typeaccount = this.typeaccountlist[i]['type_account'];
                    this.typeaccounts.push({ id_type_account: get_id_typeaccount, type_account: get_typeaccount });
                }
                this.account_type$ = this.getTypeAccount("", this.typeaccounts);
            },
        );
        // END ANGULAR MAT SEARCH TYPE ACCOUNT

        // START ANGULAR MAT SEARCH TYPE IDENTIFICATION
        this.identifiers = [];
        this.apiService.getTypreIdentifiersFront().subscribe(
            (data: Identifiers[]) => {
                this.identifierstlist = data;
                for (var i in this.identifierstlist) {
                    let get_id = this.identifierstlist[i]['id'];
                    let get_type_identifier = this.identifierstlist[i]['type_identifier'];
                    this.identifiers.push({ id: get_id, type_identifier: get_type_identifier });
                }
                this.identifier$ = this.getIdentifiers("", this.identifiers);
            },
        );
        // START ANGULAR MAT SEARCH TYPE IDENTIFICATION

        const token = localStorage.getItem('mr-token-front');
        if (token) {
            this.show = false;
            this.registerForm = this.formGroup.group({
                name: ['', [Validators.required]],
                second_name: ['', [Validators.required]],
                name_store: ['', [Validators.required]],
                name_legal: ['', [Validators.required]],
                phone: ['', [Validators.required]],
                mobile: ['', [Validators.required]],
                number_identifier: ['', [Validators.required]],
                neighborhood: ['', [Validators.required]],
                via: ['', [Validators.required]],
                number_streeth: ['', [Validators.required]],
                sn: ['', [Validators.required]],
                postal_code: ['', [Validators.required]],
                doc_identi: ['', [Validators.required]],
                rut: ['', [Validators.required]],
                cam_com: new FormControl('', [Validators.required]),
                responsible: ['', [Validators.required]],
                account_number: ['', [Validators.required]],
                bankCtrl: new FormControl('', [Validators.required]),
                typeaccountCtrl: new FormControl('', [Validators.required]),
                bank_certification: new FormControl('', [Validators.required]),
                check_legal_docs: new FormControl('', [(control) => {
                    return !control.value ? { 'required': true } : null;
                }]
                ),
                check_aprube_terms_conds: new FormControl('', [(control) => {
                    return !control.value ? { 'required': true } : null;
                }]
                ),
                categorystoreCtrl: new FormControl('', [Validators.required]),
                societytypeCtrl: new FormControl('', [Validators.required]),
                departamentCtrll: new FormControl('', [Validators.required]),
                citieCtrl: new FormControl('', [Validators.required]),
            });

        } else {
            this.show = true;
            this.registerForm = this.formGroup.group({
                name: ['', [Validators.required]],
                second_name: ['', [Validators.required]],
                email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
                password: ['', [Validators.required]],
                number_identifier_person: ['', [Validators.required]],
                identifiersCtrl: new FormControl('', [Validators.required]),
                name_store: ['', [Validators.required]],
                name_legal: ['', [Validators.required]],
                phone: ['', [Validators.required]],
                mobile: ['', [Validators.required]],
                number_identifier: ['', [Validators.required]],
                neighborhood: ['', [Validators.required]],
                via: ['', [Validators.required]],
                number_streeth: ['', [Validators.required]],
                sn: ['', [Validators.required]],
                postal_code: ['', [Validators.required]],
                doc_identi: ['', [Validators.required]],
                rut: ['', [Validators.required]],
                cam_com: new FormControl('', [Validators.required]),
                responsible: ['', [Validators.required]],
                account_number: ['', [Validators.required]],
                bankCtrl: new FormControl('', [Validators.required]),
                typeaccountCtrl: new FormControl('', [Validators.required]),
                bank_certification: new FormControl('', [Validators.required]),
                check_legal_docs: new FormControl('', [(control) => {
                    return !control.value ? { 'required': true } : null;
                }]
                ),
                check_aprube_terms_conds: new FormControl('', [(control) => {
                    return !control.value ? { 'required': true } : null;
                }]
                ),
                categorystoreCtrl: new FormControl('', [Validators.required]),
                societytypeCtrl: new FormControl('', [Validators.required]),
                departamentCtrll: new FormControl('', [Validators.required]),
                citieCtrl: new FormControl('', [Validators.required]),
            });
        }


    }

    getIdentifiers(term: string, algo:any): Observable<Identifiers[]> {
        let items = algo;
        if (term) {
            items = items.filter((x:any) => x.type_identifier.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
        }
        return of(items).pipe(delay(500));
    }


    getCategories(term: string, algo:any): Observable<CategoryStore[]> {
        let items = algo;
        if (term) {
            items = items.filter((x:any)  => x.name_category.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
        }
        return of(items).pipe(delay(500));
    }

    getSocietyType(term: string, algo:any): Observable<SocietyType[]> {
        let items = algo;
        if (term) {
            items = items.filter((x:any)  => x.society_type.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
        }
        return of(items).pipe(delay(500));
    }

    getDepartment(term: string, algo:any): Observable<Departament[]> {
        let items = algo;
        if (term) {
            items = items.filter((x:any)  => x.departament.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
        }
        return of(items).pipe(delay(500));
    }

    getCity(term: string, algo:any): Observable<City[]> {
        let items = algo;
        if (term) {
            items = items.filter((x:any)  => x.city.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
        }
        return of(items).pipe(delay(500));
    }

    getBank(term: string, algo:any): Observable<Bank[]> {
        let items = algo;
        if (term) {
            items = items.filter((x:any)  => x.bank.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
        }
        return of(items).pipe(delay(500));
    }

    getTypeAccount(term: string, algo:any): Observable<TypeAccount[]> {
        let items = algo;
        if (term) {
            items = items.filter((x:any)  => x.type_account.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
        }
        return of(items).pipe(delay(500));
    }


    citieChangeAction(departament:Departament) {
        // START ANGULAR MAT SEARCH CITIES
        let get_data_dep = departament;
        let id_dep = get_data_dep.id_departament;
        // console.log(id_dep);
        this.cities = [];
        this.apiService.getCitiesFrontbyDepartments(id_dep).subscribe(
            (data: City[]) => {
                this.citietlist = data;
                for (var i in this.citietlist) {
                    let get_id_citie = this.citietlist[i]['id_city'];
                    let get_citie = this.citietlist[i]['city'];
                    this.cities.push({ city: get_citie, id_city: get_id_citie });
                }
                this.city$ = this.getCity("", this.cities);
            },
        );
        // END ANGULAR MAT SEARCH CITIES
    }



    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    //START SET EVENT FROM DROPZONE COMPLEMENT
    selectFile(event:any) {
        let index = this.files_identifier_doc.length != event.addedFiles ? 0 : this.files_identifier_doc.length;
        console.log(this.files_identifier_doc.length);
        if (this.files_identifier_doc.length > 0) {
            //this.toastyService.error(this.toastIconMax);
        } else {
            event.addedFiles.map((item:any) => {
                this.onValidatePixels(item)
                    .then((value: any) => {
                        if (value) {
                            this.files_identifier_doc.push(item);
                        } else {
                            //this.toastyService.error(this.toastRejectPixelsImg);
                        }

                    });
            });

        }
    }

    selectFileRut(event:any) {
        let index = this.files_rut.length != event.addedFiles ? 0 : this.files_rut.length;
        console.log(this.files_rut.length);
        if (this.files_rut.length > 0) {
            //this.toastyService.error(this.toastIconMax);
        } else {
            event.addedFiles.map((item:any) => {
                this.onValidatePixels(item)
                    .then((value: any) => {
                        if (value) {
                            this.files_rut.push(item);
                        } else {
                            //this.toastyService.error(this.toastRejectPixelsImg);
                        }
                    });
            });

        }
    }

    selectFileCamcom(event:any) {
        let index = this.files_cam_com.length != event.addedFiles ? 0 : this.files_cam_com.length;
        console.log(this.files_cam_com.length);
        if (this.files_cam_com.length > 0) {
            //this.toastyService.error(this.toastIconMax);
        } else {
            event.addedFiles.map((item:any) => {
                this.onValidatePixels(item)
                    .then((value: any) => {
                        if (value) {
                            this.files_cam_com.push(item);
                        } else {
                            //this.toastyService.error(this.toastRejectPixelsImg);
                        }
                    });
            });

        }
    }


    onValidatePixels(file: File) {
        return new Promise((resolve, reject) => {
            const Img = new Image();
            Img.src = URL.createObjectURL(file);
            Img.onload = (e: any) => {
                console.log(e);
                const height = e.path[0].height;
                const width = e.path[0].width;
                if (height >= this.heightMin || width >= this.widthMin) {
                    resolve(true);
                }
                resolve(false);
            };
        });

    }

    onRemove(event:any) {
        console.log(event);
        this.files_identifier_doc.splice(this.files_identifier_doc.indexOf(event), 1);
    }


    onChangeDocIde(event: any) {
        if (event.target.files.length > 0) {
            this.doc_identi_docu = event.target.files[0];
        }
    }

    onChangeRut(event: any) {
        if (event.target.files.length > 0) {
            this.rut_docu = event.target.files[0];
        }
    }

    onChangeCamCom(event: any) {
        if (event.target.files.length > 0) {
            this.cam_com_docu = event.target.files[0];
        }
    }

    onChangeCertBank(event: any) {
        if (event.target.files.length > 0) {
            this.bank_certification_docu = event.target.files[0];
        }
    }

    membership_request() {

        this.validate_user = false
        if (this.registerForm.valid) {
            this.show_spinner = true;
            let registerForm = this.registerForm.value;

            let myObj_MemberShip:any;
            let email = "";
            if (this.show == true) {
                email = registerForm.email;
            } else {
                email = localStorage.getItem('user_email')!;
            }
            myObj_MemberShip = {
                "logo_store_up": "some_value",
                "name_store": registerForm.name_store,
                "name_legal": registerForm.name_legal,
                "address": registerForm.neighborhood + ' ' + registerForm.via + ' # ' + registerForm.number_streeth + ' - ' + registerForm.sn,
                "telephone": registerForm.phone,
                "mobile": registerForm.mobile,
                "email": email,
                "number_identifier": registerForm.number_identifier,
                "manager": registerForm.name + ' ' + registerForm.second_name,
                "state_store": 'false',
                "city": this.selectedCity,
                "description": '',
                "postal_code": registerForm.postal_code,
                "storecategories": this.selectedCategory,
                "societytype": this.selectedSociety
            };

            if (this.show == true) {

                this.apiService.ValidateUserExist(registerForm.email).subscribe(
                    (result:any) => {
                        console.log(result);
                        if (result == true) {
                            this.validate_user = true;
                            this.show_spinner = false;
                        } else {
                            this.apiService.setMembershipRequest(myObj_MemberShip).subscribe(
                                result => {
                                    let myJSON = JSON.stringify(result);
                                    let obj = JSON.parse(myJSON);
                                    let id_store = obj.id_store;

                                    const formDataDocIde = new FormData();
                                    formDataDocIde.append('url_document', this.doc_identi_docu);
                                    formDataDocIde.append('store', id_store);
                                    formDataDocIde.append('documenttype', '1');
                                    this.apiService.setLoadDocumentsStore(formDataDocIde).subscribe(
                                        result => {
                                            const formDataRut = new FormData();
                                            formDataRut.append('url_document', this.rut_docu);
                                            formDataRut.append('store', id_store);
                                            formDataRut.append('documenttype', '2');
                                            this.apiService.setLoadDocumentsStore(formDataRut).subscribe(
                                                result => {
                                                    const formData = new FormData();
                                                    formData.append('url_document', this.cam_com_docu);
                                                    formData.append('store', id_store);
                                                    formData.append('documenttype', '3');
                                                    this.apiService.setLoadDocumentsStore(formData).subscribe(
                                                        result => {
                                                            const formDataAccountBank = new FormData();
                                                            formDataAccountBank.append('certification_url', this.bank_certification_docu);
                                                            formDataAccountBank.append('account_number', registerForm.account_number);
                                                            formDataAccountBank.append('responsible', registerForm.responsible);
                                                            formDataAccountBank.append('bank', this.selectedBAnk);
                                                            formDataAccountBank.append('typeaccount', this.selectedAccountType);
                                                            formDataAccountBank.append('store', id_store);
                                                            formDataAccountBank.append('state', "false");
                                                            this.apiService.setBankAccountStore(formDataAccountBank).subscribe(
                                                                result => {
                                                                    // it's a user new so should be create a user register to set acces to client menu
                                                                    let myObj_user_client;
                                                                    let myObj_login;
                                                                    myObj_user_client = {
                                                                        "username": registerForm.email,
                                                                        "email": registerForm.email,
                                                                        "password": registerForm.password,
                                                                        "first_name": registerForm.name,
                                                                        "last_name": registerForm.second_name,
                                                                        "is_active": "true",
                                                                        "group_id": 2,
                                                                        "store": id_store,
                                                                        "type_user": 3,
                                                                        "type_identifier": this.selectIdentifiers,
                                                                        "number_identifier": registerForm.number_identifier_person,
                                                                        
                                                                    };
                                                                    this.apiService.sendEmailStoreCreationRequest(myObj_user_client).subscribe();
                                                                    this.apiService.registerUserFront(myObj_user_client).subscribe(
                                                                        result => {
                                                                            myObj_login = { "username": registerForm.email, "password": registerForm.password }
                                                                            this.apiService.loginUser(myObj_login).subscribe(
                                                                                (result_login: any) => {
                                                                                    let user_id = result_login["user_id"];
                                                                                    localStorage.setItem('mr-token-front', result_login.token);
                                                                                    localStorage.setItem('id_user_front', result_login.user_id);
                                                                                    localStorage.setItem('id_type_user', result_login.type_user);
                                                                                    localStorage.setItem('personal_name', result_login.personal_name);
                                                                                    localStorage.setItem('user_email', result_login.user_email);
                                                                                    localStorage.setItem('id-store', result_login.id_store);
                                                                                    this.router.navigate(['/sell/response']).then(() => {
                                                                                        this.show_spinner = false;
                                                                                        window.location.reload();
                                                                                    });
                                                                                },
                                                                                error => console.log(error)
                                                                            );
                                                                        },
                                                                        error => console.log(error)
                                                                    );
                                                                },
                                                                error => console.log(error)
                                                            );
                                                        },
                                                        error => console.log(error)
                                                    );
                                                },
                                                error => console.log(error)
                                            );
                                        },
                                        error => console.log(error)
                                    );
                                },
                                error => console.log(error)
                            );
                        }
                    },
                    (error:any) =>
                        console.log(error)
                );
            } else {
                this.apiService.setMembershipRequest(myObj_MemberShip).subscribe(
                    result => {
                        let myJSON = JSON.stringify(result);
                        let obj = JSON.parse(myJSON);
                        let id_store = obj.id_store;

                        const formDataDocIde = new FormData();
                        formDataDocIde.append('url_document', this.doc_identi_docu);
                        formDataDocIde.append('store', id_store);
                        formDataDocIde.append('documenttype', '1');
                        this.apiService.setLoadDocumentsStore(formDataDocIde).subscribe(
                            result => {
                                const formDataRut = new FormData();
                                formDataRut.append('url_document', this.rut_docu);
                                formDataRut.append('store', id_store);
                                formDataRut.append('documenttype', '2');
                                this.apiService.setLoadDocumentsStore(formDataRut).subscribe(
                                    result => {
                                        const formData = new FormData();
                                        formData.append('url_document', this.cam_com_docu);
                                        formData.append('store', id_store);
                                        formData.append('documenttype', '3');
                                        this.apiService.setLoadDocumentsStore(formData).subscribe(
                                            result => {
                                                const formDataAccountBank = new FormData();
                                                formDataAccountBank.append('certification_url', this.bank_certification_docu);
                                                formDataAccountBank.append('account_number', registerForm.account_number);
                                                formDataAccountBank.append('responsible', registerForm.responsible);
                                                formDataAccountBank.append('bank', this.selectedBAnk);
                                                formDataAccountBank.append('typeaccount', this.selectedAccountType);
                                                formDataAccountBank.append('store', id_store);
                                                formDataAccountBank.append('state', "false");
                                                this.apiService.setBankAccountStore(formDataAccountBank).subscribe(
                                                    result => {
                                                        const id_user_front = localStorage.getItem('id_user_front');
                                                        let myObj_user_store = {
                                                            "store": id_store
                                                        };
                                                        this.apiService.updateStoreUserFront(myObj_user_store, id_user_front!).subscribe(
                                                            result => {
                                                                let myJSON = JSON.stringify(result);
                                                                let obj = JSON.parse(myJSON);
                                                                let id_store = obj.result.store;
                                                                localStorage.setItem('id-store', id_store);
                                                                this.router.navigate(['/sell/response']).then(() => {
                                                                    window.location.reload();
                                                                });
                                                            },
                                                            error => console.log(error)
                                                        );

                                                    },
                                                    error => console.log(error)
                                                );
                                            },
                                            error => console.log(error)
                                        );
                                    },
                                    error => console.log(error)
                                );
                            },
                            error => console.log(error)
                        );
                    },
                    error => console.log(error)
                );
            }

        } else {
            console.log("fails");
            for (let i in this.registerForm.controls) {
                this.registerForm.controls[i].markAsTouched();
            }
        }
    }
}
