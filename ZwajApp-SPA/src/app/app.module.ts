import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsDatepickerModule, BsDropdownModule, ButtonsModule, PaginationModule, TabsModule } from "ngx-bootstrap";
import { RouterModule } from "@angular/router";
import { JwtModule } from "@auth0/angular-jwt";
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from "ng2-file-upload";

import { AppComponent } from "./app.component";
import {TimeAgoPipe} from 'time-ago-pipe';
import { NavComponent } from "./nav/nav/nav.component";
import { AuthService } from "./_services/auth.service";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { ErrorInterceptorProvidor } from "./_services/error.interceptor";
import { AlertifyService } from "./_services/alertify.service";

import { MemberListComponent } from "./members/member-list/member-list.component";
import { ListsComponent } from "./lists/lists.component";
import { MessagesComponent } from "./messages/messages.component";
import { appRoutes } from "./routes";
import { AuthGuard } from "./_guards/auth.guard";
import { UserService } from "./_services/user.service";
import { MemberCardComponent } from "./members/member-card/member-card.component";
import { MemberDetailComponent } from "./members/member-detail/member-detail.component";
import { MemberDetailResolver } from "./_resolver/member-detail.resolver";
import { MemberListResolver } from "./_resolver/member-list.resolver";
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from "./_resolver/member-edit.resolver";
import { PreventUnsavedChangesGuard } from "./_guards/prevent-unsaved-changes.guard";
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { ListResolver } from "./_resolver/list.resolver";
import { MessageResolver } from "./_resolver/message.resolver";
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { PaymentComponent } from './payment/payment.component';





export function tokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [	
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TimeAgoPipe,
    MemberMessagesComponent,
    PaymentComponent
     
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    NgxGalleryModule, //الاسليدر
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ButtonsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    TabsModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    })

  ],
  providers: [
    AuthService,
    ErrorInterceptorProvidor,
    AlertifyService,
    AuthGuard,
    PreventUnsavedChangesGuard,
    UserService,
    MemberDetailResolver,
    MemberListResolver, 
    MemberEditResolver, 
    ListResolver,
    MessageResolver
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
