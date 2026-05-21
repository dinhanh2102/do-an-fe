import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from 'src/app/shared';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BangLuongService {
  constructor(
    private http: HttpClient,
    private config: Configuration
  ) { }

  search(model: any): Observable<any> {
    return this.http.post<any>(this.config.ServerWithApiUrl + 'bang-luong/search', model, httpOptions);
  }

  create(model: any): Observable<any> {
    return this.http.post<any>(this.config.ServerWithApiUrl + 'bang-luong/create', model, httpOptions);
  }

  export(model: any): Observable<any> {
    return this.http.post(this.config.ServerWithApiUrl + 'bang-luong/export', model, { responseType: "blob" });
  }

}
