import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService, AlertService } from '../_services'
import { ThrowStmt } from '@angular/compiler';
import { HttpResponse } from '@angular/common/http';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-journal-free-write',
  templateUrl: './journal-free-write.component.html',
  styleUrls: ['./journal-free-write.component.css']
})
export class JournalFreeWriteComponent implements OnInit {
  currentUser: any;
  journalForm: FormGroup;
  returnUrl: any;
  submitted: boolean;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService ) {
    this.currentUser = this.authenticationService.currentUserValue[0];
   }
   ngOnInit() {
    var d = new Date();

    var date = d.getUTCDate();
    var month = d.getUTCMonth() + 1;
    var year = d.getUTCFullYear();
    var title = "Free Write";

    this.journalForm = this.formBuilder.group({
        username: [this.currentUser.username],
        title: [title],
        day: [date],
        month: [month],
        year: [year],
        textEntry: ['', Validators.required],
        
    });

    console.log(this.journalForm.controls.day.value);

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}

// convenience getter for easy access to form fields
get f() { return this.journalForm.controls; }

onSubmit() {
    this.submitted = true;
    console.log(this.journalForm.controls.day.value);
    // reset alerts on submit
    this.alertService.clear();
    
    // if (this.journalForm.invalid) {
    //     return;
    // }

    console.log('valid')
    this.loading = true;
    
      this.authenticationService.saveJournal(this.f.username.value, this.f.title.value, this.f.day.value, this.f.month.value, this.f.year.value, this.f.textEntry.value)
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
