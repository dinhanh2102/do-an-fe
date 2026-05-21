import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from 'src/app/shared';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class homeService {

  constructor(
    private http: HttpClient,
    private config: Configuration
  ) { }
  search(model: any): Observable<any> {
    return this.http.post<any>(this.config.ServerWithApiUrl + 'trang-chu/search', model, httpOptions);
  }
  getCalendar(model: any): Observable<any> {
    return this.http.post<any>(this.config.ServerWithApiUrl + 'calendar/get-calendar', model,httpOptions);
  } 
  getKhoaHoc(): Observable<any> {
    return this.http.get<any>(this.config.ServerWithApiUrl + 'combobox/get-list-khoa-hoc', httpOptions);
  }
}