import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { HomeComponent } from './modules/home/home.component';
import { ProfessorsComponent } from './modules/professors/professors.component';
import { RegisterComponent } from './modules/account/register/register.component';
import { LoginComponent } from './modules/account/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ConversationsComponent } from './modules/conversations/conversations.component';
import { ProfessorsInfoComponent } from './modules/professors/professors-info/professors-info.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { ProfileComponent } from './modules/profile/profile.component';
import { ConversationComponent } from './modules/conversation/conversation.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [{
      path: '',
      component: HomeComponent,
    }, {
      path: 'professors',
      component: ProfessorsComponent,
      canActivate: [AuthGuard, RoleGuard],
      data: {
          role: 'STUDENT'
      }
    }, {
      path: 'professors/:id',
      component: ProfessorsInfoComponent
    }, {
      path: 'conversations',
      component: ConversationsComponent
    }, {
      path: 'conversations/:id',
      component: ConversationComponent
    }, {
      path: 'register',
      component: RegisterComponent
    }, {
      path: 'login',
      component: LoginComponent
    }, {
      path: 'profile',
      component: ProfileComponent,
      canActivate: [AuthGuard]
    }],
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
