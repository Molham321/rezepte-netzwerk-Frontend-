import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from 'src/app/interfaces';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:8080/users/'

  constructor(private http: HttpClient) { }

  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.baseUrl);
  }

  getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(this.baseUrl + id);
  }

  updateUserById(id: string, username?: string, email?: string, password?: string): Observable<IUser> {

    const userUpdateData = {
      username,
      email,
      password
    };

    return this.http.post<IUser>(this.baseUrl + id, userUpdateData)
      .pipe(
        map(response => {
          console.log('update user response: ' + response);
          return response;
        }),
        catchError(error => {
          console.error('update user error: ', error);

          let errorMessage = 'An error occured during user update';

          return throwError(errorMessage);
        })
      )
  }
}
