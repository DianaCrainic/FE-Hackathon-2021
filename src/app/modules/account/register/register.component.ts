import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;

  constructor(public service: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }

  onSubmit(): void {
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.service.formModel.reset();
          this.toastr.success('New user created!', 'Registration successful.');
        }
        this.router.navigateByUrl('/login');
      },
      err => {
        if (err.status === 400) {
          this.toastr.error('Serial Number or Email are already taken', 'Registration failed.');
        }
        else {
          this.toastr.error(err.description, 'Registration failed.');
        }
      }
    );
  }
}
