import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, retry } from 'rxjs';
import { User } from '../_models/users';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "https://localhost:7115/api/"
  private currentuserObs = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentuserObs.asObservable();
  constructor( private http: HttpClient) { }

    loginUser(model: any) {
      return this.http.post<User>(this.baseUrl+ "account/login",model).pipe(
       map((response :User) => {
        const user = response;
        if(user) {
          localStorage.setItem("user",JSON.stringify(user));
          this.currentuserObs.next(user)
        }
       }
       )
      )
    }

    registerUser(model : any) {
      return this.http.post<User>(this.baseUrl+"account/register",model).pipe(
        map((response : User) => {
          const user = response;
          if(user) {
            localStorage.setItem("user",JSON.stringify(user));
            this.currentuserObs.next(user)
          }
          return user
        })
      )

    }

    setCurrentUser(user: User) {
      this.currentuserObs.next(user)
    }

    logoutApp() {
      localStorage.removeItem("user");
      this.currentuserObs.next(null)
    }
}
