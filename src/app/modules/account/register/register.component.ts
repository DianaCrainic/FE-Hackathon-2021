import { Component, OnInit } from '@angular/core';
import { AccountService } from '../shared/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { first } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.formBuilder.group({
    serialNumber: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  hide = true;
  loading = false;

  constructor(
    private titleService: Title,
    public service: AccountService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Register');
  }

  get fields(): any {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.register({
      serialNumber: this.fields.serialNumber.value,
      email: this.fields.email.value,
      password: this.fields.password.value
    }).pipe(first())
      .subscribe(
        () => {
          this.router.navigate(['/login']);
        },
        error => {
          this.toastr.error(error, 'Register failed.');
          this.loading = false;
        }
      );
  }
}
