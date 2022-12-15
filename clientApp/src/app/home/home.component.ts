import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isregister = false
  users :any = {};

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.getUsers();
  }

  clickRegister() {
    this.isregister = !this.isregister
  }

  getUsers() {
    this.http.get("https://localhost:7115/api/users/").subscribe(
      {
        next : response => this.users = response,
        error : error => console.log(error),
        complete : () =>  console.log("complete")
      });
  }

  cancelRegisterMode(event : boolean)
  {
    this.isregister = event;
  }
}
