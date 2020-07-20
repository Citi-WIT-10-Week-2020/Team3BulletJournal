import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, AlertService } from '../_services';

@Component({
  selector: 'app-mood-chosen',
  templateUrl: './mood-chosen.component.html',
  styleUrls: ['./mood-chosen.component.css']
})
export class MoodChosenComponent implements OnInit {
  currentUser: any;
  validJournal: any;
  currentMood: any;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    this.currentUser = this.authenticationService.currentUserValue[0];
    this.validJournal = this.validJournal;
    this.currentMood = this.authenticationService.currentMoodValue;

  }

  ngOnInit(): void {

    if (!localStorage.getItem('autoLoad')) { 
      localStorage.setItem('autoLoad', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('autoLoad') 
    }
    
  }

}
