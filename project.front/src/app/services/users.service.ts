import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { usersApi } from '../interfaces/usersInterface';




@Injectable({
  providedIn: 'root'
})


export class UsersService {
  private API_URL = 'http://localhost:5057/api/Users';
  constructor(private http: HttpClient) {}
  

  getAll(): Observable<usersApi[]>{
    return this.http.get<usersApi[]>(this.API_URL);
  }
  deleteData(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
  saveData(userApi: usersApi): Observable<any> {
    return this.http.post<void>(this.API_URL, userApi);
  }
  getUserById(id: number): Observable<usersApi> {
    return this.http.get<usersApi>(`${this.API_URL}/${id}`);
  }
}