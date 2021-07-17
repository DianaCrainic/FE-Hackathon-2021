import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/shared/models/users/user.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.authenticationService.logout();
  }

  public getUser(): User {
    return this.authenticationService.currentUserValue;
  }

  public isUserLoggedIn(): boolean {
    return Object.keys(this.getUser()).length !== 0;
  }

}
