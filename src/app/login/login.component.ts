import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService, AlertService } from '../_services'
import { ThrowStmt } from '@angular/compiler';
import { HttpResponse } from '@angular/common/http';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();
        
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        console.log(this.f.username.value);
        this.loading = true;
        this.authenticationService.getAllUsers()
            //.pipe(first())
            .subscribe(
                data => {
                    //this.router.navigate([this.returnUrl]);
                    console.log(data);
                    this.loading = false;
                    let found = false;
                    //look into querying data
                    for (let user of data){
                        if(user.username == this.f.username.value){
                            console.log('Yay we found it');
                            found = true;
                            this.loading = false;
                            
                            this.authenticationService.login(this.f.username.value, this.f.password.value)
                                //.pipe(first())
                                    .subscribe(
                                        data => {
                                            this.router.navigate([this.returnUrl]);
                                            
                                         },
                                        error => {
                                            this.alertService.error(error);
                                            this.loading = false;
                                });
                        }
                    }
                    if(found == false){
                        console.log("No user found :(");
                        this.loading = false;
                        this.alertService.error("Username or password is incorrect");
                    }
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });

                
    }
}