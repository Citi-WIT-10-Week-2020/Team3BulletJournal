import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, AlertService } from '../_services';
import { Validators, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-coffee-chat-pending-meetings',
  templateUrl: './coffee-chat-pending-meetings.component.html',
  styleUrls: ['./coffee-chat-pending-meetings.component.css']
})
export class CoffeeChatPendingMeetingsComponent implements OnInit {
  submitted: boolean;
  loading: boolean;
  returnUrl: any;
  currentUser: any;
  hostingMeetings: any[];
  attendingMeetings: any[];
  selectedMeetings: any[]; //before filtering for attending meetings upcoming dates
  currentMeeting: any;
  meetingID: string;
  participantsEmailList: any[];
  timeZoneOffset = ((new Date().getTimezoneOffset()));
  sTime; //startTime without delimiter (:)
  eTime; //endTime without delimiter (:)
  time: any[];
  currentEndTimeHour: any;
  currentEndTimeMinutes: any;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    this.currentUser = this.authenticationService.currentUserValue[0];
    
     }
     
  ngOnInit(): void {
    this.currentMeeting = {participants: this.currentUser.friends};
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/coffee-chat-upcoming-meetings';
    this.onSubmit();
  }

  updateTimeVariables(meeting){
    this.sTime = meeting.startTime.replace(":","");
    this.eTime = meeting.endTime.replace(":",""); 
  }

  getParticipantEmails(meeting){
    this.participantsEmailList = [];
    for(var i = 0; i < meeting.participants.length; i++){
      this.participantsEmailList[i] = {'email': meeting.participants[i].email};
    }
    console.log("email list");
    console.log(this.participantsEmailList);
  }

  getMeeting(meeting){
    console.log("got meeting");
    this.currentMeeting = meeting;
  }

  sendMeeting(currentMeeting){
    this.meetingID = currentMeeting._id;
    localStorage.setItem('currentMeeting', JSON.stringify(this.meetingID));
  
  }

  deleteMeeting(meeting){
    this.authenticationService.deleteMeeting(meeting._id)
    .subscribe(
      data => {
        console.log(data);
        this.returnUrl = '/coffee-chat-upcoming-meetings';
        this.router.navigate([this.returnUrl]);          

      }
      );

  }

  acceptMeeting(meeting){
    console.log ("accepted");
    var index;
      for(var i = 0; i < meeting.participants.length; i++){
        if(meeting.participants[i].username == this.currentUser.username){
          index = i;
          break;
        }
      }

    console.log("index:" + index);
    this.authenticationService.acceptMeeting(meeting, index)
    .pipe(first())
    .subscribe(
      data => {
          this.router.navigate([this.returnUrl]);
          
       },
      error => {
          this.alertService.error(error);
          this.loading = false;
});
  }
  declineMeeting(meeting){
    var index;
      for(var i = 0; i < meeting.participants.length; i++){
        if(meeting.participants[i].username == this.currentUser.username){
          index = i;
          break;
        }
      }

    console.log("index:" + index);
    this.authenticationService.declineMeeting(meeting, index)
    .pipe(first())
    .subscribe(
      data => {
          this.router.navigate([this.returnUrl]);
          
       },
      error => {
          this.alertService.error(error);
          this.loading = false;
});

  }

  onSubmit() {
    this.submitted = true;
    console.log('submitted');

    // reset alerts on submit
    this.alertService.clear();
    
  
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    var hour = date.getHours();
    var minutes = date.getMinutes();

    this.loading = true;
    this.selectedMeetings = [];
    this.hostingMeetings = [];
    this.attendingMeetings =[];
    this.authenticationService.getAllMeetings()
        .subscribe(
            data => {
                console.log(data);
                this.loading = false;
                let found = false;

                for (let user of data){
                  console.log(user.startTime);

                  for(var i = 0; i < user.participants.length; i++){
                    if(user.participants[i].username == this.currentUser.username){
                      if(user.participants[i].status == "Pending"){
                        console.log("status:" + user.participants[i].status);
                        this.selectedMeetings.push(user);
                        break;
                      } 
                    }
                  }
                }
                //look into querying data
                for (let user of data){
                  this.time = user.endTime.split(':', 2);
                  this.currentEndTimeHour = this.time[0];
                  this.currentEndTimeMinutes = this.time[1];

                  if(!isNaN(Number(this.currentEndTimeHour))){
                    this.currentEndTimeHour = Number(this.currentEndTimeHour) - (this.timeZoneOffset / 60);
                    if(this.currentEndTimeHour < 0 || this.currentEndTimeHour > 24){
                      if(this.currentEndTimeHour < 0){
                        if(user.day != 1){
                          user.day = user.day - 1;
                          user.hour = 24 + this.currentEndTimeHour;
                        }
                        else{//equals 1 so go to end of previous month
                          if(user.month === 1 && user.day === 1){
                            user.month = 12;
                            user.day = 31;
                            user.year = user.year - 1;
                            user.hour = 24 + this.currentEndTimeHour;
                          }
                          else if((user.year) % 4 === 0){ //leap year
                            if(user.month === 3){
                              user.day = 29;
                              user.month = 2;
                              user.hour = 24 + this.currentEndTimeHour;
                            }
                            else if(user.month === 2 || user.month === 6 || user.month === 8 || user.month === 9 || user.month === 11){
                              user.month = user.month - 1;
                              user.day = 31;
                              user.hour = 24 + this.currentEndTimeHour;
                            }
                            else{
                              user.month = user.month - 1;
                              user.day = 30;
                              user.hour = 24 + this.currentEndTimeHour;
                            }
                          }
                          else{ //normal year
                            if(user.month === 3){
                              user.day = 28;
                              user.month = 2;
                              user.hour = 24 + this.currentEndTimeHour;
                            }
                            else if(user.month === 2 || user.month === 4 || user.month === 6 || user.month === 8 || user.month === 9 || user.month === 11){
                              user.month = user.month - 1;
                              user.day = 31;
                              user.hour = 24 + this.currentEndTimeHour;
                            }
                            else{
                              user.month = user.month - 1;
                              user.day = 30;
                              user.hour = 24 + this.currentEndTimeHour;
                            }
                          }
                        }
                      }
                      else{ // greater than 24
                        if(user.month === 12 && user.day === 31){
                          user.year = user.year + 1;
                          user.day = 1;
                          user.month = 1;
                          user.hour = this.currentEndTimeHour - 24;
                        }
                        else if(user.year % 4 === 0){//leap year
                          if(month === 2 && user.day != 29){
                            user.day = user.day + 1;
                            user.hour = this.currentEndTimeHour - 24;
                          }
                          else if(user.month === 1 || user.month === 3 || user.month === 5 || user.month === 7 || user.month === 8 || user.month === 10){
                            if(user.day === 31){
                              user.day = 1;
                              user.month = user.month + 1;
                              user.hour = this.currentEndTimeHour - 24;
                            }
                            else{
                              user.day = user.day + 1;
                              user.hour = this.currentEndTimeHour - 24;
                            }
                          }
                          else{
                            if(user.day === 30){
                              user.day = 1;
                              user.month = user.month + 1;
                              user.hour = this.currentEndTimeHour - 24;
                            }
                            else{
                              user.day = user.day + 1;
                              user.hour = this.currentEndTimeHour - 24;
                            }
                          }
                        }
                        else{ //normal year
                          if(month === 2 && user.day != 28){
                            user.day = user.day + 1;
                            user.hour = this.currentEndTimeHour - 24;
                          }
                          else if(user.month === 1 || user.month === 3 || user.month === 5 || user.month === 7 || user.month === 8 || user.month === 10){
                            if(user.day === 31){
                              user.day = 1;
                              user.month = user.month + 1;
                              user.hour = this.currentEndTimeHour - 24;
                            }
                            else{
                              user.day = user.day + 1;
                              user.hour = this.currentEndTimeHour - 24;
                            }
                          }
                          else{
                            if(user.day === 30){
                              user.day = 1;
                              user.month = user.month + 1;
                              user.hour = this.currentEndTimeHour - 24;
                            }
                            else{
                              user.day = user.day + 1;
                              user.hour = this.currentEndTimeHour - 24;
                            }
                          }
                        }
                      }
                    }
                  }
                  
             
                  //hostingMeetings
                    if(user.username == this.currentUser.username){
                      if (user.year == year){
                        if(user.month == month){
                          if(user.day == day){
                            if(this.currentEndTimeHour == hour){
                              if(this.currentEndTimeMinutes >= minutes){
                                this.loading = false;
                                this.time = user.startTime.split(':', 2);
                                var startHour = this.time[0];
                                var startMinutes = this.time[1];
                                if(!isNaN(Number(startHour))){
                                  startHour = Number(startHour) - (this.timeZoneOffset / 60);
                                  if(startHour < 0 || startHour > 24){
                                    if(startHour < 0){
                                      if(user.day != 1){
                                        user.day = user.day - 1;
                                        user.hour = 24 + startHour;
                                      }
                                      else{//equals 1 so go to end of previous month
                                        if(user.month === 1 && user.day === 1){
                                          user.month = 12;
                                          user.day = 31;
                                          user.year = user.year - 1;
                                          user.hour = 24 + startHour;
                                        }
                                        else if((user.year) % 4 === 0){ //leap year
                                          if(user.month === 3){
                                            user.day = 29;
                                            user.month = 2;
                                            user.hour = 24 + startHour;
                                          }
                                          else if(user.month === 2 || user.month === 6 || user.month === 8 || user.month === 9 || user.month === 11){
                                            user.month = user.month - 1;
                                            user.day = 31;
                                            user.hour = 24 + startHour;
                                          }
                                          else{
                                            user.month = user.month - 1;
                                            user.day = 30;
                                            user.hour = 24 + startHour;
                                          }
                                        }
                                        else{ //normal year
                                          if(user.month === 3){
                                            user.day = 28;
                                            user.month = 2;
                                            user.hour = 24 + startHour;
                                          }
                                          else if(user.month === 2 || user.month === 4 || user.month === 6 || user.month === 8 || user.month === 9 || user.month === 11){
                                            user.month = user.month - 1;
                                            user.day = 31;
                                            user.hour = 24 + startHour;
                                          }
                                          else{
                                            user.month = user.month - 1;
                                            user.day = 30;
                                            user.hour = 24 + startHour;
                                          }
                                        }
                                      }
                                    }
                                    else{ // greater than 24
                                      if(user.month === 12 && user.day === 31){
                                        user.year = user.year + 1;
                                        user.day = 1;
                                        user.month = 1;
                                        user.hour = startHour - 24;
                                      }
                                      else if(user.year % 4 === 0){//leap year
                                        if(month === 2 && user.day != 29){
                                          user.day = user.day + 1;
                                          user.hour = startHour - 24;
                                        }
                                        else if(user.month === 1 || user.month === 3 || user.month === 5 || user.month === 7 || user.month === 8 || user.month === 10){
                                          if(user.day === 31){
                                            user.day = 1;
                                            user.month = user.month + 1;
                                            user.hour = startHour - 24;
                                          }
                                          else{
                                            user.day = user.day + 1;
                                            user.hour = startHour - 24;
                                          }
                                        }
                                        else{
                                          if(user.day === 30){
                                            user.day = 1;
                                            user.month = user.month + 1;
                                            user.hour = startHour - 24;
                                          }
                                          else{
                                            user.day = user.day + 1;
                                            user.hour = startHour - 24;
                                          }
                                        }
                                      }
                                      else{ //normal year
                                        if(month === 2 && user.day != 28){
                                          user.day = user.day + 1;
                                          user.hour = startHour - 24;
                                        }
                                        else if(user.month === 1 || user.month === 3 || user.month === 5 || user.month === 7 || user.month === 8 || user.month === 10){
                                          if(user.day === 31){
                                            user.day = 1;
                                            user.month = user.month + 1;
                                            user.hour = startHour - 24;
                                          }
                                          else{
                                            user.day = user.day + 1;
                                            user.hour = startHour - 24;
                                          }
                                        }
                                        else{
                                          if(user.day === 30){
                                            user.day = 1;
                                            user.month = user.month + 1;
                                            user.hour = startHour - 24;
                                          }
                                          else{
                                            user.day = user.day + 1;
                                            user.hour = startHour - 24;
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                                user.startTime = String(startHour) + ":" + String(startMinutes);
                                user.endTime = String(this.currentEndTimeHour) + ":" + String(this.currentEndTimeMinutes);
                                this.hostingMeetings.push(user);
                                found = true;
                              }
                            }
                            if(this.currentEndTimeHour > hour){
                              this.loading = false;
                              this.time = user.startTime.split(':', 2);
                              var startHour = this.time[0];
                              var startMinutes = this.time[1];
                              if(!isNaN(Number(startHour))){
                                startHour = Number(startHour) - (this.timeZoneOffset / 60);
                                if(startHour < 0 || startHour > 24){
                                  if(startHour < 0){
                                    if(user.day != 1){
                                      user.day = user.day - 1;
                                      user.hour = 24 + startHour;
                                    }
                                    else{//equals 1 so go to end of previous month
                                      if(user.month === 1 && user.day === 1){
                                        user.month = 12;
                                        user.day = 31;
                                        user.year = user.year - 1;
                                        user.hour = 24 + startHour;
                                      }
                                      else if((user.year) % 4 === 0){ //leap year
                                        if(user.month === 3){
                                          user.day = 29;
                                          user.month = 2;
                                          user.hour = 24 + startHour;
                                        }
                                        else if(user.month === 2 || user.month === 6 || user.month === 8 || user.month === 9 || user.month === 11){
                                          user.month = user.month - 1;
                                          user.day = 31;
                                          user.hour = 24 + startHour;
                                        }
                                        else{
                                          user.month = user.month - 1;
                                          user.day = 30;
                                          user.hour = 24 + startHour;
                                        }
                                      }
                                      else{ //normal year
                                        if(user.month === 3){
                                          user.day = 28;
                                          user.month = 2;
                                          user.hour = 24 + startHour;
                                        }
                                        else if(user.month === 2 || user.month === 4 || user.month === 6 || user.month === 8 || user.month === 9 || user.month === 11){
                                          user.month = user.month - 1;
                                          user.day = 31;
                                          user.hour = 24 + startHour;
                                        }
                                        else{
                                          user.month = user.month - 1;
                                          user.day = 30;
                                          user.hour = 24 + startHour;
                                        }
                                      }
                                    }
                                  }
                                  else{ // greater than 24
                                    if(user.month === 12 && user.day === 31){
                                      user.year = user.year + 1;
                                      user.day = 1;
                                      user.month = 1;
                                      user.hour = startHour - 24;
                                    }
                                    else if(user.year % 4 === 0){//leap year
                                      if(month === 2 && user.day != 29){
                                        user.day = user.day + 1;
                                        user.hour = startHour - 24;
                                      }
                                      else if(user.month === 1 || user.month === 3 || user.month === 5 || user.month === 7 || user.month === 8 || user.month === 10){
                                        if(user.day === 31){
                                          user.day = 1;
                                          user.month = user.month + 1;
                                          user.hour = startHour - 24;
                                        }
                                        else{
                                          user.day = user.day + 1;
                                          user.hour = startHour - 24;
                                        }
                                      }
                                      else{
                                        if(user.day === 30){
                                          user.day = 1;
                                          user.month = user.month + 1;
                                          user.hour = startHour - 24;
                                        }
                                        else{
                                          user.day = user.day + 1;
                                          user.hour = startHour - 24;
                                        }
                                      }
                                    }
                                    else{ //normal year
                                      if(month === 2 && user.day != 28){
                                        user.day = user.day + 1;
                                        user.hour = startHour - 24;
                                      }
                                      else if(user.month === 1 || user.month === 3 || user.month === 5 || user.month === 7 || user.month === 8 || user.month === 10){
                                        if(user.day === 31){
                                          user.day = 1;
                                          user.month = user.month + 1;
                                          user.hour = startHour - 24;
                                        }
                                        else{
                                          user.day = user.day + 1;
                                          user.hour = startHour - 24;
                                        }
                                      }
                                      else{
                                        if(user.day === 30){
                                          user.day = 1;
                                          user.month = user.month + 1;
                                          user.hour = startHour - 24;
                                        }
                                        else{
                                          user.day = user.day + 1;
                                          user.hour = startHour - 24;
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                              user.startTime = String(startHour) + ":" + String(startMinutes);
                              user.endTime = String(this.currentEndTimeHour) + ":" + String(this.currentEndTimeMinutes);
                              this.hostingMeetings.push(user);
                              found = true;
                            }
                          }
                          if (user.day > day){
                              this.loading = false;
                              this.time = user.startTime.split(':', 2);
                              var startHour = this.time[0];
                              var startMinutes = this.time[1];
                              if(!isNaN(Number(startHour))){
                                startHour = Number(startHour) - (this.timeZoneOffset / 60);
                                if(startHour < 0 || startHour > 24){
                                  if(startHour < 0){
                                    if(user.day != 1){
                                      user.day = user.day - 1;
                                      user.hour = 24 + startHour;
                                    }
                                    else{//equals 1 so go to end of previous month
                                      if(user.month === 1 && user.day === 1){
                                        user.month = 12;
                                        user.day = 31;
                                        user.year = user.year - 1;
                                        user.hour = 24 + startHour;
                                      }
                                      else if((user.year) % 4 === 0){ //leap year
                                        if(user.month === 3){
                                          user.day = 29;
                                          user.month = 2;
                                          user.hour = 24 + startHour;
                                        }
                                        else if(user.month === 2 || user.month === 6 || user.month === 8 || user.month === 9 || user.month === 11){
                                          user.month = user.month - 1;
                                          user.day = 31;
                                          user.hour = 24 + startHour;
                                        }
                                        else{
                                          user.month = user.month - 1;
                                          user.day = 30;
                                          user.hour = 24 + startHour;
                                        }
                                      }
                                      else{ //normal year
                                        if(user.month === 3){
                                          user.day = 28;
                                          user.month = 2;
                                          user.hour = 24 + startHour;
                                        }
                                        else if(user.month === 2 || user.month === 4 || user.month === 6 || user.month === 8 || user.month === 9 || user.month === 11){
                                          user.month = user.month - 1;
                                          user.day = 31;
                                          user.hour = 24 + startHour;
                                        }
                                        else{
                                          user.month = user.month - 1;
                                          user.day = 30;
                                          user.hour = 24 + startHour;
                                        }
                                      }
                                    }
                                  }
                                  else{ // greater than 24
                                    if(user.month === 12 && user.day === 31){
                                      user.year = user.year + 1;
                                      user.day = 1;
                                      user.month = 1;
                                      user.hour = startHour - 24;
                                    }
                                    else if(user.year % 4 === 0){//leap year
                                      if(month === 2 && user.day != 29){
                                        user.day = user.day + 1;
                                        user.hour = startHour - 24;
                                      }
                                      else if(user.month === 1 || user.month === 3 || user.month === 5 || user.month === 7 || user.month === 8 || user.month === 10){
                                        if(user.day === 31){
                                          user.day = 1;
                                          user.month = user.month + 1;
                                          user.hour = startHour - 24;
                                        }
                                        else{
                                          user.day = user.day + 1;
                                          user.hour = startHour - 24;
                                        }
                                      }
                                      else{
                                        if(user.day === 30){
                                          user.day = 1;
                                          user.month = user.month + 1;
                                          user.hour = startHour - 24;
                                        }
                                        else{
                                          user.day = user.day + 1;
                                          user.hour = startHour - 24;
                                        }
                                      }
                                    }
                                    else{ //normal year
                                      if(month === 2 && user.day != 28){
                                        user.day = user.day + 1;
                                        user.hour = startHour - 24;
                                      }
                                      else if(user.month === 1 || user.month === 3 || user.month === 5 || user.month === 7 || user.month === 8 || user.month === 10){
                                        if(user.day === 31){
                                          user.day = 1;
                                          user.month = user.month + 1;
                                          user.hour = startHour - 24;
                                        }
                                        else{
                                          user.day = user.day + 1;
                                          user.hour = startHour - 24;
                                        }
                                      }
                                      else{
                                        if(user.day === 30){
                                          user.day = 1;
                                          user.month = user.month + 1;
                                          user.hour = startHour - 24;
                                        }
                                        else{
                                          user.day = user.day + 1;
                                          user.hour = startHour - 24;
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                              user.startTime = String(startHour) + ":" + String(startMinutes);
                              user.endTime = String(this.currentEndTimeHour) + ":" + String(this.currentEndTimeMinutes);
                              this.hostingMeetings.push(user);
                              found = true;
                          }

                        }
                        if(user.month > month){
                          console.log('greater month');
                              this.loading = false;
                              this.time = user.startTime.split(':', 2);
                                var startHour = this.time[0];
                                var startMinutes = this.time[1];
                                if(!isNaN(Number(startHour))){
                                  startHour = Number(startHour) - (this.timeZoneOffset / 60);
                                  if(startHour < 0 || startHour > 24){
                                    if(startHour < 0){
                                      if(user.day != 1){
                                        user.day = user.day - 1;
                                        user.hour = 24 + startHour;
                                      }
                                      else{//equals 1 so go to end of previous month
                                        if(user.month === 1 && user.day === 1){
                                          user.month = 12;
                                          user.day = 31;
                                          user.year = user.year - 1;
                                          user.hour = 24 + startHour;
                                        }
                                        else if((user.year) % 4 === 0){ //leap year
                                          if(user.month === 3){
                                            user.day = 29;
                                            user.month = 2;
                                            user.hour = 24 + startHour;
                                          }
                                          else if(user.month === 2 || user.month === 6 || user.month === 8 || user.month === 9 || user.month === 11){
                                            user.month = user.month - 1;
                                            user.day = 31;
                                            user.hour = 24 + startHour;
                                          }
                                          else{
                                            user.month = user.month - 1;
                                            user.day = 30;
                                            user.hour = 24 + startHour;
                                          }
                                        }
                                        else{ //normal year
                                          if(user.month === 3){
                                            user.day = 28;
                                            user.month = 2;
                                            user.hour = 24 + startHour;
                                          }
                                          else if(user.month === 2 || user.month === 4 || user.month === 6 || user.month === 8 || user.month === 9 || user.month === 11){
                                            user.month = user.month - 1;
                                            user.day = 31;
                                            user.hour = 24 + startHour;
                                          }
                                          else{
                                            user.month = user.month - 1;
                                            user.day = 30;
                                            user.hour = 24 + startHour;
                                          }
                                        }
                                      }
                                    }
                                    else{ // greater than 24
                                      if(user.month === 12 && user.day === 31){
                                        user.year = user.year + 1;
                                        user.day = 1;
                                        user.month = 1;
                                        user.hour = startHour - 24;
                                      }
                                      else if(user.year % 4 === 0){//leap year
                                        if(month === 2 && user.day != 29){
                                          user.day = user.day + 1;
                                          user.hour = startHour - 24;
                                        }
                                        else if(user.month === 1 || user.month === 3 || user.month === 5 || user.month === 7 || user.month === 8 || user.month === 10){
                                          if(user.day === 31){
                                            user.day = 1;
                                            user.month = user.month + 1;
                                            user.hour = startHour - 24;
                                          }
                                          else{
                                            user.day = user.day + 1;
                                            user.hour = startHour - 24;
                                          }
                                        }
                                        else{
                                          if(user.day === 30){
                                            user.day = 1;
                                            user.month = user.month + 1;
                                            user.hour = startHour - 24;
                                          }
                                          else{
                                            user.day = user.day + 1;
                                            user.hour = startHour - 24;
                                          }
                                        }
                                      }
                                      else{ //normal year
                                        if(month === 2 && user.day != 28){
                                          user.day = user.day + 1;
                                          user.hour = startHour - 24;
                                        }
                                        else if(user.month === 1 || user.month === 3 || user.month === 5 || user.month === 7 || user.month === 8 || user.month === 10){
                                          if(user.day === 31){
                                            user.day = 1;
                                            user.month = user.month + 1;
                                            user.hour = startHour - 24;
                                          }
                                          else{
                                            user.day = user.day + 1;
                                            user.hour = startHour - 24;
                                          }
                                        }
                                        else{
                                          if(user.day === 30){
                                            user.day = 1;
                                            user.month = user.month + 1;
                                            user.hour = startHour - 24;
                                          }
                                          else{
                                            user.day = user.day + 1;
                                            user.hour = startHour - 24;
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                                user.startTime = String(startHour) + ":" + String(startMinutes);
                                user.endTime = String(this.currentEndTimeHour) + ":" + String(this.currentEndTimeMinutes);
                              this.hostingMeetings.push(user);
                              found = true;
                        }
                      }
                        
                      if(user.year > year){
                        console.log('greater year');
                              this.loading = false;
                              this.time = user.startTime.split(':', 2);
                                var startHour = this.time[0];
                                var startMinutes = this.time[1];
                                if(!isNaN(Number(startHour))){
                                  startHour = Number(startHour) - (this.timeZoneOffset / 60);
                                  if(startHour < 0 || startHour > 24){
                                    if(startHour < 0){
                                      if(user.day != 1){
                                        user.day = user.day - 1;
                                        user.hour = 24 + startHour;
                                      }
                                      else{//equals 1 so go to end of previous month
                                        if(user.month === 1 && user.day === 1){
                                          user.month = 12;
                                          user.day = 31;
                                          user.year = user.year - 1;
                                          user.hour = 24 + startHour;
                                        }
                                        else if((user.year) % 4 === 0){ //leap year
                                          if(user.month === 3){
                                            user.day = 29;
                                            user.month = 2;
                                            user.hour = 24 + startHour;
                                          }
                                          else if(user.month === 2 || user.month === 6 || user.month === 8 || user.month === 9 || user.month === 11){
                                            user.month = user.month - 1;
                                            user.day = 31;
                                            user.hour = 24 + startHour;
                                          }
                                          else{
                                            user.month = user.month - 1;
                                            user.day = 30;
                                            user.hour = 24 + startHour;
                                          }
                                        }
                                        else{ //normal year
                                          if(user.month === 3){
                                            user.day = 28;
                                            user.month = 2;
                                            user.hour = 24 + startHour;
                                          }
                                          else if(user.month === 2 || user.month === 4 || user.month === 6 || user.month === 8 || user.month === 9 || user.month === 11){
                                            user.month = user.month - 1;
                                            user.day = 31;
                                            user.hour = 24 + startHour;
                                          }
                                          else{
                                            user.month = user.month - 1;
                                            user.day = 30;
                                            user.hour = 24 + startHour;
                                          }
                                        }
                                      }
                                    }
                                    else{ // greater than 24
                                      if(user.month === 12 && user.day === 31){
                                        user.year = user.year + 1;
                                        user.day = 1;
                                        user.month = 1;
                                        user.hour = startHour - 24;
                                      }
                                      else if(user.year % 4 === 0){//leap year
                                        if(month === 2 && user.day != 29){
                                          user.day = user.day + 1;
                                          user.hour = startHour - 24;
                                        }
                                        else if(user.month === 1 || user.month === 3 || user.month === 5 || user.month === 7 || user.month === 8 || user.month === 10){
                                          if(user.day === 31){
                                            user.day = 1;
                                            user.month = user.month + 1;
                                            user.hour = startHour - 24;
                                          }
                                          else{
                                            user.day = user.day + 1;
                                            user.hour = startHour - 24;
                                          }
                                        }
                                        else{
                                          if(user.day === 30){
                                            user.day = 1;
                                            user.month = user.month + 1;
                                            user.hour = startHour - 24;
                                          }
                                          else{
                                            user.day = user.day + 1;
                                            user.hour = startHour - 24;
                                          }
                                        }
                                      }
                                      else{ //normal year
                                        if(month === 2 && user.day != 28){
                                          user.day = user.day + 1;
                                          user.hour = startHour - 24;
                                        }
                                        else if(user.month === 1 || user.month === 3 || user.month === 5 || user.month === 7 || user.month === 8 || user.month === 10){
                                          if(user.day === 31){
                                            user.day = 1;
                                            user.month = user.month + 1;
                                            user.hour = startHour - 24;
                                          }
                                          else{
                                            user.day = user.day + 1;
                                            user.hour = startHour - 24;
                                          }
                                        }
                                        else{
                                          if(user.day === 30){
                                            user.day = 1;
                                            user.month = user.month + 1;
                                            user.hour = startHour - 24;
                                          }
                                          else{
                                            user.day = user.day + 1;
                                            user.hour = startHour - 24;
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                                user.startTime = String(startHour) + ":" + String(startMinutes);
                                user.endTime = String(this.currentEndTimeHour) + ":" + String(this.currentEndTimeMinutes);
                              this.hostingMeetings.push(user);
                              found = true;
                        }
                    }
                  }
                    //attendingMeetings
                    for(var i = 0; i < this.selectedMeetings.length; i++){
                      this.time = this.selectedMeetings[i].endTime.split(':', 2);
                      this.currentEndTimeHour = this.time[0];
                      this.currentEndTimeMinutes = this.time[1];

                      if(!isNaN(Number(this.currentEndTimeHour))){
                        this.currentEndTimeHour = Number(this.currentEndTimeHour) - (this.timeZoneOffset / 60);
                        if(this.currentEndTimeHour < 0 || this.currentEndTimeHour > 24){
                          if(this.currentEndTimeHour < 0){
                            if(this.selectedMeetings[i].day != 1){
                              this.selectedMeetings[i].day = this.selectedMeetings[i].day - 1;
                              this.selectedMeetings[i].hour = 24 + this.currentEndTimeHour;
                            }
                            else{//equals 1 so go to end of previous month
                              if(this.selectedMeetings[i].month === 1 && this.selectedMeetings[i].day === 1){
                                this.selectedMeetings[i].month = 12;
                                this.selectedMeetings[i].day = 31;
                                this.selectedMeetings[i].year = this.selectedMeetings[i].year - 1;
                                this.selectedMeetings[i].hour = 24 + this.currentEndTimeHour;
                              }
                              else if((this.selectedMeetings[i].year) % 4 === 0){ //leap year
                                if(this.selectedMeetings[i].month === 3){
                                  this.selectedMeetings[i].day = 29;
                                  this.selectedMeetings[i].month = 2;
                                  this.selectedMeetings[i].hour = 24 + this.currentEndTimeHour;
                                }
                                else if(this.selectedMeetings[i].month === 2 || this.selectedMeetings[i].month === 6 || this.selectedMeetings[i].month === 8 || this.selectedMeetings[i].month === 9 || this.selectedMeetings[i].month === 11){
                                  this.selectedMeetings[i].month = this.selectedMeetings[i].month - 1;
                                  this.selectedMeetings[i].day = 31;
                                  this.selectedMeetings[i].hour = 24 + this.currentEndTimeHour;
                                }
                                else{
                                  this.selectedMeetings[i].month = this.selectedMeetings[i].month - 1;
                                  this.selectedMeetings[i].day = 30;
                                  this.selectedMeetings[i].hour = 24 + this.currentEndTimeHour;
                                }
                              }
                              else{ //normal year
                                if(this.selectedMeetings[i].month === 3){
                                  this.selectedMeetings[i].day = 28;
                                  this.selectedMeetings[i].month = 2;
                                  this.selectedMeetings[i].hour = 24 + this.currentEndTimeHour;
                                }
                                else if(this.selectedMeetings[i].month === 2 || this.selectedMeetings[i].month === 4 || this.selectedMeetings[i].month === 6 || this.selectedMeetings[i].month === 8 || this.selectedMeetings[i].month === 9 || this.selectedMeetings[i].month === 11){
                                  this.selectedMeetings[i].month = this.selectedMeetings[i].month - 1;
                                  this.selectedMeetings[i].day = 31;
                                  this.selectedMeetings[i].hour = 24 + this.currentEndTimeHour;
                                }
                                else{
                                  this.selectedMeetings[i].month = this.selectedMeetings[i].month - 1;
                                  this.selectedMeetings[i].day = 30;
                                  this.selectedMeetings[i].hour = 24 + this.currentEndTimeHour;
                                }
                              }
                            }
                          }
                          else{ // greater than 24
                            if(this.selectedMeetings[i].month === 12 && this.selectedMeetings[i].day === 31){
                              this.selectedMeetings[i].year = this.selectedMeetings[i].year + 1;
                              this.selectedMeetings[i].day = 1;
                              this.selectedMeetings[i].month = 1;
                              this.selectedMeetings[i].hour = this.currentEndTimeHour - 24;
                            }
                            else if(this.selectedMeetings[i].year % 4 === 0){//leap year
                              if(month === 2 && this.selectedMeetings[i].day != 29){
                                this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                this.selectedMeetings[i].hour = this.currentEndTimeHour - 24;
                              }
                              else if(this.selectedMeetings[i].month === 1 || this.selectedMeetings[i].month === 3 || this.selectedMeetings[i].month === 5 || this.selectedMeetings[i].month === 7 || this.selectedMeetings[i].month === 8 || this.selectedMeetings[i].month === 10){
                                if(this.selectedMeetings[i].day === 31){
                                  this.selectedMeetings[i].day = 1;
                                  this.selectedMeetings[i].month = this.selectedMeetings[i].month + 1;
                                  this.selectedMeetings[i].hour = this.currentEndTimeHour - 24;
                                }
                                else{
                                  this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                  this.selectedMeetings[i].hour = this.currentEndTimeHour - 24;
                                }
                              }
                              else{
                                if(this.selectedMeetings[i].day === 30){
                                  this.selectedMeetings[i].day = 1;
                                  this.selectedMeetings[i].month = this.selectedMeetings[i].month + 1;
                                  this.selectedMeetings[i].hour = this.currentEndTimeHour - 24;
                                }
                                else{
                                  this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                  this.selectedMeetings[i].hour = this.currentEndTimeHour - 24;
                                }
                              }
                            }
                            else{ //normal year
                              if(month === 2 && this.selectedMeetings[i].day != 28){
                                this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                this.selectedMeetings[i].hour = this.currentEndTimeHour - 24;
                              }
                              else if(this.selectedMeetings[i].month === 1 || this.selectedMeetings[i].month === 3 || this.selectedMeetings[i].month === 5 || this.selectedMeetings[i].month === 7 || this.selectedMeetings[i].month === 8 || this.selectedMeetings[i].month === 10){
                                if(this.selectedMeetings[i].day === 31){
                                  this.selectedMeetings[i].day = 1;
                                  this.selectedMeetings[i].month = this.selectedMeetings[i].month + 1;
                                  this.selectedMeetings[i].hour = this.currentEndTimeHour - 24;
                                }
                                else{
                                  this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                  this.selectedMeetings[i].hour = this.currentEndTimeHour - 24;
                                }
                              }
                              else{
                                if(this.selectedMeetings[i].day === 30){
                                  this.selectedMeetings[i].day = 1;
                                  this.selectedMeetings[i].month = this.selectedMeetings[i].month + 1;
                                  this.selectedMeetings[i].hour = this.currentEndTimeHour - 24;
                                }
                                else{
                                  this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                  this.selectedMeetings[i].hour = this.currentEndTimeHour - 24;
                                }
                              }
                            }
                          }
                        }
                      }

                      if (this.selectedMeetings[i].year == year){
                        if(this.selectedMeetings[i].month == month){
                          if(this.selectedMeetings[i].day == day){
                            if(this.currentEndTimeHour == hour){
                              if(this.currentEndTimeMinutes >= minutes){
                                this.loading = false;
                                this.time = this.selectedMeetings[i].startTime.split(':', 2);
                                var startHour = this.time[0];
                                var startMinutes = this.time[1];
                                if(!isNaN(Number(startHour))){
                                  startHour = Number(startHour) - (this.timeZoneOffset / 60);
                                  if(startHour < 0 || startHour > 24){
                                    if(startHour < 0){
                                      if(this.selectedMeetings[i].day != 1){
                                        this.selectedMeetings[i].day = this.selectedMeetings[i].day - 1;
                                        this.selectedMeetings[i].hour = 24 + startHour;
                                      }
                                      else{//equals 1 so go to end of previous month
                                        if(this.selectedMeetings[i].month === 1 && this.selectedMeetings[i].day === 1){
                                          this.selectedMeetings[i].month = 12;
                                          this.selectedMeetings[i].day = 31;
                                          this.selectedMeetings[i].year = this.selectedMeetings[i].year - 1;
                                          this.selectedMeetings[i].hour = 24 + startHour;
                                        }
                                        else if((this.selectedMeetings[i].year) % 4 === 0){ //leap year
                                          if(this.selectedMeetings[i].month === 3){
                                            this.selectedMeetings[i].day = 29;
                                            this.selectedMeetings[i].month = 2;
                                            this.selectedMeetings[i].hour = 24 + startHour;
                                          }
                                          else if(this.selectedMeetings[i].month === 2 || this.selectedMeetings[i].month === 6 || this.selectedMeetings[i].month === 8 || this.selectedMeetings[i].month === 9 || this.selectedMeetings[i].month === 11){
                                            this.selectedMeetings[i].month = this.selectedMeetings[i].month - 1;
                                            this.selectedMeetings[i].day = 31;
                                            this.selectedMeetings[i].hour = 24 + startHour;
                                          }
                                          else{
                                            this.selectedMeetings[i].month = this.selectedMeetings[i].month - 1;
                                            this.selectedMeetings[i].day = 30;
                                            this.selectedMeetings[i].hour = 24 + startHour;
                                          }
                                        }
                                        else{ //normal year
                                          if(this.selectedMeetings[i].month === 3){
                                            this.selectedMeetings[i].day = 28;
                                            this.selectedMeetings[i].month = 2;
                                            this.selectedMeetings[i].hour = 24 + startHour;
                                          }
                                          else if(this.selectedMeetings[i].month === 2 || this.selectedMeetings[i] === 4 || this.selectedMeetings[i].month === 6 || this.selectedMeetings[i].month === 8 || this.selectedMeetings[i].month === 9 || this.selectedMeetings[i].month === 11){
                                            this.selectedMeetings[i].month = this.selectedMeetings[i].month - 1;
                                            this.selectedMeetings[i].day = 31;
                                            this.selectedMeetings[i].hour = 24 + startHour;
                                          }
                                          else{
                                            this.selectedMeetings[i].month = this.selectedMeetings[i].month - 1;
                                            this.selectedMeetings[i].day = 30;
                                            this.selectedMeetings[i].hour = 24 + startHour;
                                          }
                                        }
                                      }
                                    }
                                    else{ // greater than 24
                                      if(this.selectedMeetings[i].month === 12 && this.selectedMeetings[i].day === 31){
                                        this.selectedMeetings[i].year = this.selectedMeetings[i].year + 1;
                                        this.selectedMeetings[i].day = 1;
                                        this.selectedMeetings[i].month = 1;
                                        this.selectedMeetings[i].hour = startHour - 24;
                                      }
                                      else if(this.selectedMeetings[i].year % 4 === 0){//leap year
                                        if(month === 2 && this.selectedMeetings[i].day != 29){
                                          this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                        else if(this.selectedMeetings[i].month === 1 || this.selectedMeetings[i].month === 3 || this.selectedMeetings[i].month === 5 || this.selectedMeetings[i].month === 7 || this.selectedMeetings[i].month === 8 || this.selectedMeetings[i].month === 10){
                                          if(this.selectedMeetings[i].day === 31){
                                            this.selectedMeetings[i].day = 1;
                                            this.selectedMeetings[i].month = this.selectedMeetings[i].month + 1;
                                            this.selectedMeetings[i].hour = startHour - 24;
                                          }
                                          else{
                                            this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                            this.selectedMeetings[i].hour = startHour - 24;
                                          }
                                        }
                                        else{
                                          if(this.selectedMeetings[i].day === 30){
                                            this.selectedMeetings[i].day = 1;
                                            this.selectedMeetings[i].month = this.selectedMeetings[i].month + 1;
                                            this.selectedMeetings[i].hour = startHour - 24;
                                          }
                                          else{
                                            this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                            this.selectedMeetings[i].hour = startHour - 24;
                                          }
                                        }
                                      }
                                      else{ //normal year
                                        if(month === 2 && this.selectedMeetings[i].day != 28){
                                          this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                        else if(this.selectedMeetings[i].month === 1 || this.selectedMeetings[i].month === 3 || this.selectedMeetings[i].month === 5 || this.selectedMeetings[i].month === 7 || this.selectedMeetings[i].month === 8 || this.selectedMeetings[i].month === 10){
                                          if(this.selectedMeetings[i].day === 31){
                                            this.selectedMeetings[i].day = 1;
                                            this.selectedMeetings[i].month = this.selectedMeetings[i].month + 1;
                                            this.selectedMeetings[i].hour = startHour - 24;
                                          }
                                          else{
                                            this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                            this.selectedMeetings[i].hour = startHour - 24;
                                          }
                                        }
                                        else{
                                          if(this.selectedMeetings[i].day === 30){
                                            this.selectedMeetings[i].day = 1;
                                            this.selectedMeetings[i].month = this.selectedMeetings[i].month + 1;
                                            this.selectedMeetings[i].hour = startHour - 24;
                                          }
                                          else{
                                            this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                            this.selectedMeetings[i].hour = startHour - 24;
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                                this.selectedMeetings[i].startTime = String(startHour) + ":" + String(startMinutes);
                                this.selectedMeetings[i].endTime = String(this.currentEndTimeHour) + ":" + String(this.currentEndTimeMinutes);
                                this.attendingMeetings.push(this.selectedMeetings[i]);
                                found = true;
                              }
                            }
                            if(this.currentEndTimeHour > hour){
                              this.loading = false;
                              this.time = this.selectedMeetings[i].startTime.split(':', 2);
                              var startHour = this.time[0];
                              var startMinutes = this.time[1];
                              if(!isNaN(Number(startHour))){
                                startHour = Number(startHour) - (this.timeZoneOffset / 60);
                                if(startHour < 0 || startHour > 24){
                                  if(startHour < 0){
                                    if(this.selectedMeetings[i].day != 1){
                                      this.selectedMeetings[i].day = this.selectedMeetings[i].day - 1;
                                      this.selectedMeetings[i].hour = 24 + startHour;
                                    }
                                    else{//equals 1 so go to end of previous month
                                      if(this.selectedMeetings[i].month === 1 && this.selectedMeetings[i].day === 1){
                                        this.selectedMeetings[i].month = 12;
                                        this.selectedMeetings[i].day = 31;
                                        this.selectedMeetings[i].year = this.selectedMeetings[i].year - 1;
                                        this.selectedMeetings[i].hour = 24 + startHour;
                                      }
                                      else if((this.selectedMeetings[i].year) % 4 === 0){ //leap year
                                        if(this.selectedMeetings[i].month === 3){
                                          this.selectedMeetings[i].day = 29;
                                          this.selectedMeetings[i].month = 2;
                                          this.selectedMeetings[i].hour = 24 + startHour;
                                        }
                                        else if(this.selectedMeetings[i].month === 2 || this.selectedMeetings[i].month === 6 || this.selectedMeetings[i].month === 8 || this.selectedMeetings[i].month === 9 || this.selectedMeetings[i].month === 11){
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month - 1;
                                          this.selectedMeetings[i].day = 31;
                                          this.selectedMeetings[i].hour = 24 + startHour;
                                        }
                                        else{
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month - 1;
                                          this.selectedMeetings[i].day = 30;
                                          this.selectedMeetings[i].hour = 24 + startHour;
                                        }
                                      }
                                      else{ //normal year
                                        if(this.selectedMeetings[i].month === 3){
                                          this.selectedMeetings[i].day = 28;
                                          this.selectedMeetings[i].month = 2;
                                          this.selectedMeetings[i].hour = 24 + startHour;
                                        }
                                        else if(this.selectedMeetings[i].month === 2 || this.selectedMeetings[i] === 4 || this.selectedMeetings[i].month === 6 || this.selectedMeetings[i].month === 8 || this.selectedMeetings[i].month === 9 || this.selectedMeetings[i].month === 11){
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month - 1;
                                          this.selectedMeetings[i].day = 31;
                                          this.selectedMeetings[i].hour = 24 + startHour;
                                        }
                                        else{
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month - 1;
                                          this.selectedMeetings[i].day = 30;
                                          this.selectedMeetings[i].hour = 24 + startHour;
                                        }
                                      }
                                    }
                                  }
                                  else{ // greater than 24
                                    if(this.selectedMeetings[i].month === 12 && this.selectedMeetings[i].day === 31){
                                      this.selectedMeetings[i].year = this.selectedMeetings[i].year + 1;
                                      this.selectedMeetings[i].day = 1;
                                      this.selectedMeetings[i].month = 1;
                                      this.selectedMeetings[i].hour = startHour - 24;
                                    }
                                    else if(this.selectedMeetings[i].year % 4 === 0){//leap year
                                      if(month === 2 && this.selectedMeetings[i].day != 29){
                                        this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                        this.selectedMeetings[i].hour = startHour - 24;
                                      }
                                      else if(this.selectedMeetings[i].month === 1 || this.selectedMeetings[i].month === 3 || this.selectedMeetings[i].month === 5 || this.selectedMeetings[i].month === 7 || this.selectedMeetings[i].month === 8 || this.selectedMeetings[i].month === 10){
                                        if(this.selectedMeetings[i].day === 31){
                                          this.selectedMeetings[i].day = 1;
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                        else{
                                          this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                      }
                                      else{
                                        if(this.selectedMeetings[i].day === 30){
                                          this.selectedMeetings[i].day = 1;
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                        else{
                                          this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                      }
                                    }
                                    else{ //normal year
                                      if(month === 2 && this.selectedMeetings[i].day != 28){
                                        this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                        this.selectedMeetings[i].hour = startHour - 24;
                                      }
                                      else if(this.selectedMeetings[i].month === 1 || this.selectedMeetings[i].month === 3 || this.selectedMeetings[i].month === 5 || this.selectedMeetings[i].month === 7 || this.selectedMeetings[i].month === 8 || this.selectedMeetings[i].month === 10){
                                        if(this.selectedMeetings[i].day === 31){
                                          this.selectedMeetings[i].day = 1;
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                        else{
                                          this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                      }
                                      else{
                                        if(this.selectedMeetings[i].day === 30){
                                          this.selectedMeetings[i].day = 1;
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                        else{
                                          this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                              this.selectedMeetings[i].startTime = String(startHour) + ":" + String(startMinutes);
                              this.selectedMeetings[i].endTime = String(this.currentEndTimeHour) + ":" + String(this.currentEndTimeMinutes);
                              this.attendingMeetings.push(this.selectedMeetings[i]);
                              found = true;
                            }
                          }
                          if (this.selectedMeetings[i].day > day){
                              this.loading = false;
                              this.time = this.selectedMeetings[i].startTime.split(':', 2);
                              var startHour = this.time[0];
                              var startMinutes = this.time[1];
                              if(!isNaN(Number(startHour))){
                                startHour = Number(startHour) - (this.timeZoneOffset / 60);
                                if(startHour < 0 || startHour > 24){
                                  if(startHour < 0){
                                    if(this.selectedMeetings[i].day != 1){
                                      this.selectedMeetings[i].day = this.selectedMeetings[i].day - 1;
                                      this.selectedMeetings[i].hour = 24 + startHour;
                                    }
                                    else{//equals 1 so go to end of previous month
                                      if(this.selectedMeetings[i].month === 1 && this.selectedMeetings[i].day === 1){
                                        this.selectedMeetings[i].month = 12;
                                        this.selectedMeetings[i].day = 31;
                                        this.selectedMeetings[i].year = this.selectedMeetings[i].year - 1;
                                        this.selectedMeetings[i].hour = 24 + startHour;
                                      }
                                      else if((this.selectedMeetings[i].year) % 4 === 0){ //leap year
                                        if(this.selectedMeetings[i].month === 3){
                                          this.selectedMeetings[i].day = 29;
                                          this.selectedMeetings[i].month = 2;
                                          this.selectedMeetings[i].hour = 24 + startHour;
                                        }
                                        else if(this.selectedMeetings[i].month === 2 || this.selectedMeetings[i].month === 6 || this.selectedMeetings[i].month === 8 || this.selectedMeetings[i].month === 9 || this.selectedMeetings[i].month === 11){
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month - 1;
                                          this.selectedMeetings[i].day = 31;
                                          this.selectedMeetings[i].hour = 24 + startHour;
                                        }
                                        else{
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month - 1;
                                          this.selectedMeetings[i].day = 30;
                                          this.selectedMeetings[i].hour = 24 + startHour;
                                        }
                                      }
                                      else{ //normal year
                                        if(this.selectedMeetings[i].month === 3){
                                          this.selectedMeetings[i].day = 28;
                                          this.selectedMeetings[i].month = 2;
                                          this.selectedMeetings[i].hour = 24 + startHour;
                                        }
                                        else if(this.selectedMeetings[i].month === 2 || this.selectedMeetings[i] === 4 || this.selectedMeetings[i].month === 6 || this.selectedMeetings[i].month === 8 || this.selectedMeetings[i].month === 9 || this.selectedMeetings[i].month === 11){
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month - 1;
                                          this.selectedMeetings[i].day = 31;
                                          this.selectedMeetings[i].hour = 24 + startHour;
                                        }
                                        else{
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month - 1;
                                          this.selectedMeetings[i].day = 30;
                                          this.selectedMeetings[i].hour = 24 + startHour;
                                        }
                                      }
                                    }
                                  }
                                  else{ // greater than 24
                                    if(this.selectedMeetings[i].month === 12 && this.selectedMeetings[i].day === 31){
                                      this.selectedMeetings[i].year = this.selectedMeetings[i].year + 1;
                                      this.selectedMeetings[i].day = 1;
                                      this.selectedMeetings[i].month = 1;
                                      this.selectedMeetings[i].hour = startHour - 24;
                                    }
                                    else if(this.selectedMeetings[i].year % 4 === 0){//leap year
                                      if(month === 2 && this.selectedMeetings[i].day != 29){
                                        this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                        this.selectedMeetings[i].hour = startHour - 24;
                                      }
                                      else if(this.selectedMeetings[i].month === 1 || this.selectedMeetings[i].month === 3 || this.selectedMeetings[i].month === 5 || this.selectedMeetings[i].month === 7 || this.selectedMeetings[i].month === 8 || this.selectedMeetings[i].month === 10){
                                        if(this.selectedMeetings[i].day === 31){
                                          this.selectedMeetings[i].day = 1;
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                        else{
                                          this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                      }
                                      else{
                                        if(this.selectedMeetings[i].day === 30){
                                          this.selectedMeetings[i].day = 1;
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                        else{
                                          this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                      }
                                    }
                                    else{ //normal year
                                      if(month === 2 && this.selectedMeetings[i].day != 28){
                                        this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                        this.selectedMeetings[i].hour = startHour - 24;
                                      }
                                      else if(this.selectedMeetings[i].month === 1 || this.selectedMeetings[i].month === 3 || this.selectedMeetings[i].month === 5 || this.selectedMeetings[i].month === 7 || this.selectedMeetings[i].month === 8 || this.selectedMeetings[i].month === 10){
                                        if(this.selectedMeetings[i].day === 31){
                                          this.selectedMeetings[i].day = 1;
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                        else{
                                          this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                      }
                                      else{
                                        if(this.selectedMeetings[i].day === 30){
                                          this.selectedMeetings[i].day = 1;
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                        else{
                                          this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                              this.selectedMeetings[i].startTime = String(startHour) + ":" + String(startMinutes);
                              this.selectedMeetings[i].endTime = String(this.currentEndTimeHour) + ":" + String(this.currentEndTimeMinutes);
                              this.attendingMeetings.push(this.selectedMeetings[i]);
                              found = true;
                          }

                        }
                        if(this.selectedMeetings[i].month > month){
                          console.log('greater month');
                              this.loading = false;
                              this.time = this.selectedMeetings[i].startTime.split(':', 2);
                              var startHour = this.time[0];
                              var startMinutes = this.time[1];
                              if(!isNaN(Number(startHour))){
                                startHour = Number(startHour) - (this.timeZoneOffset / 60);
                                if(startHour < 0 || startHour > 24){
                                  if(startHour < 0){
                                    if(this.selectedMeetings[i].day != 1){
                                      this.selectedMeetings[i].day = this.selectedMeetings[i].day - 1;
                                      this.selectedMeetings[i].hour = 24 + startHour;
                                    }
                                    else{//equals 1 so go to end of previous month
                                      if(this.selectedMeetings[i].month === 1 && this.selectedMeetings[i].day === 1){
                                        this.selectedMeetings[i].month = 12;
                                        this.selectedMeetings[i].day = 31;
                                        this.selectedMeetings[i].year = this.selectedMeetings[i].year - 1;
                                        this.selectedMeetings[i].hour = 24 + startHour;
                                      }
                                      else if((this.selectedMeetings[i].year) % 4 === 0){ //leap year
                                        if(this.selectedMeetings[i].month === 3){
                                          this.selectedMeetings[i].day = 29;
                                          this.selectedMeetings[i].month = 2;
                                          this.selectedMeetings[i].hour = 24 + startHour;
                                        }
                                        else if(this.selectedMeetings[i].month === 2 || this.selectedMeetings[i].month === 6 || this.selectedMeetings[i].month === 8 || this.selectedMeetings[i].month === 9 || this.selectedMeetings[i].month === 11){
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month - 1;
                                          this.selectedMeetings[i].day = 31;
                                          this.selectedMeetings[i].hour = 24 + startHour;
                                        }
                                        else{
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month - 1;
                                          this.selectedMeetings[i].day = 30;
                                          this.selectedMeetings[i].hour = 24 + startHour;
                                        }
                                      }
                                      else{ //normal year
                                        if(this.selectedMeetings[i].month === 3){
                                          this.selectedMeetings[i].day = 28;
                                          this.selectedMeetings[i].month = 2;
                                          this.selectedMeetings[i].hour = 24 + startHour;
                                        }
                                        else if(this.selectedMeetings[i].month === 2 || this.selectedMeetings[i] === 4 || this.selectedMeetings[i].month === 6 || this.selectedMeetings[i].month === 8 || this.selectedMeetings[i].month === 9 || this.selectedMeetings[i].month === 11){
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month - 1;
                                          this.selectedMeetings[i].day = 31;
                                          this.selectedMeetings[i].hour = 24 + startHour;
                                        }
                                        else{
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month - 1;
                                          this.selectedMeetings[i].day = 30;
                                          this.selectedMeetings[i].hour = 24 + startHour;
                                        }
                                      }
                                    }
                                  }
                                  else{ // greater than 24
                                    if(this.selectedMeetings[i].month === 12 && this.selectedMeetings[i].day === 31){
                                      this.selectedMeetings[i].year = this.selectedMeetings[i].year + 1;
                                      this.selectedMeetings[i].day = 1;
                                      this.selectedMeetings[i].month = 1;
                                      this.selectedMeetings[i].hour = startHour - 24;
                                    }
                                    else if(this.selectedMeetings[i].year % 4 === 0){//leap year
                                      if(month === 2 && this.selectedMeetings[i].day != 29){
                                        this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                        this.selectedMeetings[i].hour = startHour - 24;
                                      }
                                      else if(this.selectedMeetings[i].month === 1 || this.selectedMeetings[i].month === 3 || this.selectedMeetings[i].month === 5 || this.selectedMeetings[i].month === 7 || this.selectedMeetings[i].month === 8 || this.selectedMeetings[i].month === 10){
                                        if(this.selectedMeetings[i].day === 31){
                                          this.selectedMeetings[i].day = 1;
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                        else{
                                          this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                      }
                                      else{
                                        if(this.selectedMeetings[i].day === 30){
                                          this.selectedMeetings[i].day = 1;
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                        else{
                                          this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                      }
                                    }
                                    else{ //normal year
                                      if(month === 2 && this.selectedMeetings[i].day != 28){
                                        this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                        this.selectedMeetings[i].hour = startHour - 24;
                                      }
                                      else if(this.selectedMeetings[i].month === 1 || this.selectedMeetings[i].month === 3 || this.selectedMeetings[i].month === 5 || this.selectedMeetings[i].month === 7 || this.selectedMeetings[i].month === 8 || this.selectedMeetings[i].month === 10){
                                        if(this.selectedMeetings[i].day === 31){
                                          this.selectedMeetings[i].day = 1;
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                        else{
                                          this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                      }
                                      else{
                                        if(this.selectedMeetings[i].day === 30){
                                          this.selectedMeetings[i].day = 1;
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                        else{
                                          this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                              this.selectedMeetings[i].startTime = String(startHour) + ":" + String(startMinutes);
                              this.selectedMeetings[i].endTime = String(this.currentEndTimeHour) + ":" + String(this.currentEndTimeMinutes);
                              this.attendingMeetings.push(this.selectedMeetings[i]);
                              found = true;
                        }
                      }
                        
                      if(this.selectedMeetings[i].year > year){
                        console.log('greater year');
                              this.loading = false;
                              this.time = this.selectedMeetings[i].startTime.split(':', 2);
                              var startHour = this.time[0];
                              var startMinutes = this.time[1];
                              if(!isNaN(Number(startHour))){
                                startHour = Number(startHour) - (this.timeZoneOffset / 60);
                                if(startHour < 0 || startHour > 24){
                                  if(startHour < 0){
                                    if(this.selectedMeetings[i].day != 1){
                                      this.selectedMeetings[i].day = this.selectedMeetings[i].day - 1;
                                      this.selectedMeetings[i].hour = 24 + startHour;
                                    }
                                    else{//equals 1 so go to end of previous month
                                      if(this.selectedMeetings[i].month === 1 && this.selectedMeetings[i].day === 1){
                                        this.selectedMeetings[i].month = 12;
                                        this.selectedMeetings[i].day = 31;
                                        this.selectedMeetings[i].year = this.selectedMeetings[i].year - 1;
                                        this.selectedMeetings[i].hour = 24 + startHour;
                                      }
                                      else if((this.selectedMeetings[i].year) % 4 === 0){ //leap year
                                        if(this.selectedMeetings[i].month === 3){
                                          this.selectedMeetings[i].day = 29;
                                          this.selectedMeetings[i].month = 2;
                                          this.selectedMeetings[i].hour = 24 + startHour;
                                        }
                                        else if(this.selectedMeetings[i].month === 2 || this.selectedMeetings[i].month === 6 || this.selectedMeetings[i].month === 8 || this.selectedMeetings[i].month === 9 || this.selectedMeetings[i].month === 11){
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month - 1;
                                          this.selectedMeetings[i].day = 31;
                                          this.selectedMeetings[i].hour = 24 + startHour;
                                        }
                                        else{
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month - 1;
                                          this.selectedMeetings[i].day = 30;
                                          this.selectedMeetings[i].hour = 24 + startHour;
                                        }
                                      }
                                      else{ //normal year
                                        if(this.selectedMeetings[i].month === 3){
                                          this.selectedMeetings[i].day = 28;
                                          this.selectedMeetings[i].month = 2;
                                          this.selectedMeetings[i].hour = 24 + startHour;
                                        }
                                        else if(this.selectedMeetings[i].month === 2 || this.selectedMeetings[i] === 4 || this.selectedMeetings[i].month === 6 || this.selectedMeetings[i].month === 8 || this.selectedMeetings[i].month === 9 || this.selectedMeetings[i].month === 11){
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month - 1;
                                          this.selectedMeetings[i].day = 31;
                                          this.selectedMeetings[i].hour = 24 + startHour;
                                        }
                                        else{
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month - 1;
                                          this.selectedMeetings[i].day = 30;
                                          this.selectedMeetings[i].hour = 24 + startHour;
                                        }
                                      }
                                    }
                                  }
                                  else{ // greater than 24
                                    if(this.selectedMeetings[i].month === 12 && this.selectedMeetings[i].day === 31){
                                      this.selectedMeetings[i].year = this.selectedMeetings[i].year + 1;
                                      this.selectedMeetings[i].day = 1;
                                      this.selectedMeetings[i].month = 1;
                                      this.selectedMeetings[i].hour = startHour - 24;
                                    }
                                    else if(this.selectedMeetings[i].year % 4 === 0){//leap year
                                      if(month === 2 && this.selectedMeetings[i].day != 29){
                                        this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                        this.selectedMeetings[i].hour = startHour - 24;
                                      }
                                      else if(this.selectedMeetings[i].month === 1 || this.selectedMeetings[i].month === 3 || this.selectedMeetings[i].month === 5 || this.selectedMeetings[i].month === 7 || this.selectedMeetings[i].month === 8 || this.selectedMeetings[i].month === 10){
                                        if(this.selectedMeetings[i].day === 31){
                                          this.selectedMeetings[i].day = 1;
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                        else{
                                          this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                      }
                                      else{
                                        if(this.selectedMeetings[i].day === 30){
                                          this.selectedMeetings[i].day = 1;
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                        else{
                                          this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                      }
                                    }
                                    else{ //normal year
                                      if(month === 2 && this.selectedMeetings[i].day != 28){
                                        this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                        this.selectedMeetings[i].hour = startHour - 24;
                                      }
                                      else if(this.selectedMeetings[i].month === 1 || this.selectedMeetings[i].month === 3 || this.selectedMeetings[i].month === 5 || this.selectedMeetings[i].month === 7 || this.selectedMeetings[i].month === 8 || this.selectedMeetings[i].month === 10){
                                        if(this.selectedMeetings[i].day === 31){
                                          this.selectedMeetings[i].day = 1;
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                        else{
                                          this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                      }
                                      else{
                                        if(this.selectedMeetings[i].day === 30){
                                          this.selectedMeetings[i].day = 1;
                                          this.selectedMeetings[i].month = this.selectedMeetings[i].month + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                        else{
                                          this.selectedMeetings[i].day = this.selectedMeetings[i].day + 1;
                                          this.selectedMeetings[i].hour = startHour - 24;
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                              this.selectedMeetings[i].startTime = String(startHour) + ":" + String(startMinutes);
                              this.selectedMeetings[i].endTime = String(this.currentEndTimeHour) + ":" + String(this.currentEndTimeMinutes);
                              this.attendingMeetings.push(this.selectedMeetings[i]);
                              found = true;
                        }
                    }
                if(found == false){
                    console.log("No meetings found :(");
                    this.loading = false;
                    this.alertService.error("No scheduled meetings");
                }

            },

            error => {
                this.alertService.error(error);
                this.loading = false;
            });
            console.log('outside');
          
  }

}
