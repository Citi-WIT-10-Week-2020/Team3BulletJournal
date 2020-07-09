import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-coffee-chat-random-friends',
  templateUrl: './coffee-chat-random-friends.component.html',
  styleUrls: ['./coffee-chat-random-friends.component.css']
})
export class CoffeeChatRandomFriendsComponent implements OnInit {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.currentUserValue[0]
   }
  peopleList = [];
  dropdownSettings= {};
  
  ngOnInit(): void {

    this.peopleList = [ //can add database community here later!!! and enforce max 5 people per chat
      { person_id: 1, person_name: 'Emily'},
      { person_id: 2, person_name: 'Shannon'},
      { person_id: 3, person_name: 'Katie'},
      { person_id: 4, person_name: 'Millie'},
      { person_id: 5, person_name: 'Jordan'},
      { person_id: 6, person_name: 'Michelle'},
      { person_id: 7, person_name: 'Duy'},
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'person_id',
      textField: 'person_name',
      selectAllText: 'Select All',
      UnselectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: false
    };

  }

  onPersonSelect(person: any){
    console.log(person);
  }

  onSelectAll(persons: any){
    console.log(persons);
  }

}
