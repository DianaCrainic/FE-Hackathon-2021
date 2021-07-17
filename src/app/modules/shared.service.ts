import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  // readonly APIUrlMovies = 'http://127.0.0.1:5001/api/v2.0/';
  constructor(private http: HttpClient) { }


  getProfessorPagination(page: any, entitiesPerPage: any): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/api/v1/professors` + '?page=' + page + '&size=' + entitiesPerPage);
  }

 

  getCount(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/v1/users` + '/count');
  }

  
}
