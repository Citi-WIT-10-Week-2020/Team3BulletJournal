import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    private currentMoodSubject: BehaviorSubject<any>;
    public currentMood: Observable<any>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();

        this.currentMoodSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentMood')));

        this.currentMood = this.currentMoodSubject.value;
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    public get currentMoodValue() {
        return this.currentMoodSubject.value;
    }

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
        return this.http.put<any>(`http://localhost:8080/api/addAFriend`, { _id, friendToAdd })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(JSON.stringify(user));
            
            return user;
        }));
    }

    getAllUsers(){
        return this.http.get<any>(`http://localhost:8080/api/getAllUsers`);
    }

    getAllJournals(){
        return this.http.get<any>(`http://localhost:8080/api/getAllJournals`);
    }

    saveJournal(username, title, day, month, year, text){
        return this.http.post<any>(`http://localhost:8080/api/saveJournalEntry`, {username, title, day, month, year, text});
    }

    getAllMeetings(){
        return this.http.get<any>(`http://localhost:8080/api/getAllMeetings`);
    }

    createMeeting(username, participants, day, month, year, time){
        return this.http.post<any>(`http://localhost:8080/api/createMeeting`, {username, participants, day, month, year, time});
    }
  
    createRandomMeeting(username, numPeople, day, month, year, time){
        return this.http.post<any>(`http://localhost:8080/api/createRandomMeeting`, {username, numPeople, day, month, year, time});
    }
    
    saveMood(username, mood, day, month, year){
        return this.http.post<any>(`http://localhost:8080/api/saveMood`, {username, mood, day, month, year})
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentMood', JSON.stringify(user));
            this.currentUserSubject.next(JSON.stringify(user));
            
            return user;
        }));
    }
 
    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    register(user) {
        return this.http.post(`http://localhost:8080/api/register`, user);
    }

    delete(id) {
        return this.http.delete(`http://localhost:8080/api/deleteUser`, id);
    }
}