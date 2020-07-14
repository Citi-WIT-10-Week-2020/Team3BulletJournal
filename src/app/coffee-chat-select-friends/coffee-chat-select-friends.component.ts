import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService, AlertService, AuthenticationService } from '../_services';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-coffee-chat-select-friends',
  templateUrl: './coffee-chat-select-friends.component.html',
  styleUrls: ['./coffee-chat-select-friends.component.css'],
})
export class CoffeeChatSelectFriendsComponent implements OnInit {
  currentUser: any;
  peopleList = [];
  createMeeting: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService) 
  {
    this.currentUser = this.authenticationService.currentUserValue[0];
   }

   ngOnInit(){
    this.peopleList = this.currentUser.friends;
    this.createMeeting = this.formBuilder.group({
      people: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.createMeeting.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.createMeeting.invalid) {
        return;
    }
    this.loading = true;
    this.authenticationService.register(this.createMeeting.value)
        //.pipe(first())
        .subscribe(
            data => {
                this.alertService.success('Meeting Scheduled', true);
                this.router.navigate(['/coffee-chat-profiles'], { queryParams: { scheduled: true }});
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
}
}
