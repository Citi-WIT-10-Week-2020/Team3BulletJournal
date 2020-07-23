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
  indicesOfSelected = [];
  selectedPeopleList = [];
  createMeeting: FormGroup;
  submitted = false;
  loading = false;
  numAvailableFriends;
  goodIndex = true;
  host;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService) 
  {
    this.currentUser = this.authenticationService.currentUserValue[0];
    this.numAvailableFriends = this.currentUser.friends.length;

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
    this.host = this.currentUser.username
    this.createMeeting = this.formBuilder.group({
      numPeople: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
    })

     
  }
  
  // convenience getter for easy access to form fields
  get f() { return this.createMeeting.controls; }

  onSubmit() {

    //randomize people based on numPeople in group
    var count = 0;
    while(count < this.f.numPeople.value){
      this.index = Math.floor(Math.random() * this.numAvailableFriends);
      if(this.indicesOfSelected.length == 0){
        this.indicesOfSelected[0] = this.index
      }
      else{
        for(var i = 0; i < this.indicesOfSelected.length; i++){
          if(this.indicesOfSelected[i] == this.index){
            this.goodIndex = false;
            break;
          }
        }
        if(this.goodIndex == true){
          this.indicesOfSelected[count] = this.index;
          count++;
        }
        this.goodIndex = true;
      }
    }

      console.log(this.indicesOfSelected);

      for(var i = 0; i < this.indicesOfSelected.length; i++){
        this.selectedPeopleList[i] = this.currentUser.friends[this.indicesOfSelected[i]];
      }

    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.createMeeting.invalid || this.numAvailableFriends <= 0) {
        return;
    }
    this.loading = true;
    this.authenticationService.createMeeting(this.currentUser.username, this.selectedPeopleList, this.f.date.value.substring(8,10), this.f.date.value.substring(5,7), this.f.date.value.substring(0,4), this.f.time.value, this.host) 
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
            }


          }
        
                       },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
}


}
