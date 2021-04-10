import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HubConnection,HubConnectionBuilder } from "@aspnet/signalr";

import { nextTick } from "process";
import { AlertifyService } from "src/app/_services/alertify.service";
import { AuthService } from "src/app/_services/auth.service";
import { UserService } from "src/app/_services/user.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl:string;
  count:string;
  hubConnection:HubConnection;
  constructor(
    public authService: AuthService,
    public userService: UserService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(
     photooUrl =>this.photoUrl=photooUrl);
     if(this.LoggedIn)
     {
      this.userService.getUnreadCount(this.authService.decodedToken.nameid).subscribe(
        res=>{this.authService.unreadCount.next(res.toString());
         this.authService.latestUnreadCount.subscribe(res =>{this.count=res;});
       }
      );
      this.getPaymentForUser();

     }
 

     this.hubConnection=new HubConnectionBuilder().withUrl("http://localhost:5000/chat").build();
     this.hubConnection.start();
     this.hubConnection.on('count', () => {
      setTimeout(() => {
            this.userService.getUnreadCount(this.authService.decodedToken.nameid).subscribe(res=>{
              this.authService.unreadCount.next(res.toString());
              this.authService.latestUnreadCount.subscribe(res=>{this.count=res;});
                   });
          }, 0);
  });
  }

  Login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        this.alertify.success("تم الدخول بنجاح");
        //Load Notefcation
        this.userService.getUnreadCount(this.authService.decodedToken.nameid).subscribe(res=>{
          this.authService.unreadCount.next(res.toString());
          this.authService.latestUnreadCount.subscribe(res=>{this.count=res;});
          this.getPaymentForUser();
               });	
      },
      (error) => {
        this.alertify.error(error);
      },
      () => {
        this.router.navigate(["/members"]);
      }
    );
  }

  // التأكد من صحة التكون
  LoggedIn() {
    return this.authService.loggedIn();
  }

  LoggedOut() {
    localStorage.removeItem("token");
    this.authService.decodedToken=null;
    this.authService.paid=false;
    localStorage.removeItem("user");
    this.authService.currentUser=null;
    this.alertify.message("تم الخروج");
    this.router.navigate(["/home"]);
  }
  getPaymentForUser(){
    this.userService.getPaymentForUser(this.authService.currentUser.id).subscribe(
    res =>{
      if(res !== null)
      this.authService.paid=true;
      else
      this.authService.paid=false;
    }

    )
  }


}
