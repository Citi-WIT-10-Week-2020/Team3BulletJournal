import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, AlertService } from '../_services';
import { Validators, FormBuilder } from '@angular/forms';

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
  meetings: any[];
  currentMeeting: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    this.currentUser = this.authenticationService.currentUserValue[0];
    this.meetings = this.meetings;
    
     }
     
  ngOnInit(): void {
    this.currentMeeting = {participants: this.currentUser.friends}
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
    this.meetings = [];
    this.authenticationService.getAllMeetings()
        .subscribe(
            data => {
                console.log(data);
                this.loading = false;
                let found = false;

                //look into querying data
                for (let user of data){
            
                    if(user.username == this.currentUser.username){
                      if (user.year == year){
                        if(user.month == month){
                          if(user.day == day){
                            if(user.time == hour){
                              if(user.time >= minutes){
                                this.loading = false;
                                this.meetings.push(user);
                                found = true;
                              }
                            }
                            if(user.time > hour){
                              this.loading = false;
                              this.meetings.push(user);
                              found = true;
                            }
                          }
                          if (user.day > day){
                              this.loading = false;
                              this.meetings.push(user);
                              found = true;
                          }

                        }
                        if(user.month > month){
                          console.log('greater month');
                              this.loading = false;
                              this.meetings.push(user);
                              found = true;
                        }
                      }
                        
                      if(user.year > year){
                        console.log('greater year');
                              this.loading = false;
                              this.meetings.push(user);
                              found = true;
                        }
                    }
                }
                if(found == false){
                    console.log("No meetings found :(");
                    this.loading = false;
                    this.alertService.error("No scheduled meetings");
                }

                for(let user of this.meetings){
                  console.log('got through');
                  console.log(user);
                }

            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
            console.log('outside');
  }

}
