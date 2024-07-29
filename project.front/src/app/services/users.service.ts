import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

//(`http://localhost:5057/api/Users`);


export class UsersService {
  API_URL: string = 'http://localhost:5057/api/Users';
  constructor(private httpClient: HttpClient) {}
  

  getData(): Observable<any>{
    return this.httpClient.get(this.API_URL).pipe(res=>res);
  }

}