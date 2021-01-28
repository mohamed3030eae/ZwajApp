import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "../_models/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  jwtHelper = new JwtHelperService();

  baseUrl = environment.apiURL + "auth/";

  decodedToken: any;
  currentUser: User;
  photoUrl = new BehaviorSubject<string>("../../assets/User.png");
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) {}
  changeMemberPhoto(newPhotoUrl: string) {
    this.photoUrl.next(newPhotoUrl);
  }
  login(model: any) {
    return this.http.post(this.baseUrl + "login", model).pipe(
      map((Response: any) => {
        const user = Response;
        if (user) {
          localStorage.setItem("token", user.token);
          localStorage.setItem("user", JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
          this.changeMemberPhoto(this.currentUser.photoURL);
          // console.log(this.decodedToken);
        }
      })
    );
  }

  register(user: User) {
    return this.http.post(this.baseUrl + "register", user);
  }

  loggedIn() {
    try {
      const token = localStorage.getItem("token");
      return !this.jwtHelper.isTokenExpired(token);
    } catch {
      return false;
    }
  }
}
