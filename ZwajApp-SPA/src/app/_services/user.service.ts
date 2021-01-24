import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl=environment.apiURL+'users/';
constructor(private http:HttpClient) { }

getUsers():Observable<User[]>{
  return this.http.get<User[]>(this.baseUrl);
}

getUser(id):Observable<User>{
  return this.http.get<User>(this.baseUrl+id);
 
}

updateUser(id:number,user:User){
  return this.http.put<User>(this.baseUrl+id,user);
 
}
setMainPhoto(userId:number,IdPhoto:number){
  return this.http.post(this.baseUrl+userId+'/photos/'+IdPhoto+'/setMain',{});

}

deletePhoto(userId:number,IdPhoto:number){
  return this.http.delete(this.baseUrl+userId+'/photos/'+IdPhoto);
}



}
