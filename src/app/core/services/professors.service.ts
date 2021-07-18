import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from 'src/app/shared/models/persons/professor.model';
import { UpdateProfessorRequest } from 'src/app/shared/models/persons/update-professor-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
    constructor(private http: HttpClient) { }

    getAll(page: number, size: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/api/v1/professors?page=${page}&size=${size}`);
    }

    getById(id: number): Observable<Professor> {
        return this.http.get<Professor>(`${environment.apiUrl}/api/v1/professors/${id}`);
    }

    update(id: number, professor: UpdateProfessorRequest): Observable<any> {
        return this.http.put<UpdateProfessorRequest>(`${environment.apiUrl}/api/v1/professors/${id}`, professor);
    }
}
