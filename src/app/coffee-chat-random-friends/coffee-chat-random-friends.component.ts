import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService, AlertService, AuthenticationService } from '../_services';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-coffee-chat-random-friends',
  templateUrl: './coffee-chat-random-friends.component.html',
  styleUrls: ['./coffee-chat-random-friends.component.css']
})
export class CoffeeChatRandomFriendsComponent implements OnInit {
  currentUser: any;
  numberList;
  index;
  friendIndex;
  indicesOfSelected = [];
  selectedPeopleList = [];
  createRandomMeeting: FormGroup;
  submitted = false;
  loading = false;
  numAvailableFriends;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService) 
  {
    this.currentUser = this.authenticationService.currentUserValue[0];
    this.numAvailableFriends = this.currentUser.friends.length;
    console.log(this.numAvailableFriends);

    switch(this.numAvailableFriends){
      case 0:
        this.numberList = [];
        break;
      case 1:
        this.numberList = [1];
        break;
      case 2:
        this.numberList = [1, 2];
        break;
      case 3:
        this.numberList = [1, 2, 3];
        break;
      case 4:
        this.numberList = [1, 2, 3, 4];
        break;
      default:
        this.numberList = [1, 2, 3, 4, 5];
    }
   }
  
   ngOnInit(){

    var status = "pending";

    this.createRandomMeeting = this.formBuilder.group({
      numPeople: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      status: [status]
    })

  }
  
  // convenience getter for easy access to form fields
  get f() { return this.createRandomMeeting.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.createRandomMeeting.invalid || this.numAvailableFriends <= 0) {
        return;
    }
    this.loading = true;
    console.log(this.f.numPeople.value);
    this.authenticationService.createRandomMeeting(this.currentUser.username, this.f.numPeople.value, this.f.date.value.substring(8,10), this.f.date.value.substring(5,7), this.f.date.value.substring(0,4), this.f.time.value, this.f.status.value) 
    .subscribe(
            data => {
              this.alertService.success('Random Meeting Scheduled', true);
              this.router.navigate(['/coffee-chat-profiles'], { queryParams: { scheduled: true }});
              console.log(data);
              this.loading = false;
              //look into querying data
              for (let user of data){
                  if(user.username == this.currentUser.username){
                      console.log('Yay we found it');
                      this.loading = false;
                //randomize people based on numPeople in group
                //create random indices
              for(var i = 0; i < this.f.numPeople.value; i++){
                this.index = Math.floor(Math.random() * this.numAvailableFriends);
                for(var j = 0; j < this.indicesOfSelected.length; j++){
                  if(this.index != this.indicesOfSelected[j]){
                    this.indicesOfSelected[i] = this.index;
                  }
                }
              }

              console.log(this.indicesOfSelected.length);

              for(var i = 0; i < this.indicesOfSelected.length; i++){
                this.friendIndex = this.indicesOfSelected[i];
                this.selectedPeopleList[i] = this.currentUser.friends[this.friendIndex].value;
              }
            }
          }
  
                       },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
}


}
