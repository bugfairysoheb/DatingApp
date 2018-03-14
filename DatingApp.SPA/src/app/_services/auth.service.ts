import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';


@Injectable()
export class AuthService {
    userToken: any;
    decodedToken: any;
    jwtHelper: JwtHelper = new JwtHelper();
    baseUrl = 'http://localhost:5000/api/auth/';

    
    constructor(private http: Http) { }

    // login(model: any) {
    //     // we need to tell what we are expecting as response and the type of response(json)
    //     const headers = new Headers({'Content-type': 'application/json'});
    //     const options = new RequestOptions({headers: headers});
    //     // Once we login, we need to store the token
    //     return this.http.post(this.baseUrl + 'login', model, options).map((response: Response) =>
    //      {
    //          const user = response.json();
    //          if (user) {
    //              localStorage.setItem('token', user.tokenString);
    //              this.userToken = user.tokenString;
    //          }
    //      });
         
    // }

    login(model: any) {
        return this.http.post(this.baseUrl + 'login', model, this.requestOptions()).map((response: Response) => {
            const user = response.json();
            if (user && user.tokenString) {
            localStorage.setItem('token', user.tokenString);
            this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
            console.log(this.decodedToken);
            }
        }).catch(this.handleError);
    }
    

    register(model: any) {
        return this.http.post(this.baseUrl + 'register', model, this.requestOptions()).catch(this.handleError);
      }
    
      private requestOptions() {
        const headers = new Headers({ 'Content-type': 'application/json' });
        return new RequestOptions({ headers: headers });
      }

    

       loggedIn() {
         //store the decoded token
        
        //Check if there is a token
        return tokenNotExpired('token');
    
      }

      private handleError(error: any) {
        //   Application header is in startup using extensions (helpers)
        const applicationError = error.headers.get('Application-Error');
        if (applicationError) {
          return Observable.throw(applicationError);
        }
        const serverError = error.json();
        let modelStateErrors = '';
        if (serverError) {
          for (const key in serverError) {
            if (serverError[key]) {
              modelStateErrors += serverError[key] + '\n';
            }
          }
        }
        return Observable.throw(
          modelStateErrors || 'Server error'
        );
      }

   
    



}