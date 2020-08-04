import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService, AlertService, AuthenticationService } from '../_services';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-coffee-chat-select-friends',
  templateUrl: './coffee-chat-select-friends.component.html',
  styleUrls: ['./coffee-chat-select-friends.component.css'],
})
​
export class CoffeeChatSelectFriendsComponent implements OnInit {
  currentUser: any;
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
    this.host = this.currentUser.username
   }
​
   ngOnInit(){
    this.peopleList = this.currentUser.friends;
   
    this.createMeeting = this.formBuilder.group({

      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      title: ['', Validators.required]
    })
  }


  userSelect(person){
    if(this.selectedPeople.includes(person.username)){ //deselect
      this.selectedPeople = this.selectedPeople.filter(p => p !== person.username)
    }
    else{
      this.selectedPeople.push(person);
    }

    if(this.selectedPeople.length >= 5){
      console.log(this.maxCapacity);
      this.maxCapacity = true;
    }
    else{
      this.maxCapacity = false;
    }
    console.log(this.selectedPeople);
    console.log(this.maxCapacity);
  }

  // convenience getter for easy access to form fields
  get f() { return this.createMeeting.controls; }
  
  onSubmit() {

    this.submitted = true;
    console.log("in on SUBMIT")
    // reset alerts on submit
    this.alertService.clear();
    // stop here if form is invalid
    // if (this.createMeeting.invalid) {
    //     return;
    // }
​
    this.loading = true;
    this.authenticationService.createMeeting(this.currentUser.username, this.selectedPeople, this.f.date.value.substring(8,10), this.f.date.value.substring(5,7), this.f.date.value.substring(0,4), this.f.startTime.value, this.f.endTime.value, this.f.title.value, this.host)
        .subscribe(
            data => {
                this.alertService.success('Meeting Scheduled', true);
                this.router.navigate(['/coffee-chat-pending-meetings'], { queryParams: { scheduled: true }});
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });

            console.log("got through");
}
}
