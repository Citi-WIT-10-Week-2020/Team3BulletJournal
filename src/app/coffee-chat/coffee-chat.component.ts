import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coffee-chat',
  templateUrl: './coffee-chat.component.html',
  styleUrls: ['./coffee-chat.component.css']
})
export class CoffeeChatComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
  }

}
