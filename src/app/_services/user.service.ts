import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        //return this.http.get<any[]>(`${environment.apiUrl}/users`);
    }

    register(user) {
        return this.http.post(`http://localhost:8080/api/register`, user);
    }

    delete(id) {
        //return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }
}