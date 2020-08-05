import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, AlertService, UserService } from '../_services';
import { FormBuilder } from '@angular/forms';
import { count } from 'console';
import { first } from 'rxjs/operators';


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
  returnUrl: any;
  hostFname: any;
  hostLname: any;
  meetingID: any;
  time: any[];
  timeZoneOffset = ((new Date().getTimezoneOffset()));
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
    this.onSubmit();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/coffee-chat-pending-meetings';
    if (!localStorage.getItem('autoLoad')) { 
      localStorage.setItem('autoLoad', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('autoLoad') 
    }
  }

  getMeeting(meeting){
    this.currentMeeting = meeting;
    console.log("Meeting to look at" + this.currentMeeting);
    this.authenticationService.getAllUsers()
    .subscribe(
      data=>{
        for(let user of data){
          if(user.username == this.currentMeeting.host){
            this.hostFname = user.firstName;
            this.hostLname = user.lastName;
          }
        }
      }
    );
  }

  sendMeeting(currentMeeting){
    this.meetingID = currentMeeting._id;
    localStorage.setItem('currentMeeting', JSON.stringify(this.meetingID));
    
  }

  declineMeeting(meeting){
    var index;
    console.log(this.currentMeeting)
      for(var i = 0; i < this.currentMeeting.participants.length; i++){
        if(this.currentMeeting.participants[i].username == this.currentUser.username){
          index = i;
          break;
        }
      }

    console.log("index:" + index);
    this.authenticationService.declineMeeting(this.currentMeeting, index)
    .pipe(first())
    .subscribe(
      data => {
        this.returnUrl = '/coffee-chat'
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
                      if(user.participants[i].status == "Accepted"){
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
                    this.currentEndTimeHour = Number(this.currentEndTimeHour) + (this.timeZoneOffset / 60);
                    if(!isNaN(Number(this.currentEndTimeMinutes))){
                      this.currentEndTimeMinutes = Number(this.currentEndTimeMinutes) + (this.timeZoneOffset % 60);
                    }
                  }

                  //hostingMeetings
                    if(user.username == this.currentUser.username){
                      if (user.year == year){
                        if(user.month == month){
                          if(user.day == day){      
                            if(this.currentEndTimeHour == hour){
                              console.log("hour mark");
                              if(this.currentEndTimeMinutes >= minutes){
                                console.log("pushed");
                                this.loading = false;
                                this.time = user.startTime.split(':', 2);
                                var startHour = this.time[0];
                                var startMinutes = this.time[1];
                                if(!isNaN(Number(startHour))){
                                  startHour = Number(startHour) + (this.timeZoneOffset / 60);
                                }
                                user.startTime = String(startHour) + ":" + String(startMinutes);
                                user.endTime = String(this.currentEndTimeHour) + ":" + String(this.currentEndTimeMinutes);
                                this.hostingMeetings.push(user);
                                found = true;
                              }
                            }
                            if(this.currentEndTimeHour > hour){
                              this.loading = false;
                              console.log("greater hour");
                              this.time = user.startTime.split(':', 2);
                                var startHour = this.time[0];
                                var startMinutes = this.time[1];
                                if(!isNaN(Number(startHour))){
                                  startHour = Number(startHour) + (this.timeZoneOffset / 60);
                                 
                                }
                                user.startTime = String(startHour) + ":" + String(startMinutes);
                                user.endTime = String(this.currentEndTimeHour) + ":" + String(this.currentEndTimeMinutes);
                              this.hostingMeetings.push(user);
                              found = true;
                            }
                          }
                          if (user.day > day){
                            console.log("greater day");
                              this.loading = false;
                              this.time = user.startTime.split(':', 2);
                                var startHour = this.time[0];
                                var startMinutes = this.time[1];
                                if(!isNaN(Number(startHour))){
                                  startHour = Number(startHour) + (this.timeZoneOffset / 60);
                                 
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
                                  startHour = Number(startHour) + (this.timeZoneOffset / 60);
                                 
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
                                  startHour = Number(startHour) + (this.timeZoneOffset / 60);
                                 
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
                        this.currentEndTimeHour = Number(this.currentEndTimeHour) + (this.timeZoneOffset / 60);
                        if(!isNaN(Number(this.currentEndTimeMinutes))){
                          this.currentEndTimeMinutes = Number(this.currentEndTimeMinutes) + (this.timeZoneOffset % 60);
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
                                  startHour = Number(startHour) + (this.timeZoneOffset / 60);
                                  
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
                                  startHour = Number(startHour) + (this.timeZoneOffset / 60);
                                  
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
                                  startHour = Number(startHour) + (this.timeZoneOffset / 60);
                                 
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
                                  startHour = Number(startHour) + (this.timeZoneOffset / 60);
                                  
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
                                  startHour = Number(startHour) + (this.timeZoneOffset / 60);
                                 
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
