import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
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
    }

    getAllUsers(){
        return this.http.get<any>(`http://localhost:8080/api/getAllUsers`);
        // .pipe(map(user => {
        //     // store user details and jwt token in local storage to keep user logged in between page refreshes
        //     JSON.stringify(user);
        //     // localStorage.setItem('currentUser', JSON.stringify(user));
        //     // this.currentUserSubject.next(user);
        //     return user;
        // }));
        
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