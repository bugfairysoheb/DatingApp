import { Routes } from '@angular/router';
import { MemberListComponent } from "./member-list/member-list.component";
import { InterestslistComponent } from "./interestslist/interestslist.component";
import { MessagesComponent } from "./messages/messages.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: MemberListComponent},
            { path: 'list', component: InterestslistComponent},
            { path: 'messages', component: MessagesComponent},
        ]
    },
    { path: '**', redirectTo: 'home', pathMatch:'full'} //or match with the prefix of that
    

]