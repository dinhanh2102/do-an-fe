import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '../config/configuration';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NtsViewFileService {

  constructor(
    private http: HttpClient,
    private config: Configuration
  ) { }

  getFile(url: string): Observable<any> {
    let apiPath = this.config.ServerWithApiUrl + 'view-file/get-file-view?path=' + url;
    var tr = this.http.get(apiPath, { responseType: "blob" });
    return tr;
  }
}
