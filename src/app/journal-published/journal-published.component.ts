import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, AlertService } from '../_services';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-journal-published',
  templateUrl: './journal-published.component.html',
  styleUrls: ['./journal-published.component.css']
})
export class JournalPublishedComponent implements OnInit {
  submitted: boolean;
  returnUrl: any;
  loading: boolean;
  entries: any[];
  currentUser: any;

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
   this.onSubmit();
  }

  onSubmit() {
    this.submitted = true;
    console.log('submitted');

    // reset alerts on submit
    this.alertService.clear();

    this.loading = true;
    this.entries = [];
    this.authenticationService.getAllJournals()
        .subscribe(
            data => {
                console.log(data);
                this.loading = false;
                let found = false;

                //look into querying data
                for (let user of data){
                    console.log("user:" + user.username);
                    console.log("currentUser:" + this.currentUser.username);
                    if(user.username == this.currentUser.username){
                        console.log('Yay we found it');
                        this.loading = false;
                        this.entries.push(user);
                        found = true;
                    }
                }
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