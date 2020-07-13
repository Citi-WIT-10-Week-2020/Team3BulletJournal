import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, AlertService } from '../_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-journal-prompt',
  templateUrl: './journal-prompt.component.html',
  styleUrls: ['./journal-prompt.component.css']
})
export class JournalPromptComponent implements OnInit {
  currentUser: any;
  journalForm: FormGroup;
  returnUrl: any;
  submitted: boolean;
  loading = false;

  prompts = [
    {title: 'Accomplishment', text: 'What is your greatest accomplishment?'}, 
    {title: 'Role Model', text: 'Describe someone you look up to and why.'},
    {title: 'Extra Time', text: 'If you had 2 extra hours every day, how would you spend them?'},
    {title: 'Dream Vacation', text: 'Describe your dream vacation.'},
    {title: 'Smile', text: 'List all the things that made you smile today.'}
  ]
  promptIndexSelected: any;
title: any;
  constructor(
    private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
  ) {
    this.currentUser = this.authenticationService.currentUserValue[0];
    var promptIndexSelected = Math.random() * (this.prompts.length - 1);
    console.log(promptIndexSelected);
    var promptUsed = this.prompts[Math.round(promptIndexSelected)].text;
  }
  ngOnInit(): void {
    var d = new Date();
    var promptIndexSelected = Math.random() * (this.prompts.length - 1);
    var date = d.getUTCDate();
    var month = d.getUTCMonth() + 1;
    var year = d.getUTCFullYear();
    var title = this.prompts[Math.round(promptIndexSelected)].text;// change when actual prompts are added by creating form group on front end

    this.journalForm = this.formBuilder.group({
        username: [this.currentUser.username],
        title: [title],
        day: [date],
        month: [month],
        year: [year],
        textEntry: ['', Validators.required]
        
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

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

export class PromptsRepo {
  prompts = [
    {title: 'Accomplishment', text: 'What is your greatest accomplishment?'}, 
    {title: 'Role Model', text: 'Describe someone you look up to and why.'},
    {title: 'Extra Time', text: 'If you had 2 extra hours every day, how would you spend them?'},
    {title: 'Dream Vacation', text: 'Describe your dream vacation.'},
    {title: 'Smile', text: 'List all the things that made you smile today.'}
  ]
}

