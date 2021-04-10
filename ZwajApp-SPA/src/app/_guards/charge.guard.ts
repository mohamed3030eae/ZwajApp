import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ChargeGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}
  canActivate():boolean{
    this.userService.getPaymentForUser(this.authService.currentUser.id).subscribe(
      res => {
        if(res == null) return true;
        else{
          this.router.navigate(['messages']);
          return false;
        }
      }
    ); 
    return true;
  }
}
