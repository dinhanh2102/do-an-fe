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
export class LoaiCaService {

  constructor(
    private http: HttpClient,
    private config: Configuration
  ) { }

  searchLoaiCa(model: any): Observable<any> {
    var tr = this.http.post<any>(this.config.ServerWithApiUrl + 'loai-ca/search', model, httpOptions);
    return tr;
  }

  getLoaiCaInfo(id: string): Observable<any> {
    var tr = this.http.get<any>(this.config.ServerWithApiUrl + 'loai-ca/get-loai-ca-by-id?id=' + id);
    return tr;
  }

  createLoaiCa(model: any): Observable<any> {
    var tr = this.http.post<any>(this.config.ServerWithApiUrl + 'loai-ca/create', model, httpOptions);
    return tr;
  }

  updateLoaiCa(id: string, model: any): Observable<any> {
    var tr = this.http.put<any>(this.config.ServerWithApiUrl + 'loai-ca/' + id, model);
    return tr;
  }

  deleteLoaiCa(id: string): Observable<any> {
    var tr = this.http.delete<any>(this.config.ServerWithApiUrl + 'loai-ca/' + id, httpOptions);
    return tr;
  }
}
