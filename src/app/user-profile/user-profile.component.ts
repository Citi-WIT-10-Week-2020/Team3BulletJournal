import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, AlertService } from '../_services';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  currentUser: any;
  returnUrl: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    this.currentUser = this.authenticationService.currentUserValue[0];
    console.log(this.currentUser.firstName);
     }
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  removeUser(user){
    this.authenticationService.deleteUser(user._id)
    .subscribe(
      data => {
        console.log(data);
        console.log('USER DELETED');
        this.authenticationService.logout();
        this.returnUrl = '/';
        this.router.navigate([this.returnUrl]);          

      }
      );
  }

 

}
