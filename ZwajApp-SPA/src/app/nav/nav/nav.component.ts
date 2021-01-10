import { Component, OnInit } from '@angular/core';

import { nextTick } from 'process';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
 model:any={};
  constructor(public authService:AuthService ,private alertify : AlertifyService) { }

  ngOnInit() {
  }

  Login() {
    this.authService.login(this.model).subscribe(
    next=>{this.alertify.success('تم الدخول بنجاح')},
    error=>{this.alertify.error(error)}

    )
  }

// التأكد من صحة التكون 
  LoggedIn(){
  return this.authService.loggedIn();
  }

  LoggedOut(){
  localStorage.removeItem('token');
  this.alertify.message('تم الخروج')

  }

  

}
