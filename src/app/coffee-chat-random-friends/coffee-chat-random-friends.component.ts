import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coffee-chat-random-friends',
  templateUrl: './coffee-chat-random-friends.component.html',
  styleUrls: ['./coffee-chat-random-friends.component.css']
})
export class CoffeeChatRandomFriendsComponent implements OnInit {

  currentUser: any;
  numberList;
  index;
  indicesOfSelected = [];
  selectedPeopleList = [];
  createMeeting: FormGroup;
  submitted = false;
  loading = false;
  numAvailableFriends;
  goodIndex = true;
  host;

  peopleList = [];
  dropdownSettings= {};
  

   ngOnInit(){
    this.host = this.currentUser.username
    this.createMeeting = this.formBuilder.group({
      numPeople: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
    })


  }

  onPersonSelect(person: any){
    console.log(person);
  }

  onSelectAll(persons: any){
    console.log(persons);
  }

}