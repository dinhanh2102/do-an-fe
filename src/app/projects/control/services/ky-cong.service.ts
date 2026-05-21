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
export class KyCongService {

  constructor(
    private http: HttpClient,
    private config: Configuration
  ) { }

  searchKyCong(model: any): Observable<any> {
    var tr = this.http.post<any>(this.config.ServerWithApiUrl + 'ky-cong/search', model, httpOptions);
    return tr;
  }

  getKyCongInfo(id: string): Observable<any> {
    var tr = this.http.get<any>(this.config.ServerWithApiUrl + 'ky-cong/get-ky-cong-by-id?id=' + id);
    return tr;
  }

  createKyCong(model: any): Observable<any> {
    var tr = this.http.post<any>(this.config.ServerWithApiUrl + 'ky-cong/create', model, httpOptions);
    return tr;
  }

  updateKyCong(id: string, model: any): Observable<any> {
    var tr = this.http.put<any>(this.config.ServerWithApiUrl + 'ky-cong/' + id, model);
    return tr;
  }

  deleteKyCong(id: string): Observable<any> {
    var tr = this.http.delete<any>(this.config.ServerWithApiUrl + 'ky-cong/' + id, httpOptions);
    return tr;
  }

  phatSinhKyCong(model: any): Observable<any> {
    var tr = this.http.post<any>(this.config.ServerWithApiUrl + 'ky-cong/phat-sinh-ky-cong', model, httpOptions);
    return tr;
  }
  getListKyCongChiTiet(id: string): Observable<any> {
    var tr = this.http.get<any>(this.config.ServerWithApiUrl + 'ky-cong/get-list-chi-tiet-ky-cong/' + id, httpOptions);
    return tr;
  }

  updateKyCongChiTiet(id: string, model: any): Observable<any> {
    var tr = this.http.put<any>(this.config.ServerWithApiUrl + 'ky-cong/ky-cong-chi-tiet/' + id, model);
    return tr;
  }

  getBangCongDetail(id: string): Observable<any> {
    var tr = this.http.get<any>(this.config.ServerWithApiUrl + 'ky-cong/get-list-chi-tiet-ky-cong/' + id, httpOptions);
    return tr;
  }

  detailChamCong(id: any): Observable<any> {
    var tr = this.http.get<any>(this.config.ServerWithApiUrl + 'cham-cong/get-cham-cong-detail/' + id, httpOptions);
    return tr;
  }


  updateChamCong(id: string, model: any): Observable<any> {
    var tr = this.http.put<any>(this.config.ServerWithApiUrl + 'cham-cong/update/' + id, model);
    return tr;
  }
  createBangCong(model: any): Observable<any> {
    var tr = this.http.post<any>(this.config.ServerWithApiUrl + 'cham-cong/create-bang-cong', model);
    return tr;
  }
  deleteChamCong(id: string): Observable<any> {
    var tr = this.http.delete<any>(this.config.ServerWithApiUrl + 'ky-cong/xoa-cham-cong/' + id, httpOptions);
    return tr;
  }
}
