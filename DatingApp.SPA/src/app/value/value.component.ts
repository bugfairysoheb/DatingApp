// Goal is to fetch some data from the server and display it on the webpage
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {
  values: any;

  constructor(private http: Http, private authService: AuthService) { }

  ngOnInit() {
    this.getValues();
  }
  getValues() {
    this.http.get('http://localhost:5000/api/values').subscribe(response => {
      this.values = response.json();
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

}
