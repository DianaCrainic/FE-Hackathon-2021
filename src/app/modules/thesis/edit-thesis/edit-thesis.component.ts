import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ThesisService } from 'src/app/core/services/thesis.service';
import { User } from 'src/app/shared/models/users/user.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-thesis',
  templateUrl: './edit-thesis.component.html',
  styleUrls: ['./edit-thesis.component.css']
})
export class EditThesisComponent implements OnInit {
  user: User;

  updateThesisForm = this.formBuilder.group({
    title: new FormControl(''),
    description: new FormControl(''),
    student: new FormControl('')
  });

  loading = false;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private thesisService: ThesisService,
    private authenticationService: AuthenticationService,
    private router: Router


  ) { this.user = this.authenticationService.currentUserValue; }

  ngOnInit(): void {
    this.initializeDialog();
  }

  private initializeDialog(): void {
  //if (this.user.role === 'PROFESSOR') {
      this.thesisService.getById(this.data.id as number).subscribe(
        thesis => {
          console.log('thesis', thesis);

          this.updateThesisForm.controls['title'].setValue(thesis.title),
            this.updateThesisForm.controls['description'].setValue(thesis.description),
            this.updateThesisForm.controls['student'].setValue(thesis.student)
          }
      );
    //}
  }


  get thesisFields(): any {
    return this.updateThesisForm.controls;
  }

  onSubmit(): void {
    this.loading = true;

    if (this.user.role === 'PROFESSOR') {
      if (this.updateThesisForm.invalid) {
        return;
      }

      this.thesisService.update(this.data.id as number, {
        title: this.thesisFields.title.value,
        description: this.thesisFields.description.value,
        student: this.thesisFields.student.value
      }).pipe(first()).subscribe();
      this.loading = false;
    } 
    else {
      if (this.updateThesisForm.invalid) {
        return;
      }
    }

    this.router.navigate(['/professors']);
  }

}
