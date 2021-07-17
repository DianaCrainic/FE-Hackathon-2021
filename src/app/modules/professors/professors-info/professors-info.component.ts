import { Component, OnInit, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-professors-info',
  templateUrl: './professors-info.component.html',
  styleUrls: ['./professors-info.component.css']
})
export class ProfessorsInfoComponent implements OnInit {

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

  }

  getProfessorId(): number {
    return this.route.snapshot.params.id;
  }
}
