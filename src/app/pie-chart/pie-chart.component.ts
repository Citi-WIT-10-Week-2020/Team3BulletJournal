import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService, UserService, AlertService } from '../_services';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ThemeService } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  pieChartColor: { backgroundColor: string[]; }[];
  pieChartData: any[];
  anxietyCount: number;
  excitedCount: number;
  confusedCount: number;
  sadCount: number;
  happyCount: number;
  pieChartLabels: string[];
  currentUser: any;

  constructor (private httpService: HttpClient,
    private authenticationService: AuthenticationService,
        private userService: UserService,
        private formBuilder: FormBuilder,
        private router: Router,
        private alertService: AlertService) { 

    // ADD CHART OPTIONS. 
    this.currentUser = this.authenticationService.currentUserValue[0];  


    this.pieChartLabels =  ['Anxious', 'Excited', 'Confused', 'Sad', 'Happy'];


    // CHART COLOR.
    this.pieChartColor = [
        {
            backgroundColor: ['rgba(30, 169, 224, 0.8)',
            'rgba(255,165,0,0.9)',
            'rgba(139, 136, 136, 0.9)',
            'rgba(255, 161, 181, 0.9)',
            'rgba(255, 102, 0, 0.9)'
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
            }else if(user.mood == 'confused'){
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
      this.pieChartData = [
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
          }else if(user.mood == 'confused'){
            this.confusedCount++;
          }else if(user.mood == 'sad'){
            this.sadCount++;
          }else if(user.mood == 'happy'){
              this.happyCount++;
          }
        }
      }
      
      console.log(this.anxietyCount);
      this.pieChartData = [
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
