import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginRequest } from 'src/app/shared/models/users/login-request';
import { RegisterRequest } from 'src/app/shared/models/users/register-request';
import { User } from 'src/app/shared/models/users/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        const user = localStorage.getItem('user') || '{}';
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(user));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    register(registerRequest: RegisterRequest): Observable<any> {
        return this.http.post<User>(`${environment.apiUrl}/api/v1/users/register-as-student`, registerRequest)
            .pipe(map(user => {
                localStorage.setItem('user', JSON.stringify(user));
                this.currentUserSubject.next(user);
                this.router.navigate(['login']);
                return user;
            }));
    }

    login(loginRequest: LoginRequest): Observable<any> {
        return this.http.post<User>(`${environment.apiUrl}/api/v1/users/login`, loginRequest)
            .pipe(map(user => {
                localStorage.setItem('user', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout(): void {
        localStorage.removeItem('user');
        this.currentUserSubject.next({});
        this.router.navigate(['login']);
    }
}
