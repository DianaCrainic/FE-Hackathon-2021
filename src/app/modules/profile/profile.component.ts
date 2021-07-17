import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ProfessorService } from 'src/app/core/services/professors.service';
import { StudentService } from 'src/app/core/services/student.service';
import { User } from 'src/app/shared/models/users/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  person$: Observable<any> | undefined;
  user: User;

  constructor(
      private titleService: Title,
      private authenticationService: AuthenticationService,
      private studentService: StudentService,
      private professorService: ProfessorService,
  ) {
      this.user = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
      this.titleService.setTitle('Profile');
      this.initializePerson();
  }

  private initializePerson(): void {
      if (this.user.role === 'STUDENT') {
          this.person$ = this.studentService.getById(this.user.ownerId as number);
      } else if (this.user.role === 'PROFESSOR') {
          this.person$ = this.professorService.getById(this.user.ownerId as number);
      }
  }
}
