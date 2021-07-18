import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateConversationRequest } from 'src/app/shared/models/create-conversation-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
    constructor(private http: HttpClient) { }

    getById(id: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/api/v1/conversations/${id}`);
    }

    getByStudentId(studentId: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/api/v1/conversations/students/${studentId}`);
    }

    getByProfessorId(professorId: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/api/v1/conversations/professors/${professorId}`);
    }

    create(conversation: CreateConversationRequest): Observable<any> {
        return this.http.post<CreateConversationRequest>(`${environment.apiUrl}/api/v1/conversations`, conversation);
    }
}
