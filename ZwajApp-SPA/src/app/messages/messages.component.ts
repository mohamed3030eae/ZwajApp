import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../_models/message';
import { Pagination, PaginationResult } from '../_models/Pagination';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
messages:Message[];
pagination:Pagination;
messageType='Unread';
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute ,
    private alertfy: AlertifyService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(
    data=>{
      this.messages=data['messages'].result;
      this.pagination=data['messages'].pagination;
    }

    )

  }

  loadMessages(){
    this.userService.getMessages(this.authService.decodedToken.nameid,this.pagination.currentPage,
      this.pagination.itemsPerPage,this.messageType).subscribe(
        (res:PaginationResult<Message[]>)=>{
          this.messages=res.result;
          this.pagination=res.pagination;
        },
        error=>this.alertfy.error(error)
      )
  }

  pageChanged(event:any):void{
  this.pagination.currentPage=event.page;
  this.loadMessages();
  }

  deleteMessage(id:number){
    this .alertfy.confirm('هل أنت متأكد من حذف تلك الرسالة',()=>{
      this.userService.deleteMessage(id,this.authService.decodedToken.nameid).subscribe(()=>{
        this.messages.splice(this.messages.findIndex(m=>m.id),1);
        this.alertfy.success('تم حذف الرسالة بنجاح');
      },
      error=>this.alertfy.error(error)
      )
    })
  }

}
