import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Message } from "../_models/message";
import { User } from "../_models/user";
import { AlertifyService } from "../_services/alertify.service";
import { AuthService } from "../_services/auth.service";
import { UserService } from "../_services/user.service";

@Injectable()
export class MessageResolver implements Resolve<Message[]> {
  pageNumber=1;
  pageSize=6;
  messageType='Unread';
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private alertfy: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
    return this.userService.getMessages(this.authService.decodedToken.nameid,this.pageNumber,this.pageSize,this.messageType).pipe(
        catchError(error => {
            this.alertfy.error('يوجد مشكلة فى عرض الرسائل');
            this.router.navigate(['']);
            return of(null);
        })
    )
  }
}
