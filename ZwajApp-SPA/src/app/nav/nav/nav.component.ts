import { Component, OnInit } from '@angular/core';
import { Console } from 'console';
import { nextTick } from 'process';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
 model:any={};
  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  Login() {
    this.authService.login(this.model).subscribe(
    next=>{console.log('تم الدخول بنجاح')},
    erorr=>{console.log("فشل الدخول")}

    )
  }


  LoggedIn(){
const token=localStorage.getItem('token');
return !! token
  }

  LoggedOut(){
localStorage.removeItem('token');
console.log('تم الخروج')

  }

  

}
