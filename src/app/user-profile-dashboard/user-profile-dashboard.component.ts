import { Component, OnInit } from '@angular/core';
import { AuthenticationService, AlertService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-user-profile-dashboard',
  templateUrl: './user-profile-dashboard.component.html',
  styleUrls: ['./user-profile-dashboard.component.css']
})
export class UserProfileDashboardComponent implements OnInit {
  submitted: boolean;
  loginForm: any;
  loading: boolean;
  returnUrl: any;
  currentUser: any;
  validJournal: Array<String>;
  entries: any[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    this.currentUser = this.authenticationService.currentUserValue[0];
    this.validJournal = this.validJournal;
    this.entries = this.entries;


     }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      
      selectedDate: ['', Validators.required]
  });

  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log('submitted');
    // reset alerts on submit
    this.alertService.clear();
    
    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //     return;
    // }

    //console.log(this.f.username.value);
    console.log(this.f.selectedDate.value);
    this.loading = true;
    this.validJournal = [];
    this.authenticationService.getAllJournals()
        //.pipe(first())
        .subscribe(
            data => {
                //this.router.navigate([this.returnUrl]);
                console.log(data);
                this.loading = false;
                let found = false;
                //look into querying data
                for (let user of data){
                  //console.log(this.f.selectedDate.value.substring(0,5));
                    if(user.username == this.currentUser.username){
                        console.log('Yay we found it');
                        this.loading = false;

                        if(user.year == this.f.selectedDate.value.substring(0,4)){
                          if(user.day == this.f.selectedDate.value.substring(8,10)){
                            if(user.month == this.f.selectedDate.value.substring(5,7) || user.month == this.f.selectedDate.value.substring(6,7)){
                              this.validJournal.push(user);
                              found = true;
                            }
                          }
                        }
                        
                    }
                }
                if(found == false){
                    console.log("No user found :(");
                    this.loading = false;
                    this.alertService.error("No entries under that date found");
                }

                for(let user of this.validJournal){
                  console.log('made it')
                  console.log(user)
                }
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
            console.log('outside')

          
}
}
