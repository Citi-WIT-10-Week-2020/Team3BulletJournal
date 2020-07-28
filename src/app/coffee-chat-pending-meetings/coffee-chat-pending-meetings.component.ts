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

  //@Output() meetingEvent = new EventEmitter<string>();

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
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/coffee-chat-pending-meetings';
    this.onSubmit();
  }

  getMeeting(meeting){
    console.log("got meeting");
    this.currentMeeting = meeting;
  }

  sendMeeting(meeting){
    this.meetingID = meeting._id;
    localStorage.setItem('currentMeeting', JSON.stringify(this.meetingID));
    //console.log("emitted");
    //this.meetingEvent.emit(this.meetingID);
  }

  deleteMeeting(meeting){
    this.authenticationService.deleteMeeting(meeting._id)
    .subscribe(
      data => {
        console.log(data);
        this.returnUrl = '/coffee-chat';
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
                
                  //hostingMeetings
                    if(user.username == this.currentUser.username){
                      if (user.year == year){
                        if(user.month == month){
                          if(user.day == day){
                            if(user.time == hour){
                              if(user.time >= minutes){
                                this.loading = false;
                                this.hostingMeetings.push(user);
                                found = true;
                              }
                            }
                            if(user.time > hour){
                              this.loading = false;
                              this.hostingMeetings.push(user);
                              found = true;
                            }
                          }
                          if (user.day > day){
                              this.loading = false;
                              this.hostingMeetings.push(user);
                              found = true;
                          }

                        }
                        if(user.month > month){
                          console.log('greater month');
                              this.loading = false;
                              this.hostingMeetings.push(user);
                              found = true;
                        }
                      }
                        
                      if(user.year > year){
                        console.log('greater year');
                              this.loading = false;
                              this.hostingMeetings.push(user);
                              found = true;
                        }
                    }
                  }
                    //attendingMeetings
                    for(var i = 0; i < this.selectedMeetings.length; i++){
                      console.log("in");
                      if (this.selectedMeetings[i].year == year){
                        if(this.selectedMeetings[i].month == month){
                          if(this.selectedMeetings[i].day == day){
                            if(this.selectedMeetings[i].time == hour){
                              if(this.selectedMeetings[i].time >= minutes){
                                this.loading = false;
                                this.attendingMeetings.push(this.selectedMeetings[i]);
                                found = true;
                              }
                            }
                            if(this.selectedMeetings[i].time > hour){
                              this.loading = false;
                              this.attendingMeetings.push(this.selectedMeetings[i]);
                              found = true;
                            }
                          }
                          if (this.selectedMeetings[i].day > day){
                              this.loading = false;
                              this.attendingMeetings.push(this.selectedMeetings[i]);
                              found = true;
                          }

                        }
                        if(this.selectedMeetings[i].month > month){
                          console.log('greater month');
                              this.loading = false;
                              this.attendingMeetings.push(this.selectedMeetings[i]);
                              found = true;
                        }
                      }
                        
                      if(this.selectedMeetings[i].year > year){
                        console.log('greater year');
                              this.loading = false;
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
