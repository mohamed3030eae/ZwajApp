import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  jwtHelper = new JwtHelperService();

  baseUrl = environment.apiURL + "auth/";

  decodedToken: any;

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.baseUrl + "login", model).pipe(
      map((Response: any) => {
        const user = Response;
        if (user) {
          localStorage.setItem("token", user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          console.log(this.decodedToken);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + "register", model);
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
