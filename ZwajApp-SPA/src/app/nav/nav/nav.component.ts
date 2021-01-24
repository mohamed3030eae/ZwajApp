import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { nextTick } from "process";
import { AlertifyService } from "src/app/_services/alertify.service";
import { AuthService } from "src/app/_services/auth.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl:string;
  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(
     photooUrl =>this.photoUrl=photooUrl
    );
  }

  Login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        this.alertify.success("تم الدخول بنجاح");
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
    localStorage.removeItem("user");
    this.authService.currentUser=null;
    this.alertify.message("تم الخروج");
    this.router.navigate(["/home"]);
  }
}
