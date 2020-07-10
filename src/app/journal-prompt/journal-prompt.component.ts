import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-journal-prompt',
  templateUrl: './journal-prompt.component.html',
  styleUrls: ['./journal-prompt.component.css']
})
export class JournalPromptComponent implements OnInit {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.currentUserValue[0]
   }
  ngOnInit(): void {
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

