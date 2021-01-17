// import { Injectable } from "@angular/core";
// import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
// import { Observable, of } from "rxjs";
// import { catchError } from "rxjs/operators";
// import { User } from "../_models/user";
// import { AlertifyService } from "../_services/alertify.service";
// import { UserService } from "../_services/user.service";

// @Injectable()
// export class MemberDetailResolver implements Resolve<User> {
//   constructor(private userService: UserService,private router: Router,private alertfy: AlertifyService) {}

//   resolve(route: ActivatedRouteSnapshot): Observable<User> {
//     return this.userService.getUser(route.params["id"]).pipe(
//       catchError(error => {
//         this.alertfy.error('يوجد مشكلة فى عرض البيانات');
//         this.router.navigate(['/members']);
//         return of(null);
//       })
//     )
//   }
// }
import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { User } from "../_models/user";
import { UserService } from "../_services/user.service";
import { AlertifyService } from "../_services/alertify.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class MemberDetailResolver implements Resolve<User>{
    constructor(private userService:UserService,private router:Router,private alertify:AlertifyService){}
    resolve(route:ActivatedRouteSnapshot):Observable<User>{
        return this.userService.getUser(route.params['id']).pipe(
          catchError(error => {
              this.alertify.error('يوجد مشكلة في عرض البيانات');
              this.router.navigate(['/members']);
              return of(null);

          })  
        )
    }
}