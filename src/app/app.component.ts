import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-demo';

  readonly apiUrl = environment.ApiUrl;

  users: any = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  userForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });

  ngOnInit(): void {
    this.getUsers();
  }

  save() {
    if (this.userForm.invalid) {
      return;
    }
    this.http.post(this.apiUrl + 'save', this.userForm.value).subscribe(savedUser => {
      this.getUsers();
    });
  }

  getUsers() {
    this.http.get(this.apiUrl + 'all').subscribe(users => {
      this.users = users;
    });
  }
}
