import { Component, Input, OnInit } from '@angular/core';
import { Observable, of, VirtualTimeScheduler } from 'rxjs';
import { User } from '../_models/users';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model : any = {};
  //currentUser$ : Observable<User | null> = of(null);
  constructor(public accountservice : AccountService) { }

  ngOnInit(): void {
      //this.currentUser$ = this.accountservice.currentUser$;
  }

  // setCurrentUSer() {
  //   this.accountservice.currentUser$.subscribe({
  //     next : user => this.loginUser = !!user,
  //     error : errorms => console.log(errorms)
  //   })
  // }

  login() {
    this.accountservice.loginUser(this.model).subscribe({
      next : response => {
        console.log(response);
      },
      error : errormsg => console.log(errormsg)      
    })
  }

  logout() {
    this.accountservice.logoutApp();
  }

}
