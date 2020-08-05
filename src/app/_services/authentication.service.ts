import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    private currentMoodSubject: BehaviorSubject<any>;
    public currentMood: Observable<any>;
    public currentJournalSubject: BehaviorSubject<any>;
    public currentJournal: any;
    public currentMeetingSubject: BehaviorSubject<any>;
    public currentMeeting: any;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();

        this.currentMoodSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentMood')));
        this.currentMood = this.currentMoodSubject.value;
        
        this.currentJournalSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentJournal')));
        this.currentJournal = this.currentJournalSubject.value;

        this.currentMeetingSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentMeeting')));
        this.currentMeeting = this.currentMeetingSubject.value;
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    public get currentMeetingValue() {
        return this.currentMeetingSubject.value;
    }

    public get currentMoodValue() {
        return this.currentMoodSubject.value;
    }

    public get currentJournalValue() {
        return this.currentJournalSubject.value;
    }

    fakeLogin(username, password) {
        return this.http.post<any>(`http://localhost:8080/api/fakeLogin`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(JSON.stringify(user));
                
                return user;
            }));
    }


//https://meaningful-minutes.herokuapp.com
    login(username, password) {
        return this.http.post<any>(`http://localhost:8080/api/login`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(JSON.stringify(user));
                
                return user;
            }));
    }

    addAFriend(_id, friendToAdd){
        return this.http.put<any>(`https://meaningful-minutes.herokuapp.com/api/addAFriend`, { _id, friendToAdd })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUser = user;
            //this.currentUserSubject.next(JSON.stringify(user));
            return user;
        }));
    }

    getAllUsers(){
        return this.http.get<any>(`https://meaningful-minutes.herokuapp.com/api/getAllUsers`);
    }

    getAllJournals(){
        return this.http.get<any>(`https://meaningful-minutes.herokuapp.com/api/getAllJournals`);
    }

    saveJournal(username, title, prompt, day, month, year, text, type){
        return this.http.post<any>(`https://meaningful-minutes.herokuapp.com/api/saveJournalEntry`, {username, title, prompt, day, month, year, text, type});
    }

    getAllMeetings(){
        return this.http.get<any>(`https://meaningful-minutes.herokuapp.com/api/getAllMeetings`);
    }

    createMeeting(username, participants, day, month, year, startTime, endTime, title, host){
        return this.http.post<any>(`https://meaningful-minutes.herokuapp.com/api/createMeeting`, {username, participants, day, month, year, startTime, endTime, title, host});
    }

    acceptMeeting(meeting, index){
        console.log("in the authentication for accepted");
        var _id = meeting._id;
        console.log("_id: " + _id);

        return this.http.put<any>(`https://meaningful-minutes.herokuapp.com/api/acceptMeeting`, {_id, index})
        .pipe(map(user => {
            console.log("inside the pipe")
            return user;
        }));
    }

    declineMeeting(meeting, index) {
        console.log('inside new declineMeeting in auth');
        var _id = meeting._id;
        console.log("_id: " + _id);

        return this.http.put<any>(`https://meaningful-minutes.herokuapp.com/api/declineMeeting`, {_id, index})
        .pipe(map(user => {
            console.log("inside the pipe")
            return user;
        }));
    }
    
    saveMood(username, mood, day, month, year){
        return this.http.post<any>(`https://meaningful-minutes.herokuapp.com/api/saveMood`, {username, mood, day, month, year})
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentMood', JSON.stringify(user));
            this.currentUserSubject.next(JSON.stringify(user));
            
            return user;
        }));
    }

    getAllMoods(){
        return this.http.get<any>(`https://meaningful-minutes.herokuapp.com/api/getAllMoods`);
    }

    
    deleteMood(id, mood) {
        console.log('inside new deleteMood in auth');
        return this.http.put<any>(`https://meaningful-minutes.herokuapp.com/api/removeMood`, {id, mood})
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentMood', JSON.stringify(user));
            this.currentUserSubject.next(JSON.stringify(user));
            
            return user;
        }));
    }

    updatePromptJournal(_id, title, textEntry){
        console.log('hi')
        return this.http.put<any>(`https://meaningful-minutes.herokuapp.com/api/updatePromptJournal`, {_id, title, textEntry})
        .pipe(map(user => {
            console.log('in update')
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.removeItem('currentJournal');
            localStorage.removeItem('currentJournal')
        }));
    }

    updateUser(_id, userData){
        console.log('hi')
        console.log(userData)
        return this.http.put<any>(`https://meaningful-minutes.herokuapp.com/api/updateUser`, {_id, userData})
        .pipe(map(user => {
            console.log('in update')
            //console.log(user)
            //this.currentUser = user;
            //localStorage.setItem('currentUser', JSON.parse(user).asObservable())
            return user;
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.removeItem('currentJournal');
            //localStorage.removeItem('currentJournal')
        }));
    }

    deleteJournal(_id){
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
              }),
            body: {
                _id: _id
            },
        };
        return this.http.delete<any>(`https://meaningful-minutes.herokuapp.com/api/deleteJournal`, options)
    }

    deleteUser(_id){
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
              }),
            body: {
                _id: _id
            },
        };
        return this.http.delete<any>(`https://meaningful-minutes.herokuapp.com/api/deleteUser`, options)
    }

    deleteMeeting(_id){
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
              }),
            body: {
                _id: _id
            },
        };
        return this.http.delete<any>(`https://meaningful-minutes.herokuapp.com/api/deleteMeeting`, options)
    }


    updateFreeJournal(_id, title, textEntry){
        console.log('hi')
        return this.http.put<any>(`https://meaningful-minutes.herokuapp.com/api/updateFreeJournal`, {_id, title, textEntry})
        .pipe(map(user => {
            console.log('in update')
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.removeItem('currentJournal');
            localStorage.removeItem('currentJournal')
        }));
    }
 
    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    register(user) {
        console.log('in auth');
        return this.http.post(`http://localhost:8080/api/register`, user);
    }

    delete(id) {
        return this.http.delete(`https://meaningful-minutes.herokuapp.com/api/deleteUser`, id);
    }

    // delete(id) {
    //     return this.http.delete(`http://localhost:8080/api/deleteUser`, id);
    // }



}