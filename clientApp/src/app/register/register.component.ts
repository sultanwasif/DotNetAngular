import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model :any = {};
  // @Input() userFromHomeScreen : any
  @Output() cancelRegisterMode = new EventEmitter();

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  onRegister(modelany : any) {
    this.accountService.registerUser(modelany).subscribe({
      next : response => {
        console.log(response)
      },
      error : err => console.log(err)
    })
    console.log(modelany);
    this.onCancel();
  }

  onCancel(){
    this.model = {};
    console.log("On Cancel")
    this.cancelRegisterMode.emit(false);
  }


}
