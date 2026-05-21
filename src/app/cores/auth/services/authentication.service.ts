import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Configuration } from 'src/app/shared';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

const httpOptionsJson = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8','Access-Control-Allow-Origin':'*' ,'X-Content-Type-Options':'nosniff'})
};

const httpOptionsJsonNoLoad = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8','Access-Control-Allow-Origin':'*' ,'X-Content-Type-Options':'nosniff','no-load':'true'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient, private config: Configuration) { }

  login(loginData: any): Observable<any> {
    return this.http.post<any>(this.config.ServerWithApiUrl + 'auth/login', loginData, httpOptionsJson);
  }

  ChangePassword(model: any): Observable<any> {    
    return this.http.put<any>(this.config.ServerWithApiUrl + 'users/change-pass', model, httpOptionsJson);
  }

  logout() {
    // remove user from local storage to log user out
    // return this.http.post<any>(this.config.ServerWithApiUrl + 'auth/login', loginData, httpOptionsJson);
    // localStorage.removeItem('CurrentUser');
    return this.http.put<any>(this.config.ServerWithApiUrl + 'users/logout', httpOptionsJson);
  }
  refreshtoken(model: any) {
    var tr = this.http.post<any>(this.config.ServerWithApiUrl + 'auth/refresh/token',model ,httpOptionsJsonNoLoad);
    return tr;

  }
  getConfig() {
    var tr = this.http.get<any>(this.config.ServerWithApiUrl + 'auth/get-detail', httpOptions);
    return tr;
  }
  /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead


      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}