import { Injectable } from '@angular/core';
// import { FormBuilder, Validators } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Router } from '@angular/router';
// import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AccountService {}

//     // readonly APIUrl = 'http://127.0.0.1:5002/api/v2.0/users';

//     // constructor(
//     //     private formBuilder: FormBuilder,
//     //     private http: HttpClient,
//     //     private router: Router,
//     //     private authenticationService: AuthenticationService) { }

//     // formModel = this.formBuilder.group({
//     //     number: ['', Validators.required],
//     //     email: ['', [Validators.required, Validators.email]],
//     //     password: ['', [Validators.required, Validators.minLength(6)]]
//     // });


//     // loggedIn(): boolean {
//     //     return !!localStorage.getItem('localData');
//     // }

//     // logout(): void {
//     //     localStorage.removeItem('localData');
//     //     this.router.navigateByUrl('/');
//     // }

//     // getLocalData(): any {
//     //     return localStorage.getItem('localData');
//     // }

//     // getUsers(): Observable<any[]> {
//     //     return this.http.get<any[]>(this.APIUrl);
//     // }

//     // getUser(val: any): Observable<any> {
//     //     return this.http.get(this.APIUrl + '/' + val);
//     // }

//     // deleteUser(val: any): Observable<any> {
//     //     return this.http.delete(this.APIUrl + '/' + val);
//     // }


// }
