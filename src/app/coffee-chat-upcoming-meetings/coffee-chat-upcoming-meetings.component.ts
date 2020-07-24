import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, AlertService, UserService } from '../_services';
import { FormBuilder } from '@angular/forms';
import { count } from 'console';


@Component({
  selector: 'app-coffee-chat-upcoming-meetings',
  templateUrl: './coffee-chat-upcoming-meetings.component.html',
  styleUrls: ['./coffee-chat-upcoming-meetings.component.css']
})
export class CoffeeChatUpcomingMeetingsComponent implements OnInit {
  submitted: boolean;
  loading: boolean;
  currentUser: any;
  hostingMeetings: any[];
  attendingMeetings: any[];
  selectedMeetings: any[]; //before filtering for attending meetings upcoming dates
  currentMeeting: any;
  userService:UserService;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    this.currentUser = this.authenticationService.currentUserValue[0];
    //this.meetings = this.meetings;
    
    }
   
     
    
  ngOnInit(): void {
    this.currentMeeting = {participants: this.currentUser.friends}; 
    this.onSubmit();
  }

  getMeeting(meeting){
    this.currentMeeting = meeting;
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
    this.attendingMeetings = [];
    this.hostingMeetings = [];
    this.selectedMeetings = [];
    this.authenticationService.getAllMeetings()
        .subscribe(
            data => {
                console.log(data);
                this.loading = false;
                let found = false;
                for (let user of data){
                  for(var i = 0; i < user.participants.length; i++){
                    if(user.participants[i].username == this.currentUser.username){
                      this.selectedMeetings.push(user);
                      break;
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

                // for(let user of this.hostingMeetings){
                //   console.log('got through');
                //   console.log(user);
                // }

            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
            console.log('outside');
          
  }

  

}
