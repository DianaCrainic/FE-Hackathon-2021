import { Component, OnInit, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ThesisService } from 'src/app/core/services/thesis.service';
import { Thesis } from 'src/app/shared/models/thesis.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddThesisComponent } from '../../thesis/add-thesis/add-thesis.component';
import { EditThesisComponent } from '../../thesis/edit-thesis/edit-thesis.component';
import { User } from 'src/app/shared/models/users/user.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professors-info',
  templateUrl: './professors-info.component.html',
  styleUrls: ['./professors-info.component.css']
})
export class ProfessorsInfoComponent implements OnInit {

  thesis: Thesis[] | undefined;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private thesisService: ThesisService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.refereshList();
    this.titleService.setTitle('Theses');
  }

  refereshList() {
    this.thesisService.getAll(this.getProfessorId()).subscribe(
      thesis => {
        this.thesis = thesis;
      },
      error => {
        this.toastr.error('Error!', 'Thesis not found');
      }
    );
  }

  getProfessorId(): number {
    return this.route.snapshot.params.id;
  }

  delete(thesis: Thesis): void {
    this.thesisService.deleteById(thesis.id).subscribe(
      (resp) => {
        console.log(resp);
        console.log('thesis', thesis);
      },
      (err) => { this.toastr.error('Error!', 'Thesis not found'); }
    );
    this.refereshList();
    this.router.navigate(['/professors']);
  }

  addButton() {
    this.dialog.open(AddThesisComponent, {
      width: '500px',
      height:'350px'
    });
  }

  editButton(thesis: Thesis) {
    this.dialog.open(EditThesisComponent,
      {width: '500px',
      height:'400px',
        data:
        {
          id: thesis.id,
          title: thesis.title,
          description: thesis.description,
          student: thesis.student
        }
      });
  }
  public getUser(): User {
    return this.authenticationService.currentUserValue;
  }

  public isUserProfessor() {
    return this.getUser().role == 'PROFESSOR';
  }
}
