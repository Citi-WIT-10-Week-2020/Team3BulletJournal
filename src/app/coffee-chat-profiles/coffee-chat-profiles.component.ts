import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService, AlertService, AuthenticationService } from '../_services';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-coffee-chat-profiles',
  templateUrl: './coffee-chat-profiles.component.html',
  styleUrls: ['./coffee-chat-profiles.component.css']
})
export class CoffeeChatProfilesComponent implements OnInit {
  meetingID: string;
  meetings = [];
  currentUser: any;
  peopleList = [];
  currentMeeting: any;
  startZoomURL = "https://success.zoom.us/wc/join/";
  zoomUrl: string;
  zoomLink: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
    ) 
  {
    this.currentUser = this.authenticationService.currentUserValue[0];
    this.meetingID = this.authenticationService.currentMeetingValue;
    
   }

   ngOnInit(){
    this.peopleList = this.currentUser.friends;
    this.onSubmit();
  }

  onSubmit() {
    console.log("reached");
    // reset alerts on submit
    this.alertService.clear();
    this.meetings =[];
    this.authenticationService.getAllMeetings()
        .subscribe(
            meetingData => {
                console.log(meetingData);
                let found = false;

                for(let user of meetingData){
                  if(user._id == this.meetingID){
                    this.currentMeeting = user;
                  }                  
                }
                this.authenticationService.getAllUsers()
                .subscribe(
                  userData => {
                    console.log(userData);
                    let found = false;

                    for(let user of userData){
                      if(this.currentMeeting.host == user.username){
                        this.zoomLink = "7876137554";
                        console.log(this.currentMeeting.host);
                        console.log(this.zoomLink);
                        this.zoomUrl = this.startZoomURL.concat(this.zoomLink);
                        console.log("zoomUrl:" + this.zoomUrl);

                      }
                    }
                  }
                );
                if(found == false){ 
                    console.log("No meetings found :(");
                    this.alertService.error("No scheduled meetings");
                }

            },
            error => {
                this.alertService.error(error);
            });
            console.log('outside');
  }

}
