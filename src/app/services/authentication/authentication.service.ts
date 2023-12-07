import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { IUser } from 'src/app/interfaces';
import { catchError, map } from 'rxjs/operators';
import { Observable, BehaviorSubject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl = 'http://localhost:8080/auth/'
  private userSubject: BehaviorSubject<IUser | null>;
  public user: Observable<IUser | null>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(email: string, password: string): Observable<IUser> {
    const loginData = { email, password };
    return this.http.post<IUser>(this.baseUrl + "login", loginData)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }),
        catchError(error => {
          // Custom error handling based on the error response
          let errorMessage = 'An error occurred during login.';

          if (error) {
            errorMessage = 'Invalid email or password.';
          }

          // Forward the error to the subscriber
          return throwError(errorMessage);
        })
      );
  }

  register(username: string, email: string, password: string): Observable<IUser> {
    const loginData = { username, email, password };
    return this.http.post<IUser>(this.baseUrl + "register", loginData)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }),
        catchError(error => {
          // Custom error handling based on the error response
          let errorMessage = 'An error occurred during register.';

          if (error) {
            errorMessage = 'email already exists';
          }

          // Forward the error to the subscriber
          return throwError(errorMessage);
        })
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
