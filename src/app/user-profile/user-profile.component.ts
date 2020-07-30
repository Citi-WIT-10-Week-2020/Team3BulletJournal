import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, AlertService } from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  currentUser: any;
  returnUrl: any;
  registerForm: FormGroup;
  loading: boolean;
  submitted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    this.currentUser = this.authenticationService.currentUserValue[0];
    console.log(this.currentUser.firstName);
     }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    var status = "Pending";
    var host = 'false';
    console.log(this.currentUser.zoomLink)
    this.registerForm = this.formBuilder.group({
        firstName: [this.currentUser.firstName],
        lastName: [this.currentUser.lastName],
        zoomLink: [this.currentUser.zoomLink],
        role: [this.currentUser.role],
        bio: [this.currentUser.bio],
        hobbies: [this.currentUser.hobbies],
        email: [this.currentUser.email, [Validators.required, Validators.email]],

    });
  }

  get f() { return this.registerForm.controls; }

  removeUser(user){
    this.authenticationService.deleteUser(user._id)
    .subscribe(
      data => {
        console.log(data);
        console.log('USER DELETED');
        this.authenticationService.logout();
        this.returnUrl = '/';
        this.router.navigate([this.returnUrl]);          

      }
      );
  }

  logout(){
    console.log('in logout')
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

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
    console.log(this.currentUser._id)
    this.loading = true;
    this.authenticationService.updateUser(this.currentUser._id, this.registerForm.value)
        .subscribe(
            data => {
                //this.alertService.success('Registration successful', true);
                console.log(data)
                localStorage.setItem('needReload', "true");
                this.logout();

                
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
}

 

}
