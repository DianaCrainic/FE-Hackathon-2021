import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/modules/shared.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/modules/account/shared/account.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Professor } from 'src/app/shared/models/persons/professor.model';
import { ProfessorService } from 'src/app/core/services/professors.service';

@Component({
  selector: 'app-professors-list',
  templateUrl: './professors-list.component.html',
  styleUrls: ['./professors-list.component.css']
})
export class ProfessorsListComponent implements OnInit {

  constructor(
    private service: SharedService,
    public dialog: MatDialog,
    private router: Router,
    public accountService: AccountService,
    private titleService: Title,
    private professorService: ProfessorService) { }

  CONTENT_KEY = 'content';
  TOTAL_ELEMENTS_KEY = 'totalElements';

  totalProfessors = 0;
  professors: Professor[] = [];
  displayedColumns: string[] = ['professor', 'interests', 'schedule', 'thesis', 'message'];

  ngOnInit(): void {
    this.setProfessors(0, 5);
  }

  openProfessorInfo(id: number): void {
    this.router.navigate([`/professors/${id}`]);
  }

  sendMessage(id: number): void {
    this.router.navigate([`/conversations/${id}`]);
  }

  setProfessors(page: number, size: number): void {
    this.professorService.getAll(page, size).subscribe(
      data => {
        this.professors = data[this.CONTENT_KEY],
          this.totalProfessors = data[this.TOTAL_ELEMENTS_KEY];
      }
    );
  }

  public nextPage(event: PageEvent): void {
    const page = event.pageIndex;
    const size = event.pageSize;
    this.setProfessors(page, size);
  }
}
