import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  invaliduserOrPass = false;
  returnUrl: string;
  error: string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private backendService: BackendService
  ) {
    let userData = localStorage.getItem('user');
    if(userData){
      this.router.navigate(['/products']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    // get return url
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/products';
      
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.invaliduserOrPass = false;

    if (this.loginForm.invalid) {
        return;
    }
    this.backendService.login(this.f.username.value, this.f.password.value)
        .subscribe((data: any[])=>{
            if(data.length > 0){
                localStorage.setItem('user', JSON.stringify(data[0]));
                this.router.navigate([this.returnUrl]);
            }else{
                this.invaliduserOrPass = true;
                //alert("Invalid username or password")
            }
        });
      
  }
}
