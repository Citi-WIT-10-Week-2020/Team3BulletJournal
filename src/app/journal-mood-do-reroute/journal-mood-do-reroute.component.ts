import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService, AlertService } from '../_services';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-journal-mood-do-reroute',
  templateUrl: './journal-mood-do-reroute.component.html',
  styleUrls: ['./journal-mood-do-reroute.component.css'],
  providers: [DatePipe]
})
export class JournalMoodDoRerouteComponent implements OnInit {
  currentUser: any;
  journalForm: FormGroup;
  returnUrl: any;
  submitted: boolean;
  loading = false;
  pipe = new DatePipe('en-US');
  now = Date.now();
  currentMood: any;

  currentDate = this.pipe.transform(this.now, 'MMM dd, yyyy')


  constructor(
    private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService ) {
    this.currentUser = this.authenticationService.currentUserValue[0];
    this.currentMood = this.authenticationService.currentMoodValue;

   }

   ngOnInit() {
    var d = new Date();
    var date = d.getUTCDate();
    var month = d.getUTCMonth() + 1;
    var year = d.getUTCFullYear();
    var title = this.currentMood.mood;


    this.journalForm = this.formBuilder.group({
        username: [this.currentUser.username],
        day: [date],
        month: [month],
        year: [year],
        title: [title],
        textEntry: ['', Validators.required],
        type: ['free-write']
        
    });


    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/journal';
}

// convenience getter for easy access to form fields
get f() { return this.journalForm.controls; }

onSubmit() {
    this.submitted = true;
    console.log(this.journalForm.controls.day.value);

    // reset alerts on submit
    this.alertService.clear();
    
    console.log('valid')
    this.loading = true;
    
      this.authenticationService.saveJournal(this.f.username.value, this.f.title.value, '', this.f.day.value, this.f.month.value, this.f.year.value, this.f.textEntry.value, this.f.type.value)
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
