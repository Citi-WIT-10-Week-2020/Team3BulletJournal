
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
export class BarGraphComponent implements OnInit {
  barGraphColor: { backgroundColor: string[]; }[];
  barGraphData: any[];
  anxietyCount: number;
  excitedCount: number;
  confusedCount: number;
  sadCount: number;
  happyCount: number;
  barGraphLabels: string[];
  currentUser: any;
  chartOptions: any;

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

    this.barGraphLabels =  ['Anxious', 'Excited', 'Tired', 'Sad', 'Happy'];


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

  
    
    this.anxietyCount = 0;
    this.excitedCount = 0;
    this.confusedCount = 0;
    this.sadCount = 0;
    this.happyCount = 0;
    this.authenticationService.getAllMoods()
    .subscribe(
      data => {
        for (let user of data){
          console.log(user.mood)
            if(user.mood == "anxious"){
              this.anxietyCount = this.anxietyCount + 1;
            }else if(user.mood == 'excited'){
              this.excitedCount++;
            }else if(user.mood == 'tired'){
              this.confusedCount++;
            }else if(user.mood == 'sad'){
              this.sadCount++;
            }else if(user.mood == 'happy'){
                this.happyCount++;
            }
        }

        
      }
      
      );
      console.log(this.anxietyCount)
      this.barGraphData = [
        { 
            data: [Number(this.anxietyCount), this.excitedCount, this.confusedCount, this.sadCount, this.happyCount]
        }
    ];
    
  }
  ngOnInit(): void {
  //   this.httpService.get('./assets/sales.json', {responseType: 'json'}).subscribe(
  //     data => {
  //         this.pieChartData = data as any [];	 // FILL THE CHART ARRAY WITH DATA.
  //     },
  //     (err: HttpErrorResponse) => {
  //         console.log (err.message);
  //     }
  // );

  this.anxietyCount = 0;
  this.excitedCount = 0;
  this.confusedCount = 0;
  this.sadCount = 0;
  this.happyCount = 0;

  this.authenticationService.getAllMoods()
  .subscribe(
    data => {
      for (let user of data){
        if(this.currentUser.username == user.username){
          console.log(user.username);
          console.log(user.mood)
          if(user.mood == "anxious"){
            this.anxietyCount = this.anxietyCount + 1;
          }else if(user.mood == 'excited'){
            this.excitedCount++;
          }else if(user.mood == 'tired'){
            this.confusedCount++;
          }else if(user.mood == 'sad'){
            this.sadCount++;
          }else if(user.mood == 'happy'){
              this.happyCount++;
          }
        }
      }
      
      console.log(this.anxietyCount);
      this.barGraphData = [
        { 
            data: [Number(this.anxietyCount), this.excitedCount, this.confusedCount, this.sadCount, this.happyCount]
        }
    ];
    }
    
    );
    console.log(this.anxietyCount);

  }

  onChartClick(event) {
    console.log(event);
}



  }

