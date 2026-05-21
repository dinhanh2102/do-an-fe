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
export class UserHistoryService {

  constructor(
    private http: HttpClient,
    private config: Configuration
  ) { }

  searchUserHistory(model: any): Observable<any> {
    var tr = this.http.post<any>(this.config.ServerWithApiUrl + 'user-history/search', model, httpOptions);
    return tr;
  }

  exportExcel(model: any): Observable<any> {
    let apiPath = this.config.ServerWithApiUrl + 'user-history/export-excel';
    var tr = this.http.post(apiPath, model, { responseType: "blob" });
    return tr;
  }

  exportPdf(model: any): Observable<any> {
    let apiPath = this.config.ServerWithApiUrl + 'user-history/export-pdf';
    var tr = this.http.post(apiPath, model, { responseType: "blob" });
    return tr;
  }
}
