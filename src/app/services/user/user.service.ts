import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from 'src/app/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:8080/users/'

  constructor(private http: HttpClient) { }

  getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(this.baseUrl + id);
  }
}
