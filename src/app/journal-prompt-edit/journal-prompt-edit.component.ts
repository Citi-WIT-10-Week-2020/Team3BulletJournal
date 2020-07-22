
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService, AlertService } from '../_services'
import { ThrowStmt } from '@angular/compiler';
import { HttpResponse } from '@angular/common/http';
import { getLocaleDateFormat } from '@angular/common';
import { DatePipe } from '@angular/common';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-journal-prompt-edit',
  templateUrl: './journal-prompt-edit.component.html',
  styleUrls: ['./journal-prompt-edit.component.css'],
  providers: [DatePipe]
})
export class JournalPromptEditComponent implements OnInit {
  currentUser: any;
  journalForm: FormGroup;
  returnUrl: any;
  submitted: boolean;
  promptIndexSelected: any;
  promptUsed: any;
  loading = false;
  pipe = new DatePipe('en-US');
  now = Date.now();

  currentDate = this.pipe.transform(this.now, 'MMM dd, yyyy')

  prompts = [
    {title: 'Accomplishment', text: 'What is your greatest accomplishment?'}, 
    {title: 'Role Model', text: 'Describe someone you look up to and why.'},
    {title: 'Extra Time', text: 'If you had 2 extra hours every day, how would you spend them?'},
    {title: 'Dream Vacation', text: 'Describe your dream vacation.'},
    {title: 'Smile', text: 'List all the things that made you smile today.'},
    {title: 'Secret', text: 'What is something that you have never told anyone?'},
    {title: 'Superpower', text: 'If you could have one superpower, what would it be and why?'},
    {title: 'Gratitude', text: 'Make a list of things that you are grateful for today.'},
    {title: 'Childhood', text: 'What is something from your childhood that everyone should experience as a child?'},
    {title: 'Positive Event', text: 'Describe one positive event that happened today.'}
  ]
  title: { title: string; text: string; };
  currentJournal: any;

  constructor(
    private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService ) 
  {
    this.currentUser = this.authenticationService.currentUserValue[0];
    this.currentJournal = this.authenticationService.currentJournalValue;
    var promptIndexSelected = Math.random() * (this.prompts.length - 1);
    console.log(this.currentJournal.username)
    this.title = this.prompts[Math.round(promptIndexSelected)];
  }
  ngOnInit(): void {
    if (!localStorage.getItem('autoLoad')) { 
      localStorage.setItem('autoLoad', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('autoLoad') 
    }
    var d = new Date();
    var promptIndexSelected = Math.random() * (this.prompts.length - 1);
    var date = d.getUTCDate();
    var month = d.getUTCMonth() + 1;
    var year = d.getUTCFullYear();
    console.log(this.currentJournal)
    this.journalForm = this.formBuilder.group({
        username: [this.currentUser.username],
        title: [this.currentJournal.title],
        day: [date],
        month: [month],
        year: [year],
        textEntry:[this.currentJournal.text, Validators.required],
        type: ['prompt']
        
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/journal';

  }

  get f() { return this.journalForm.controls; }

  onSubmit() {
      this.submitted = true;
      //console.log(this.journalForm.controls.day.value);
      console.log(this.f.textEntry.value)
      // reset alerts on submit
      this.alertService.clear();
      
      console.log('valid')
      this.loading = true;
      
        this.authenticationService.updatePromptJournal(this.currentJournal._id, this.currentJournal.title, this.f.textEntry.value)
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


