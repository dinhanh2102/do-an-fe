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
export class DonViService {
  constructor(
    private http: HttpClient,
    private config: Configuration
  ) { }

  searchDonVi(): Observable<any> {
    return this.http.post<any>(this.config.ServerWithApiUrl + 'don-vi-phong-ban/search-don-vi', httpOptions);
  }

  createDonVi(model: any): Observable<any> {
    return this.http.post<any>(this.config.ServerWithApiUrl + 'don-vi-phong-ban/create-don-vi', model, httpOptions);
  }

  deleteDonVi(id: string): Observable<any> {
    return this.http.delete<any>(this.config.ServerWithApiUrl + 'don-vi-phong-ban/delete-don-vi/' + id, httpOptions);
  }

  getDonViById(id: string): Observable<any> {
    return this.http.get<any>(this.config.ServerWithApiUrl + 'don-vi-phong-ban/get-don-vi-by-id/' + id, httpOptions);
  }

  updateDonVi(id: string, model: any): Observable<any> {
    return this.http.post<any>(this.config.ServerWithApiUrl + 'don-vi-phong-ban/update-don-vi/' + id, model, httpOptions);
  }

  getDonVi(idDonVi: string): Observable<any> {
    return this.http.post<any>(this.config.ServerWithApiUrl + 'don-vi-phong-ban/get-don-vi' + '?idDonVi=' + idDonVi, httpOptions);
  }

  searchPhongBan(model: any): Observable<any> {
    return this.http.post<any>(this.config.ServerWithApiUrl + 'don-vi-phong-ban/search-phong-ban', model, httpOptions);
  }

  createPhongBan(model: any): Observable<any> {
    return this.http.post<any>(this.config.ServerWithApiUrl + 'don-vi-phong-ban/create-phong-ban', model, httpOptions);
  }

  deletePhongBan(id: string): Observable<any> {
    return this.http.delete<any>(this.config.ServerWithApiUrl + 'don-vi-phong-ban/delete-phong-ban/' + id, httpOptions);
  }

  getPhongBanById(id: string): Observable<any> {
    return this.http.get<any>(this.config.ServerWithApiUrl + 'don-vi-phong-ban/get-phong-ban-by-id/' + id, httpOptions);
  }

  updatePhongBan(id: string, model: any): Observable<any> {
    return this.http.post<any>(this.config.ServerWithApiUrl + 'don-vi-phong-ban/update-phong-ban/' + id, model, httpOptions);
  }
}
