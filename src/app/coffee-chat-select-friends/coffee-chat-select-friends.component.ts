import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-coffee-chat-select-friends',
  templateUrl: './coffee-chat-select-friends.component.html',
  styleUrls: ['./coffee-chat-select-friends.component.css'],
})
export class CoffeeChatSelectFriendsComponent implements OnInit {
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
