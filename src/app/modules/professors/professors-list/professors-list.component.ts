import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/modules/shared.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/modules/account/shared/account.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ProfessorsInfoComponent } from '../professors-info/professors-info.component';
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

  professorsList: any = [];
  professorsListNames: any = [];

  CONTENT_KEY = 'content';
  TOTAL_ELEMENTS_KEY = 'totalElements';

  totalProfessors = 0;
  professors: Professor[] = [];
  displayedColumns: string[] = ['professor', 'interests', 'thesis'];


  ngOnInit(): void {
    // this.service.getCount().subscribe(
    //   count => this.totalProfessors = count
    // );
    this.refreshList(0, 5);
  }

  refreshList(page: number, pageSize: number): void {
    this.service.getProfessorPagination(page, pageSize).subscribe(data => {
      this.professorsList = data;
    });
  }

  onPaginateChange(event: PageEvent): void {
    const page = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.refreshList(page, pageSize);
  }

  onSearchClear(): void {
    // this.searchProfessor = '';
    // this.applyFilter(this.searchProfessor);
  }

  // applyFilter(searchProfessor: any): void {
  //   this.service.getProfessorPagination(1, 10).subscribe(data => {
  //     this.professorsList = data;
  //   });
  // }

  openProfessorInfo(row: any): void {
    this.dialog.open(ProfessorsInfoComponent,
      {
        data:
        {
          name: row.name
        }
      });
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
