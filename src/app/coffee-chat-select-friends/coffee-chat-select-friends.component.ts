import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-coffee-chat-select-friends',
  templateUrl: './coffee-chat-select-friends.component.html',
  styleUrls: ['./coffee-chat-select-friends.component.css'],
})
export class CoffeeChatSelectFriendsComponent implements OnInit {
  peopleList = [];

  createMeeting: FormGroup;
  submitted = false;
  loading = false;
  selectedPeople = [];
  maxCapacity = false;
  host;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService) 
  {
    this.currentUser = this.authenticationService.currentUserValue[0];
   }
​
   ngOnInit(){
    this.host = this.currentUser.username;
    this.peopleList = this.currentUser.friends;
    this.createMeeting = this.formBuilder.group({

  }

  onPersonSelect(person: any){
    console.log(person);
  }

  onSelectAll(persons: any){
    console.log(persons);
  }

}