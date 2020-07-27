import { Component, OnInit } from '@angular/core';
import { AuthenticationService, AlertService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile-dashboard',
  templateUrl: './user-profile-dashboard.component.html',
  styleUrls: ['./user-profile-dashboard.component.css']
})
export class UserProfileDashboardComponent implements OnInit {
  submitted: boolean;
  loading: boolean;
  returnUrl: any;
  currentUser: any;
  entries: any[];
  selectedMeetings: any[]; //top 3 most upcoming meetings
  upcomingMeetings: any[]; //all relevant upcoming meetings
  prelimMeetings: any[]; //filtered attending meetings
  meetingID = "";
  currentEntry: any;
  journalDataSize: any;
  size: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    this.currentUser = this.authenticationService.currentUserValue[0];
    this.entries = this.entries;


     }
  ngOnInit(): void {
    this.currentEntry = {title: "blank"};
    this.onSubmit();

  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  sendMeeting(meeting){
    this.meetingID = meeting._id;
    localStorage.setItem('currentMeeting', JSON.stringify(this.meetingID));
  }

  getEntry(entry){
    console.log(entry.title)
    this.currentEntry = entry;
  }

  onSubmit() {
    this.submitted = true;
    console.log('submitted');
    // reset alerts on submit
    this.alertService.clear();

    this.loading = true;
    this.entries = [];
    this.authenticationService.getAllJournals()
        //.pipe(first())
        .subscribe(
          data => {
            console.log(data);
            this.loading = false;
            let found = false;

            //look into querying data
            for (let user of data){
                console.log("user:" + user.username);
                console.log("currentUser:" + this.currentUser.username);
                if(data.length < 5){
                  this.journalDataSize = data.length;
                }
                else{
                  this.journalDataSize = 5;
                }
                for(var i = 0; i < this.journalDataSize; i++){
                  if(user.username == this.currentUser.username){
                    console.log('Yay we found it');
                    this.loading = false;
                    this.entries.push(user);
                    found = true;
                  }
                }
            }
                  
                this.loading = true;
                this.selectedMeetings = [];
                this.prelimMeetings = [];
                this.upcomingMeetings =[];
                this.authenticationService.getAllMeetings()
                .subscribe(
                  meetingData => {
                    console.log(meetingData);
                    this.loading = false;
                    let found = false;
                    for (let user of meetingData){
                      console.log("inside");
                      for(var i = 0; i < user.participants.length; i++){
                        if(user.participants[i].username == this.currentUser.username){
                          console.log("here");
                          if(user.participants[i].status == "Accepted"){
                            console.log("inside inside")
                            console.log("status:" + user.participants[i].status);
                            this.prelimMeetings.push(user);
                            break;
                          } 
                        }
                      }
                    }

                    var date = new Date();
                    var day = date.getDate();
                    var month = date.getMonth()+1;
                    var year = date.getFullYear();
                    var hour = date.getHours();
                    var minutes = date.getMinutes();

                    //look into querying data
                    for (let user of meetingData){
                      //hostingMeetings
                        if(user.username == this.currentUser.username){
                          if (user.year == year){
                            if(user.month == month){
                              if(user.day == day){
                                if(user.time == hour){
                                  if(user.time >= minutes){
                                    this.loading = false;
                                    this.upcomingMeetings.push(user);
                                    found = true;
                                  }
                                }
                                if(user.time > hour){
                                  this.loading = false;
                                  this.upcomingMeetings.push(user);
                                  found = true;
                                }
                              }
                              if (user.day > day){
                                  this.loading = false;
                                  this.upcomingMeetings.push(user);
                                  found = true;
                              }
    
                            }
                            if(user.month > month){
                              console.log('greater month');
                                  this.loading = false;
                                  this.upcomingMeetings.push(user);
                                  found = true;
                            }
                          }
                            
                          if(user.year > year){
                            console.log('greater year');
                                  this.loading = false;
                                  this.upcomingMeetings.push(user);
                                  found = true;
                            }
                        }
                      }
                        //attendingMeetings
                        for(var i = 0; i < this.prelimMeetings.length; i++){
                          console.log("in");
                          if (this.prelimMeetings[i].year == year){
                            if(this.prelimMeetings[i].month == month){
                              if(this.prelimMeetings[i].day == day){
                                if(this.prelimMeetings[i].time == hour){
                                  if(this.prelimMeetings[i].time >= minutes){
                                    this.loading = false;
                                    this.upcomingMeetings.push(this.prelimMeetings[i]);
                                    found = true;
                                  }
                                }
                                if(this.prelimMeetings[i].time > hour){
                                  this.loading = false;
                                  this.upcomingMeetings.push(this.prelimMeetings[i]);
                                  found = true;
                                }
                              }
                              if (this.prelimMeetings[i].day > day){
                                  this.loading = false;
                                  this.upcomingMeetings.push(this.prelimMeetings[i]);
                                  found = true;
                              }
    
                            }
                            if(this.prelimMeetings[i].month > month){
                              console.log('greater month');
                                  this.loading = false;
                                  this.upcomingMeetings.push(this.prelimMeetings[i]);
                                  found = true;
                            }
                          }
                            
                          if(this.prelimMeetings[i].year > year){
                            console.log('greater year');
                                  this.loading = false;
                                  this.upcomingMeetings.push(this.prelimMeetings[i]);
                                  found = true;
                            }
                        }
                        console.log("upcoming meetings" + this.upcomingMeetings);
                        
                        if(this.upcomingMeetings.length < 3){
                          this.size = this.upcomingMeetings.length
                        }
                        else{
                          this.size = 3;
                        }

                        for(var n = 0; n < this.size; n++){
                          var closestMeetingIndex = 0;
                          for (var m = 1; m < this.upcomingMeetings.length; m++){
                            //find the closest by looping three times and take the min (3 selected meetings)
                            var meetingYear = this.upcomingMeetings[m].year;
                            var meetingMonth = this.upcomingMeetings[m].month;
                            var meetingDay = this.upcomingMeetings[m].day;
                            var meetingTime = this.upcomingMeetings[m].time;

                              if (this.upcomingMeetings[closestMeetingIndex].year == meetingYear){
                                if(this.upcomingMeetings[closestMeetingIndex].month == meetingMonth){
                                  if(this.upcomingMeetings[closestMeetingIndex].day == meetingDay){
                                    if(this.upcomingMeetings[closestMeetingIndex].time > meetingTime){
                                      closestMeetingIndex = m;
                        
                                  }
                                  if (this.upcomingMeetings[closestMeetingIndex].day > meetingDay){
                                      closestMeetingIndex = m;
                                  }
        
                                }
                                if(this.upcomingMeetings[closestMeetingIndex].month > meetingMonth){
                                  closestMeetingIndex = m;
                                }
                              }
                                
                              if(this.upcomingMeetings[closestMeetingIndex].year > meetingYear){
                                this.upcomingMeetings[closestMeetingIndex]
                              }
                            }
                          }

                          this.selectedMeetings[n] = this.upcomingMeetings[closestMeetingIndex];
                          this.upcomingMeetings.splice(closestMeetingIndex, 1);
                        }

                        console.log("meetings length:" + this.selectedMeetings.length);
                        console.log (this.selectedMeetings);
                  } 
                );


                if(found == false){
                    console.log("No user found :(");
                    this.loading = false;
                    this.alertService.error("No entries under that date found");
                }

                for(let user of this.entries){
                  console.log('made it')
                  console.log(user)
                }
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
            console.log('outside')

          
}
}
