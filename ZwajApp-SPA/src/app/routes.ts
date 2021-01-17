import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ListsComponent } from "./lists/lists.component";
import { MemberDetailComponent } from "./members/member-list/member-detail/member-detail.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { MessagesComponent } from "./messages/messages.component";
import { AuthGuard } from "./_guards/auth.guard";
import { MemberDetailResolver } from "./_resolver/member-detail.resolver";
import { MemberListResolver } from "./_resolver/member-list.resolver";

export const appRoutes: Routes = [
  { path: "", component: HomeComponent },

  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      {
        path: "members",
        component: MemberListComponent,
        canActivate: [AuthGuard],
        resolve:{
          users:MemberListResolver
        }
      },
      {
        path: "members/:id",
        component: MemberDetailComponent,
        canActivate: [AuthGuard],
        resolve:{
          user:MemberDetailResolver
        }
      },
      
      { path: "lists", component: ListsComponent, canActivate: [AuthGuard] },
      {
        path: "messages",
        component: MessagesComponent,
        canActivate: [AuthGuard],
      },
    ],
  },

  { path: "**", redirectTo: "", pathMatch: "full" },
];

