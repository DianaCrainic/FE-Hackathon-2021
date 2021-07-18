import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Thesis } from 'src/app/shared/models/thesis.model';
import { UpdateThesisRequest } from 'src/app/shared/models/update-thesis-request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThesisService {
    constructor(private http: HttpClient) { }

    getAll(profId: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/api/v1/theses/professors/${profId}`);
    }

    getById(id: number): Observable<Thesis> {
        return this.http.get<Thesis>(`${environment.apiUrl}/api/v1/theses/${id}`);
    }

    update(id: number, thesis: UpdateThesisRequest): Observable<Thesis> {
        return this.http.post<Thesis>(`${environment.apiUrl}/api/v1/theses/${id}`, thesis);
    }

    deleteById(id: number): Observable<Thesis> {
        return this.http.delete<Thesis>(`${environment.apiUrl}/api/v1/theses/${id}`);
    }
}
