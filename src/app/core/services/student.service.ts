import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/shared/models/persons/student.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/api/v1/students`);
    }

    getById(id: number): Observable<Student> {
        return this.http.get<Student>(`${environment.apiUrl}/api/v1/students/${id}`);
    }
}
