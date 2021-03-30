import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {



  constructor(public authService:AuthService ,private alertify : AlertifyService ,private router:Router) {
        
  }
  canActivate():  boolean {

    if(this.authService.loggedIn()){
      this.authService.hubConnection.stop();
      return true;
    }
    this.alertify.error("يجب تسجيل الدخول أولا!");
    this.router.navigate([''])
    return false;
  }
}
