import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-commonsignin',
  templateUrl: './commonsignin.component.html',
  styleUrls: ['./commonsignin.component.css']
})
export class CommonsigninComponent implements OnInit {

  public show: boolean = false;
    loginfrontForm!: FormGroup;
    emailPattern: string = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$";
    id_user: any;

    constructor(
        public formBuilder: FormBuilder,
        private router: Router,
        private apiService: ApiService,
    ) { }

    ngOnInit() {

        this.loginfrontForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
            password: ['', [Validators.required]],
        });
        const token_front = localStorage.getItem('mr-token-front');
        if (token_front) {
            this.router.navigate(['/checkout/payment']);

        } else {
            this.router.navigate(['/session/signin']);
        }


    }

    login_front() {
        if (this.loginfrontForm.valid) {
            this.show = false;            
            this.apiService.loginUser(this.loginfrontForm.value).subscribe(
                (result: any) => {                     
                    this.show = false;
                    localStorage.setItem('mr-token-front', result.token);
                    localStorage.setItem('id_type_user', result.type_user);
                    localStorage.setItem('id_user_front', result.user_id);                    
                    localStorage.setItem('id-store', result.id_store);
                    localStorage.setItem('personal_name', result.personal_name);                  
                    localStorage.setItem('user_email', result.user_email);                  
                    if(result.type_user == '2'){
                        localStorage.setItem('mr-token', result.token);
                        localStorage.setItem('id-store', result.id_store);
                        localStorage.setItem('id-user', result.user_id);
                        this.router.navigate(['/account/store_adm/edit']).then(() => {
                            window.location.reload();
                        });
                    }  
                    if(result.type_user == '3'){
                        localStorage.setItem('mr-token', result.token);
                        localStorage.setItem('id-store', result.id_store);
                        localStorage.setItem('id-user', result.user_id);
                        this.router.navigate(['/sell/response']).then(() => {
                            window.location.reload();
                        });
                    }                                         

                    // this.router.navigate(['/checkout/payment']).then(() => {
                    //     window.location.reload();
                    // });
                },
                error => {
                    this.show = true;
                    console.log(error)
                }
            );

        
        } else {
            for (let i in this.loginfrontForm.controls) {
                this.loginfrontForm.controls[i].markAsTouched();
            }
        }

    }

}
