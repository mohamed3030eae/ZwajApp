import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Message } from '../_models/message';
import { PaginationResult } from '../_models/Pagination';
import { User } from '../_models/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl=environment.apiURL+'users/';
constructor(private http:HttpClient) { }

getUsers(page?,itemsPerPage?,userParams?,likeParam?):Observable<PaginationResult<User[]>>{
  const paginationResult:PaginationResult<User[]> =new PaginationResult<User[]>();
  let params=new HttpParams();
  if (page != null && itemsPerPage != null ) {
    params=params.append('pageNumber',page);
    params=params.append('pageSize',itemsPerPage);
  }
  if (userParams != null ) {
    params=params.append('maiAge',userParams.mainAge);
    params=params.append('maxAge',userParams.maxAge);
    params=params.append('gender',userParams.gender);
    params=params.append('orderBy',userParams.orderBy);
  }
  if(likeParam ==='likers'){
    params = params.append('likers','true');
  }
  if(likeParam ==='likees'){
    params = params.append('likees','true');
  }
  return this.http.get<User[]>(this.baseUrl,{observe:'response',params}).pipe(
   map(response=>{
    paginationResult.result=response.body;
    if (response.headers.get('Pagination') !=  null) {
      paginationResult.pagination=JSON.parse(response.headers.get('Pagination'))
    }
    return paginationResult;
   })

  );
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

sendLike(id:number, recipientId:number){
  return this.http.post(this.baseUrl+id+'/like/'+recipientId,{});

}

getMessages(id:number, page?,itemsPerPage?,messageType?){
  const paginationResult:PaginationResult<Message[]> =new PaginationResult<Message[]>();
  let params=new HttpParams();
  params=params.append('MessageType',messageType);
  if (page != null && itemsPerPage != null ) {
    params=params.append('pageNumber',page);
    params=params.append('pageSize',itemsPerPage);
  }
  return this.http.get<Message[]>(this.baseUrl+id+'/Messages',{observe:'response',params}).pipe(
    map(response=>{
      paginationResult.result=response.body;
      if (response.headers.get('Pagination') !==null ) {
        paginationResult.pagination=JSON.parse(response.headers.get('Pagination'))
      }
      return paginationResult;
    })
  );
 
}

getConversation(id:number,recipientId){
  return this.http.get<Message[]>(this.baseUrl+id+'/Messages/chat/'+recipientId);
}

SendMessage(id:number,message:Message){
  return this.http.post(this.baseUrl+id+'/messages/',message);
}

getUnreadCount(userId){
  return this.http.get(this.baseUrl+userId+'/messages/count');
}

markAsRead(userId:number,messageId:number){
  return this.http.post(this.baseUrl+userId+'/messages/read/'+messageId,{}).subscribe();
}

deleteMessage(id:number,userId:number){
  return this.http.post(this.baseUrl+userId+'/messages/'+id,{});
}


charge(userId:number,stripeToken:string){
  return this.http.post(this.baseUrl+userId+'/charge/'+stripeToken,{});
}

getPaymentForUser(userId:number){
  return this.http.get(this.baseUrl+userId+'/payment');
}


}
