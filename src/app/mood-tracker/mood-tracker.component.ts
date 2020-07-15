import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, AlertService } from '../_services';
import { FormBuilder, Validators } from '@angular/forms';
import { NavButtonsHomeComponent } from '../nav-buttons-home/nav-buttons-home.component';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-mood-tracker',
  templateUrl: './mood-tracker.component.html',
  styleUrls: ['./mood-tracker.component.css']
})
export class MoodTrackerComponent implements OnInit {

  submitted: boolean;
  loading: boolean;
  returnUrl: any;
  currentUser: any;
  validJournal: Array<String>;
  anxietyForm: any;
  excitedForm: any;
  confusedForm: any;
  happyForm: any;
  sadForm: any;
  currentMood: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    this.currentUser = this.authenticationService.currentUserValue[0];
    this.validJournal = this.validJournal;
   
   }
  ngOnInit(): void {
    var d = new Date();

    var date = d.getUTCDate();
    var month = d.getUTCMonth() + 1;
    var year = d.getUTCFullYear();

    this.anxietyForm = this.formBuilder.group({
      username: [this.currentUser.username],
      mood: ["anxious"],
      day: [date],
      month: [month],
      year: [year]

    });

    this.excitedForm = this.formBuilder.group({
      username: [this.currentUser.username],
      mood: ["excited"],
      day: [date],
      month: [month],
      year: [year]

    });

    this.confusedForm = this.formBuilder.group({
      username: [this.currentUser.username],
      mood: ["confused"],
      day: [date],
      month: [month],
      year: [year]

    });

    this.happyForm = this.formBuilder.group({
      username: [this.currentUser.username],
      mood: ["happy"],
      day: [date],
      month: [month],
      year: [year]

    });

    this.sadForm = this.formBuilder.group({
      username: [this.currentUser.username],
      mood: ["sad"],
      day: [date],
      month: [month],
      year: [year]

    });

  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/mood-chosen';

  }

  get f() { return this.anxietyForm.controls; }
  get h() { return this.excitedForm.controls; }
  get i() { return this.confusedForm.controls; }
  get j() { return this.happyForm.controls; }
  get k() { return this.sadForm.controls; }


  onSubmit(){

  }

  onSubmitAnxiety() {
    this.submitted = true;
    console.log('submitted');
    // reset alerts on submit
    this.alertService.clear();
    
    
    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //     return;
    // }

    //console.log(this.f.username.value);
    this.loading = true;
    this.validJournal = [];
    this.authenticationService.saveMood(this.f.username.value, this.f.mood.value, this.f.day.value, this.f.month.value, this.f.year.value)
          .pipe(first())
              .subscribe(
                data => {
                  console.log('inside subscribe')
                  this.router.navigate([this.returnUrl]);          
                },
                error => {
                     this.alertService.error(error);
                     this.loading = false;
       });
          
}

onSubmitExcited() {
  this.submitted = true;
  console.log('submitted');
  // reset alerts on submit
  this.alertService.clear();
  
  
  // stop here if form is invalid
  // if (this.loginForm.invalid) {
  //     return;
  // }

  //console.log(this.f.username.value);
  this.loading = true;
  this.validJournal = [];
  this.authenticationService.saveMood(this.h.username.value, this.h.mood.value, this.h.day.value, this.h.month.value, this.h.year.value)
        .pipe(first())
            .subscribe(
              data => {
                console.log('inside subscribe')
                this.router.navigate([this.returnUrl]);          
              },
              error => {
                   this.alertService.error(error);
                   this.loading = false;
     });
        
}

onSubmitConfused() {
  this.submitted = true;
  console.log('submitted');
  // reset alerts on submit
  this.alertService.clear();
  
  
  // stop here if form is invalid
  // if (this.loginForm.invalid) {
  //     return;
  // }

  //console.log(this.f.username.value);
  this.loading = true;
  this.validJournal = [];
  this.authenticationService.saveMood(this.i.username.value, this.i.mood.value, this.i.day.value, this.i.month.value, this.i.year.value)
        .pipe(first())
            .subscribe(
              data => {
                console.log('inside subscribe')
                this.router.navigate([this.returnUrl]);          
              },
              error => {
                   this.alertService.error(error);
                   this.loading = false;
     });
        
}

onSubmitHappy() {
  this.submitted = true;
  console.log('submitted');
  // reset alerts on submit
  this.alertService.clear();
  
  
  // stop here if form is invalid
  // if (this.loginForm.invalid) {
  //     return;
  // }

  //console.log(this.f.username.value);
  this.loading = true;
  this.validJournal = [];
  this.authenticationService.saveMood(this.j.username.value, this.j.mood.value, this.j.day.value, this.j.month.value, this.j.year.value)
        .pipe(first())
            .subscribe(
              data => {
                console.log('inside subscribe')
                this.router.navigate([this.returnUrl]);          
              },
              error => {
                   this.alertService.error(error);
                   this.loading = false;
     });
        
}

onSubmitSad() {
  this.submitted = true;
  console.log('submitted');
  // reset alerts on submit
  this.alertService.clear();
  
  
  // stop here if form is invalid
  // if (this.loginForm.invalid) {
  //     return;
  // }

  //console.log(this.f.username.value);
  this.loading = true;
  this.validJournal = [];
  this.authenticationService.saveMood(this.k.username.value, this.k.mood.value, this.k.day.value, this.k.month.value, this.k.year.value)
        .pipe(first())
            .subscribe(
              data => {
                console.log('inside subscribe')
                this.router.navigate([this.returnUrl]);          
              },
              error => {
                   this.alertService.error(error);
                   this.loading = false;
     });
        
}
}
