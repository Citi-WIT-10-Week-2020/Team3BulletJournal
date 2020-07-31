
import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService, UserService, AlertService } from '../_services';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ThemeService } from 'ng2-charts';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.css']
})
export class BarGraphComponent implements OnInit{
  barGraphColor: { backgroundColor: string[]; }[];
  barGraphData: any[];
  anxietyCount: number;
  excitedCount: number;
  tiredCount: number;
  sadCount: number;
  contentCount: number;
  barGraphLabels: string[];
  currentUser: any;
  chartOptions: any;
  currentMonth: any;

  constructor (private httpService: HttpClient,
    private authenticationService: AuthenticationService,
        private userService: UserService,
        private formBuilder: FormBuilder,
        private router: Router,
        private alertService: AlertService) { 
        


    // ADD CHART OPTIONS. 
    this.currentUser = this.authenticationService.currentUserValue[0];  

    this.chartOptions = {
      responsive: true    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
    }

    this.barGraphLabels =  ['Anxious', 'Excited', 'Tired', 'Sad', 'Content'];


    // CHART COLOR.
    this.barGraphColor = [
        {
            backgroundColor: ['rgba(189, 218, 255, 0.9)',
            'rgba(244, 195, 137, 0.9)',
            'rgba(183, 158, 177, 0.9)',
            'rgba(226, 184, 175, 0.9)',
            'rgba(200, 226, 199, 0.9)'
            ]
        }
    ]

      console.log(this.anxietyCount)
      this.barGraphData = [
        { 
            data: [Number(this.anxietyCount), this.excitedCount, this.tiredCount, this.sadCount, this.contentCount]
        }
    ];
    

    
  }
  ngOnInit(): void {

  var date = new Date();
  var month = date.getMonth()+1;
  this.anxietyCount = 0;
  this.excitedCount = 0;
  this.tiredCount = 0;
  this.sadCount = 0;
  this.contentCount = 0;

  this.authenticationService.getAllMoods()
  .subscribe(
    data => {
      for (let user of data){
        if(this.currentUser.username == user.username && user.month == month){
          console.log(user.username);
          console.log(user.mood)
          if(user.mood == "anxious"){
            this.anxietyCount = this.anxietyCount + 1;
          }else if(user.mood == 'excited'){
            this.excitedCount++;
          }else if(user.mood == 'tired'){
            this.tiredCount++;
          }else if(user.mood == 'sad'){
            this.sadCount++;
          }else if(user.mood == 'content'){
            console.log("in");
              this.contentCount++;
              console.log("out");
          }
        }
      }
      
      console.log(this.anxietyCount);
      console.log(this.contentCount);
      this.barGraphData = [
        { 
            data: [Number(this.anxietyCount), this.excitedCount, this.tiredCount, this.sadCount, this.contentCount]
        }
    ];
      
    
    }
    
    );
    console.log(this.anxietyCount);
    console.log(this.barGraphData);
  }

  onChartClick(event) {
    console.log(event);
}



  }

