import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateConversationRequest } from 'src/app/shared/models/create-conversation-request';
import { CreateMessageRequest } from 'src/app/shared/models/create-message-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
    constructor(private http: HttpClient) { }

    getByConversationId(conversationId: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/api/v1/messages/conversations/${conversationId}`);
    }

    create(message: CreateMessageRequest): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/api/v1/messages`, message);
    }
}
