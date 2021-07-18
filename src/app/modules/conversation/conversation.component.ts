import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ConversationService } from 'src/app/core/services/conversation.service';
import { MessageService } from 'src/app/core/services/message.service';
import { Conversation } from 'src/app/shared/models/conversation.model';
import { Message } from 'src/app/shared/models/message.model';
import { User } from 'src/app/shared/models/users/user.model';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  user: User;
  conversation: Conversation | undefined;
  messages: Message[] | undefined;
  needToCreateConversation: boolean = false;

  sendMessageForm = this.formBuilder.group({
    messageContent: new FormControl('', Validators.required),
  });

  constructor(
    private titleService: Title,
    private conversationService: ConversationService,
    private messageService: MessageService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.user = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.titleService.setTitle('Conversation');
    this.conversationService.getById(this.getConversationId()).subscribe(
      data => {
        this.conversation = data;
        this.messageService.getByConversationId(this.getConversationId()).subscribe(data => this.messages = data);
      },
      error => {
        this.needToCreateConversation = true;
      }
    );
  }

  getConversationId(): number {
    return this.route.snapshot.params.id;
  }

  public getUser(): User {
    return this.authenticationService.currentUserValue;
  }

  get fields(): any {
    return this.sendMessageForm.controls;
  }

  sendMessage(): void {
    if (this.needToCreateConversation) {
      this.conversationService.create({studentId: this.getUser().ownerId!, professorId: this.getConversationId()}).subscribe();
    }

    this.messageService.create({
      senderRole: this.getUser().role!,
      conversationId: this.getConversationId(),
      content: this.fields.messageContent.value
    }).subscribe(
      () => this.messages!.push({senderRole: this.getUser().role!, content: this.fields.messageContent.value})
    );
  }
}
