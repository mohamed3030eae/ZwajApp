import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
// import { ListLikesComponent } from "./list-likes/list-likes.component";
import { ListsComponent } from "./lists/lists.component";
import { MemberDetailComponent } from "./members/member-detail/member-detail.component";
import { MemberEditComponent } from "./members/member-edit/member-edit.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { MessagesComponent } from "./messages/messages.component";
import { PaymentComponent } from "./payment/payment.component";
import { AuthGuard } from "./_guards/auth.guard";
import { ChargeGuard } from "./_guards/charge.guard";
import { MessagesGuard } from "./_guards/messages.guard";
import { PreventUnsavedChangesGuard } from "./_guards/prevent-unsaved-changes.guard";
import { ListResolver } from "./_resolver/list.resolver";
import { MemberDetailResolver } from "./_resolver/member-detail.resolver";
import { MemberEditResolver } from "./_resolver/member-edit.resolver";
import { MemberListResolver } from "./_resolver/member-list.resolver";
import { MessageResolver } from "./_resolver/message.resolver";

export const appRoutes: Routes = [
  { path: "", component: HomeComponent },

  {
    path: "",
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: "members",
        component: MemberListComponent,
        canActivate: [AuthGuard],
        resolve: {users: MemberListResolver, },
      },
      {
        path: "member/edit",
        component: MemberEditComponent,
        resolve: { user: MemberEditResolver,},
        canDeactivate: [PreventUnsavedChangesGuard],
      },
      // { path: "member/edit", component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard],resolve:{user:MemberEditResolver} },
      {
        path: "members/:id",
        component: MemberDetailComponent,
        canActivate: [AuthGuard],
        resolve: {user: MemberDetailResolver, },
      },

      { path: "lists", component: ListsComponent, canActivate: [AuthGuard] ,resolve: {
        user: ListResolver }},
   
        { path: "messages", component: MessagesComponent, canActivate: [MessagesGuard] ,
        resolve: { messages: MessageResolver }},
        
        { path: "charge", component: PaymentComponent, canActivate: [ChargeGuard], }
   
    ]
  }, 

  { path: "**", redirectTo: "", pathMatch: "full" },
];