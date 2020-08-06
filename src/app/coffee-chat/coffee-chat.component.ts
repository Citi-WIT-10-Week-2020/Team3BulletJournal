import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services';
import { SidebarModule } from 'ng-sidebar';

@Component({
  selector: 'app-coffee-chat',
  templateUrl: './coffee-chat.component.html',
  styleUrls: ['./coffee-chat.component.css']
})
export class CoffeeChatComponent implements OnInit {
  currentUser:any;
 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) 
    {
      this.currentUser = this.authenticationService.currentUserValue[0];
    }

  ngOnInit(): void {
    if(this.currentUser.friends == undefined){
      window.location.reload();        
    }
  }

}
