import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
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
  user: User;

  updateStudentForm = this.formBuilder.group({
    name: new FormControl(''),
    serialNumber: new FormControl('', Validators.required)
  });

  updateProfessorForm = this.formBuilder.group({
    name: new FormControl(''),
    academicRank: new FormControl(''),
    schedule: new FormControl('')
  });

  loading = false;
  currentInterests = new Set<string>();
  formControl = new FormControl(['angular']);

  constructor(
      private titleService: Title,
      private authenticationService: AuthenticationService,
      private studentService: StudentService,
      private professorService: ProfessorService,
      private formBuilder: FormBuilder,
      private router: Router
  ) {
      this.user = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
      this.titleService.setTitle('Profile');
      this.initializePerson();
  }

  private initializePerson(): void {
      if (this.user.role === 'STUDENT') {
          this.studentService.getById(this.user.ownerId as number).subscribe(
            student => {
              this.updateStudentForm.controls['name'].setValue(student.name),
              this.updateStudentForm.controls['serialNumber'].setValue(student.serialNumber)
              this.currentInterests = new Set(student.interests.map(interest => interest.name))
            }
          );
      } else if (this.user.role === 'PROFESSOR') {
          this.professorService.getById(this.user.ownerId as number).subscribe(
            professor => {
              this.updateProfessorForm.controls['name'].setValue(professor.name),
              this.updateProfessorForm.controls['academicRank'].setValue(professor.academicRank),
              this.updateProfessorForm.controls['schedule'].setValue(professor.schedule),
              this.currentInterests = new Set(professor.interests.map(interest => interest.name))
            }
          );
      }
  }

  get studentFields(): any {
    return this.updateStudentForm.controls;
  }

  get professorFields(): any {
    return this.updateProfessorForm.controls;
  }

  addInterestFromInput(event: MatChipInputEvent) {
    if (event.value) {
      this.currentInterests.add(event.value);
      // event.chipInput!.clear();
    }
  }

  removeInterest(interest: string) {
    this.currentInterests.delete(interest);
  }

  onSubmit(): void {
    this.loading = true;

    if (this.user.role === 'STUDENT') {
      if (this.updateStudentForm.invalid) {
        return;
      }

      this.studentService.update(this.user.ownerId as number, {
        name: this.studentFields.name.value,
        serialNumber: this.studentFields.serialNumber.value,
        interests: Array.from(this.currentInterests.values()) as string[]
      }).pipe(first()).subscribe();
    } else {
      if (this.updateProfessorForm.invalid) {
        return;
      }

      this.professorService.update(this.user.ownerId as number, {
        name: this.professorFields.name.value,
        academicRank: this.professorFields.academicRank.value,
        schedule: this.professorFields.schedule.value,
        interests: Array.from(this.currentInterests.values()) as string[]
      }).pipe(first()).subscribe();
    }

    this.router.navigate(['/']);
  }
}
