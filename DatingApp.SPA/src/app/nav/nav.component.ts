import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/Alertify.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  // An object to store properties of the form
  model: any = {};
  constructor(protected authService: AuthService, private alertifyService: AlertifyService, private router: Router) { }

  ngOnInit() {
  }
  //the implementation of the login function is done in auth service
  login() {
    this.authService.login(this.model).subscribe(data => {
      this.alertifyService.success('logged in successfully');
    }, error => {
      console.log(error);
      this.alertifyService.error("Username or Password is incorrect");
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  logout() {
    // Remove Token 
    this.authService.userToken = null;
    localStorage.removeItem('token');
    this.alertifyService.message('logged out');
    this.router.navigate(['/home']);
  }

     //   loggedIn() {
    //     //Check if there is a token
    //     const token = localStorage.getItem('token');
    //     return !!token;
    
    //   }

    loggedIn() {
      return this.authService.loggedIn();
    }
}
