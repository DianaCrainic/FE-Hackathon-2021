import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ConversationService } from 'src/app/core/services/conversation.service';
import { Conversation } from 'src/app/shared/models/conversation.model';
import { User } from 'src/app/shared/models/users/user.model';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.css']
})
export class ConversationsComponent implements OnInit {
  user: User;
  conversations: Conversation[] = [];
  displayedColumns: string[] = ['name', 'message'];

  constructor(
    private titleService: Title,
    private conversationService: ConversationService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.user = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.titleService.setTitle('My Conversations');
    if (this.user.role === 'STUDENT') {
       this.conversationService.getByStudentId(this.user.ownerId as number).subscribe(data => this.conversations = data);
    } else {
      this.conversationService.getByProfessorId(this.user.ownerId as number).subscribe(data => this.conversations = data);
    }
  }

  isUserStudent(): boolean {
    return this.user.role === 'STUDENT';
  }

  isUserProfessor(): boolean {
    return this.user.role === 'PROFESSOR';
  }

  seeMessages(conversationId: number) {
    this.router.navigate([`/conversations/${conversationId}`]);
  }
}
