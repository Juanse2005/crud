import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { usersApi } from '../interfaces/usersInterface';




@Injectable({
  providedIn: 'root'
})


export class UsersService {
  private API_URL = 'http://localhost:5057/api/Users';
  private USAPI_URL = 'http://localhost:5057/api/Auth';
  constructor(private http: HttpClient) {}
  
  
  getAll(): Observable<usersApi[]>{
    return this.http.get<usersApi[]>(this.API_URL);
  }
  getUserById(id: number): Observable<usersApi> {
    return this.http.get<usersApi>(`${this.API_URL}/${id}`);
  }
  deleteData(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
  saveData(userApi: usersApi): Observable<any> {
    return this.http.post (this.API_URL, userApi);
  }
  updateData(id: number, userApi: usersApi): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/${id}`, userApi);
  }
  login(user: usersApi): Observable<any> {
    return this.http.post(`${this.USAPI_URL}/login`, user);
  }
}