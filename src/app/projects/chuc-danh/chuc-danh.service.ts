import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/shared';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ChucDanhService {
  constructor(
    private http: HttpClient,
    private config: Configuration
  ) { }

  searchChucDanh(model: any): Observable<any> {
    return this.http.post<any>(this.config.ServerWithApiUrl + 'chuc-danh/search-chuc-danh', model, httpOptions);
  }

  createChucDanh(model: any): Observable<any> {
    return this.http.post<any>(this.config.ServerWithApiUrl + 'chuc-danh/create-chuc-danh', model, httpOptions);
  }

  deleteChucDanh(id: string): Observable<any> {
    return this.http.delete<any>(this.config.ServerWithApiUrl + 'chuc-danh/delete-chuc-danh/' + id, httpOptions);
  }

  getChucDanhById(id: string): Observable<any> {
    return this.http.get<any>(this.config.ServerWithApiUrl + 'chuc-danh/get-chuc-danh-by-id/' + id, httpOptions);
  }

  updateChucDanh(id: string, model: any): Observable<any> {
    return this.http.post<any>(this.config.ServerWithApiUrl + 'chuc-danh/update-chuc-danh/' + id, model, httpOptions);
  }
}
