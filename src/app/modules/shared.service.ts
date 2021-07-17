import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrlMovies = 'http://127.0.0.1:5001/api/v2.0/';
  constructor(private http: HttpClient) { }


  getProfessorPagination(page: any, entitiesPerPage: any, title: any): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrlMovies + 'movies' + '?page=' + page + '&entitiesPerPage=' + entitiesPerPage + '&title=' + title);
  }

 

  getCount(): Observable<any> {
    return this.http.get(this.APIUrlMovies + 'movies/count');
  }

  
}
