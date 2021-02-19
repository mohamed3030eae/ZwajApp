import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { User } from "src/app/_models/user";
import { AlertifyService } from "src/app/_services/alertify.service";
import { AuthService } from "src/app/_services/auth.service";
import { UserService } from "src/app/_services/user.service";

@Component({
  selector: "app-member-card",
  templateUrl: "./member-card.component.html",
  styleUrls: ["./member-card.component.css"],
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;
  constructor(
    public authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}


  sendLike(id:number) {
    this.userService.sendLike(this.authService.decodedToken.nameid,id).subscribe(
      (next) => {
        this.alertify.success("لقد قمت بالإعجاب بـ"+this.user.knownAs);
      },
      (error) => {
        this.alertify.error(error);
      }
    )
  }



}
