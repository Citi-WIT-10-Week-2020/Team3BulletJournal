import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, AlertService } from '../_services';

@Component({
  selector: 'app-mood-chosen',
  templateUrl: './mood-chosen.component.html',
  styleUrls: ['./mood-chosen.component.css']
})
export class MoodChosenComponent implements OnInit {
  currentUser: any;
  validJournal: any;
  currentMood: any;

  AnxiousWatch = [
    {title: 'AVideo1', link: 'https://www.youtube.com/watch?v=pq0TQODveJo'},
     {title: 'AVideo2', link: 'https://www.youtube.com/watch?v=WWloIAQpMcQ'}
  ]

  AnxiousRead = [
    {title: 'ARead1', link: 'https://psychcentral.com/lib/9-ways-to-reduce-anxiety-right-here-right-now/'},
     {title: 'ARead2', link: 'https://www.psychologytoday.com/us/blog/anxiety-zen/201405/21-quick-tips-change-your-anxiety-forever'}
  ]

  AnxiousDo = [
    {title: 'ADo1', link: 'https://www.youtube.com/watch?v=Nw2oBIrQGLo'},
     {title: 'ADo2', link: 'https://www.youtube.com/watch?v=MFxlK1ZvOmA'}
  ]

  ExcitedWatch = [
    {title: 'EWatch1', link: 'https://www.youtube.com/watch?v=ru0K8uYEZWw&list=PLVgakZ6MigxxNhXZae5cALEW588-sMQn6'}
  ]

  ExcitedRead = [
    {title: 'ERead1', link: 'https://www.psychologytoday.com/us/blog/learning-play/200912/the-nature-excitement'}
  ]

  ExcitedDo = [
    {title: 'EDo1', link: 'https://www.danielbranch.com/50-crazy-things-to-do-that-will-put-excitement-in-your-life/'}
  ]

  TiredWatch = [
    {title: 'CWatch1', link: 'https://www.youtube.com/watch?v=nn42RC1zT_A'}
  ]

  TiredRead = [
    {title: 'CRead1', link: 'https://www.medicalnewstoday.com/articles/8877'},
     {title: 'CRead2', link: 'https://www.newscientist.com/article/mg23230950-400-tired-all-the-time-why-fatigue-isnt-just-about-sleep/'}
  ]

  TiredDo = [
    {title: 'CDo1', link: 'https://www.yourworldhealthcare.com/uk/news/7-activities-for-when-youre-tired'},
    {title: 'CDo2', link: 'https://tinybuddha.com/blog/how-to-deal-with-exhaustion-10-tips-to-function-better-when-youre-tired/'}
  ]

  ContentWatch = [
    {title: 'HWatch1', link: 'https://www.ted.com/talks/dan_gilbert_the_surprising_science_of_happiness?language=en'},
    {title: 'HWatch2', link: 'https://www.ted.com/talks/matthieu_ricard_the_habits_of_happiness?language=en'}
  ]

  ContentRead = [
    {title: 'HRead1', link: 'https://greatergood.berkeley.edu/article/item/happy_life_different_from_meaningful_life'}
  ]

  ContentDo = [
    {title: 'HDo1', link: 'https://www.nytimes.com/guides/well/how-to-be-happy'}
  ]

  SadWatch = [
    {title: 'SWatch1', link: 'https://www.youtube.com/watch?v=80F369RlAxo'}
  ]

  SadRead = [
    {title: 'SRead1', link: 'https://www.psychologytoday.com/us/blog/compassion-matters/201507/the-value-sadness'},
    {title: 'SRead2', link: 'https://greatergood.berkeley.edu/article/item/four_ways_sadness_may_be_good_for_you'}
  ]

  SadDo = [
    {title: 'SDo1', link: 'https://bemorewithless.com/sad/'},
    {title: 'SDo2', link: 'https://www.lifehack.org/articles/communication/10-things-when-you-feel-down.html'}
  ]
  returnUrl: any;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    this.currentUser = this.authenticationService.currentUserValue[0];
    this.validJournal = this.validJournal;
    this.currentMood = this.authenticationService.currentMoodValue;

  }

  ngOnInit(): void {

    if (!localStorage.getItem('autoLoad')) { 
      localStorage.setItem('autoLoad', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('autoLoad') 
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/journal-mood-do-reroute';
 
  }

  
  onSubmitRead(){
    var linkToAdd = '';
    console.log(this.currentMood.mood)
    if(this.currentMood.mood == 'anxious'){
      var promptIndexSelected = Math.random() * (this.AnxiousRead.length - 1);
      linkToAdd = this.AnxiousRead[Math.floor(promptIndexSelected)].link;
      window.open(linkToAdd);
    }else if(this.currentMood.mood == 'excited'){
      var promptIndexSelected = Math.random() * (this.ExcitedRead.length - 1);
      linkToAdd = this.ExcitedRead[Math.floor(promptIndexSelected)].link;
      window.open(linkToAdd);
    }else if(this.currentMood.mood == 'tired'){
      var promptIndexSelected = Math.random() * (this.TiredRead.length - 1);
      linkToAdd = this.TiredRead[Math.floor(promptIndexSelected)].link;
      window.open(linkToAdd);
    }else if(this.currentMood.mood == 'sad'){
      var promptIndexSelected = Math.random() * (this.SadRead.length - 1);
      linkToAdd = this.SadRead[Math.floor(promptIndexSelected)].link;
      window.open(linkToAdd);
    }else if(this.currentMood.mood == 'content'){
      var promptIndexSelected = Math.random() * (this.ContentRead.length - 1);
      linkToAdd = this.ContentRead[Math.floor(promptIndexSelected)].link;
      window.open(linkToAdd);
    }
  }

  onSubmitWatch(){
    var linkToAdd = '';
    console.log(this.currentMood.mood)
    if(this.currentMood.mood == 'anxious'){
      var promptIndexSelected = Math.random() * (this.AnxiousWatch.length - 1);
      linkToAdd = this.AnxiousWatch[Math.floor(promptIndexSelected)].link;
      window.open(linkToAdd);
    }else if(this.currentMood.mood == 'excited'){
      var promptIndexSelected = Math.random() * (this.ExcitedWatch.length - 1);
      linkToAdd = this.ExcitedWatch[Math.floor(promptIndexSelected)].link;
      window.open(linkToAdd);
    }else if(this.currentMood.mood == 'tired'){
      var promptIndexSelected = Math.random() * (this.TiredWatch.length - 1);
      linkToAdd = this.TiredWatch[Math.floor(promptIndexSelected)].link;
      window.open(linkToAdd);
    }else if(this.currentMood.mood == 'sad'){
      var promptIndexSelected = Math.random() * (this.SadWatch.length - 1);
      linkToAdd = this.SadWatch[Math.floor(promptIndexSelected)].link;
      window.open(linkToAdd);
    }else if(this.currentMood.mood == 'content'){
      var promptIndexSelected = Math.random() * (this.ContentWatch.length - 1);
      linkToAdd = this.ContentWatch[Math.floor(promptIndexSelected)].link;
      window.open(linkToAdd);
    }
  }

  onSubmitDo(){
    var linkToAdd = '';
    console.log(this.currentMood.mood)
    if(this.currentMood.mood == 'anxious'){
      var promptIndexSelected = Math.random() * (this.AnxiousDo.length+1);
      console.log(Math.round(promptIndexSelected))
      if(Math.round(promptIndexSelected) >= this.AnxiousDo.length){
        this.router.navigate([this.returnUrl]);  
      }else{
      linkToAdd = this.AnxiousDo[Math.floor(promptIndexSelected)].link;
      window.open(linkToAdd);
    }
    }else if(this.currentMood.mood == 'excited'){
      var promptIndexSelected = Math.random() * (this.ExcitedDo.length+1);
      if(promptIndexSelected >= this.ExcitedDo.length){
        this.router.navigate([this.returnUrl]);  
      }else{
      linkToAdd = this.ExcitedDo[Math.floor(promptIndexSelected)].link;
      window.open(linkToAdd);
    }
    }else if(this.currentMood.mood == 'tired'){
      var promptIndexSelected = Math.random() * (this.TiredDo.length);
      if(promptIndexSelected >= this.TiredDo.length){
        this.router.navigate([this.returnUrl]);  
      }else{
      linkToAdd = this.TiredDo[Math.floor(promptIndexSelected)].link;
      window.open(linkToAdd);
    }
    }else if(this.currentMood.mood == 'sad'){
      var promptIndexSelected = Math.random() * (this.SadDo.length+1);
      if(promptIndexSelected >= this.SadDo.length){
        this.router.navigate([this.returnUrl]);  
      }else{
      linkToAdd = this.SadDo[Math.floor(promptIndexSelected)].link;
      window.open(linkToAdd);
    }
    }else if(this.currentMood.mood == 'content'){
      var promptIndexSelected = Math.random() * (this.ContentDo.length);
      if(promptIndexSelected >= this.ContentDo.length){
        this.router.navigate([this.returnUrl]);  
      }else{
      linkToAdd = this.ContentDo[Math.floor(promptIndexSelected)].link;
      window.open(linkToAdd);
    }
    }
  }
  

}
