import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-journal-prompt',
  templateUrl: './journal-prompt.component.html',
  styleUrls: ['./journal-prompt.component.css']
})
export class JournalPromptComponent implements OnInit {

  constructor() { }

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

