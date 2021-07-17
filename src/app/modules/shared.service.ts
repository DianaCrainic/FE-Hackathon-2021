import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrlMovies = 'http://127.0.0.1:5001/api/v2.0/';
  readonly APIUrlRatings = 'http://127.0.0.1:5003/api/v2.0/';
  readonly APIUrlRecommendations = 'http://127.0.0.1:5004/api/v1/';
  constructor(private http: HttpClient) { }

  getMoviesPagination(page: any, entitiesPerPage: any, title: any): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrlMovies + 'movies' + '?page=' + page + '&entitiesPerPage=' + entitiesPerPage + '&title=' + title);
  }

  getMovie(val: any): Observable<any> {
    return this.http.get(this.APIUrlMovies + 'movies/' + val);
  }

  getCount(): Observable<any> {
    return this.http.get(this.APIUrlMovies + 'movies/count');
  }

  getEmojiFace(): Observable<any> {
    const httpOptionsText = {
      headers: new HttpHeaders({
        Accept: 'text/plain',
        'Content-Type': 'text/plain'
            }),
      responseType: 'text' as 'json'
    };
    return this.http.get<any>('http://127.0.0.1:8000/video_feed/', httpOptionsText);
  }

  createRating(val: any): Observable<any> {
    return this.http.post(this.APIUrlRatings + 'ratings', val);
  }

  updateRating(val: any): Observable<any> {
    return this.http.put(this.APIUrlRatings + 'ratings', val);
  }

  deleteRating(val: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: val
    };
    return this.http.delete(this.APIUrlRatings + 'ratings', httpOptions);
  }

  getRatingsForUser(val: any): Observable<any> {
    return this.http.get(this.APIUrlRatings + 'ratings/users/' + val);
  }

  getRatingForMovieAndUser(movieId: any, userId: any): Observable<any> {
    return this.http.get(this.APIUrlRatings + 'ratings/movies/' + movieId + '/users/' + userId);
  }

  getRecommendedMovies(val: any): Observable<any> {
    return this.http.get(this.APIUrlRecommendations + 'recommendations/' + val);
  }
}
