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
export class PhuCapService {
  constructor(
    private http: HttpClient,
    private config: Configuration
  ) { }

  searchPhuCap(): Observable<any> {
    return this.http.post<any>(this.config.ServerWithApiUrl + 'phu-cap/search-phu-cap', httpOptions);
  }

  createPhuCap(model: any): Observable<any> {
    return this.http.post<any>(this.config.ServerWithApiUrl + 'phu-cap/create-phu-cap', model, httpOptions);
  }

  deletePhuCap(id: string): Observable<any> {
    return this.http.delete<any>(this.config.ServerWithApiUrl + 'phu-cap/delete-phu-cap/' + id, httpOptions);
  }

  getPhuCapById(id: string): Observable<any> {
    return this.http.get<any>(this.config.ServerWithApiUrl + 'phu-cap/get-phu-cap-by-id/' + id, httpOptions);
  }

  updatePhuCap(id: string, model: any): Observable<any> {
    return this.http.post<any>(this.config.ServerWithApiUrl + 'phu-cap/update-phu-cap/' + id, model, httpOptions);
  }

  // getPhuCap(idPhuCap: string): Observable<any> {
  //   return this.http.post<any>(this.config.ServerWithApiUrl + 'phu-cap/get-phu-cap' + '?idPhuCap=' + idPhuCap, httpOptions);
  // }

  searchPhuCapNhanVien(model: any): Observable<any> {
    return this.http.post<any>(this.config.ServerWithApiUrl + 'phu-cap/search-phu-cap-nhan-vien', model, httpOptions);
  }

  createPhuCapNhanVien(model: any): Observable<any> {
    return this.http.post<any>(this.config.ServerWithApiUrl + 'phu-cap/create-phu-cap-nhan-vien', model, httpOptions);
  }

  deletePhuCapNhanVien(id: string): Observable<any> {
    return this.http.delete<any>(this.config.ServerWithApiUrl + 'phu-cap/delete-phu-cap-nhan-vien/' + id, httpOptions);
  }

  getPhuCapNhanVienById(id: string): Observable<any> {
    return this.http.get<any>(this.config.ServerWithApiUrl + 'phu-cap/get-phu-cap-nhan-vien-by-id/' + id, httpOptions);
  }

  updatePhuCapNhanVien(id: string, model: any): Observable<any> {
    return this.http.post<any>(this.config.ServerWithApiUrl + 'phu-cap/update-phu-cap-nhan-vien/' + id, model, httpOptions);
  }
}
