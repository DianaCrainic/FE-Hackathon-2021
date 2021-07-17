import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/modules/shared.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/modules/account/shared/account.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-professors-list',
  templateUrl: './professors-list.component.html',
  styleUrls: ['./professors-list.component.css']
})
export class ProfessorsListComponent implements OnInit {

  constructor(private service: SharedService, private router: Router, public accountService: AccountService) { }

  professorsList: any = [];
  searchProfessor = '';
  totalProfessors = 0;
  movieListWithoutFilter: any = [];
  displayedColumns: string[] = ['professor', 'interests', 'options'];
  rating = 0;
  localData = '';
  userId = 0;
  public RatingList: any = [];

  ngOnInit(): void {
    this.service.getCount().subscribe(
      count => this.totalProfessors = count
    );
    this.refreshList(1, 10, this.searchProfessor);
  }

  refreshList(page: number, pageSize: number, title: string): void {
    this.service.getProfessorPagination(page, pageSize, title).subscribe(data => {
      this.professorsList = data;
    });
  }

  onPaginateChange(event: PageEvent): void {
    const page = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.refreshList(page, pageSize, this.searchProfessor);
  }

  onSearchClear(): void {
    this.searchProfessor = '';
    this.applyFilter(this.searchProfessor);
  }

  applyFilter(searchProfessor: any): void {
    this.service.getProfessorPagination(1, 10, searchProfessor).subscribe(data => {
      this.professorsList = data;
    });
  }

  openProfessorInfo(row: any): void {
    // this.dialog.open(MovieDialogComponent,
    //   {
    //     data:
    //     {
    //       name: row.name
    //     }
    //   });
  }



}
