import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, AlertService } from '../_services';
import { FormBuilder, Validators } from '@angular/forms';
import { time } from 'console';


@Component({
  selector: 'app-coffee-chat-upcoming-meetings',
  templateUrl: './coffee-chat-upcoming-meetings.component.html',
  styleUrls: ['./coffee-chat-upcoming-meetings.component.css']
})
export class CoffeeChatUpcomingMeetingsComponent implements OnInit {
  submitted: boolean;
  loading: boolean;
  returnUrl: any;
  currentUser: any;
  participants: Array<String>;
  meetings: Array<Object>;

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
    this.onSubmit();
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
    this.participants = [];
    this.authenticationService.getAllMeetings()
        .subscribe(
            data => {
                console.log(data);
                this.loading = false;
                let found = false;
                //look into querying data
                for (let user of data){
                  console.log(day, month, year);
                    if(user.username == this.currentUser.username){
                      if (user.year == year){
                        if(user.month == month){
                          if(user.day == day){
                            if(user.time == hour){
                              if(user.time >= minutes){
                                console.log('greater minutes');
                                this.loading = false;
                                found = true;
                              }
                            }
                            if(user.time > hour){
                              console.log('greater hour');
                              this.loading = false;
                              found = true;
                            }
                          }
                          if (user.day > day){
                            console.log('greater day');
                              this.loading = false;
                              found = true;
                          }

                        }
                        if(user.month > month){
                          console.log('greater month');
                              this.loading = false;
                              found = true;
                        }
                      }
                        
                      if(user.year > year){
                        console.log('greater year');
                              this.loading = false;
                              found = true;
                        }
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
            console.log('outside')

          
}

}
