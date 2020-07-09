import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-journal-free-write',
  templateUrl: './journal-free-write.component.html',
  styleUrls: ['./journal-free-write.component.css']
})
export class JournalFreeWriteComponent implements OnInit {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.currentUserValue[0]
   }
  ngOnInit(): void {
  }

}
