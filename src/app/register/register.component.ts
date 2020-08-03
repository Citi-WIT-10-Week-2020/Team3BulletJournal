import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService, AuthenticationService, AlertService } from '../_services';

@Component({ templateUrl: 'register.component.html',
            styleUrls: ['register.component.css'] })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    profilePictures = ['../assets/images/creek.jpg', '../assets/images/dog.jpg', '../assets/images/road.jpg', '../assets/images/trees.jpg' ]
    userProfile = '';
    

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    userSelect(picture){
        if(this.userProfile !== picture){ 
          this.userProfile = picture;
        }
        else{
            this.userProfile = '../assets/images/default.jpg'
        }
      }

    ngOnInit() {
        var status = "Pending";
        var host = 'false';
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            zoomLink: ['', Validators.required],
            role: ['', Validators.required],
            bio: ['', Validators.required],
            hobbies: ['', Validators.required],
            profilePicture: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            email: ['', [Validators.required, Validators.email]],
            status: [status],
            hostBool: [host]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        console.log('in')
        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            console.log('he');
            return;
        }

        this.loading = true;
        this.authenticationService.register(this.registerForm.value)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login'], { queryParams: { registered: true }});
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}