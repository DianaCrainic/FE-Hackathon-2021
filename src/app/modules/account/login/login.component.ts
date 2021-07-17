import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from '../shared/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formModel = {
    username: '',
    password: ''
  };

  hide = true;
  public userId = 0;

  constructor(private service: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (localStorage.getItem('localData')) {
      this.router.navigateByUrl('/');
    }
  }

  onSubmit(form: NgForm): void {
    this.service.authenticate(form.value).subscribe(
      (res: any) => {
        this.userId = res.id;
        const localData = {'token': res.token, 'userId': res.id};
        localStorage.setItem('localData', JSON.stringify(localData));
        this.router.navigateByUrl('/');
      },
      err => {
        if (err.status === 400) {
          this.toastr.error('Incorrect username or password.', 'Authentication failed.');
        }
        else {
          console.log(err);
        }
      }
    );
  }
}
