import { Component, OnInit, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ThesisService } from 'src/app/core/services/thesis.service';
import { Thesis } from 'src/app/shared/models/thesis.model';
import { ToastrService } from 'ngx-toastr';

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
  ) { }

  ngOnInit(): void {
    this.thesisService.getAll(this.getProfessorId()).subscribe(
      thesis => {
        this.thesis = thesis;
        console.log(this.thesis);
      },
      error => {
        this.toastr.error('Error!', 'Thesis not found');
      }
    );
    this.titleService.setTitle('Theses');
  }

  

  getProfessorId(): number {
    return this.route.snapshot.params.id;
  }
}
