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
export class LoaiCongService {

  constructor(
    private http: HttpClient,
    private config: Configuration
  ) { }

  //Tìm kiếm loại công
  searchLoaiCong(model: any): Observable<any> {
    var tr = this.http.post<any>(this.config.ServerWithApiUrl + 'loai-cong/search', model, httpOptions);
    return tr;
  }

  //Lấy thông tin loại công
  getLoaiCongInfo(id: string): Observable<any> {
    var tr = this.http.get<any>(this.config.ServerWithApiUrl + 'loai-cong/get-loai-cong-by-id?id=' + id);
    return tr;
  }

  //Tạo mới loại công
  createLoaiCong(model: any): Observable<any> {
    var tr = this.http.post<any>(this.config.ServerWithApiUrl + 'loai-cong/create', model, httpOptions);
    return tr;
  }

  //Cập nhật loại công
  updateLoaiCong(id: string, model: any): Observable<any> {
    var tr = this.http.put<any>(this.config.ServerWithApiUrl + 'loai-cong/' + id, model);
    return tr;
  }

  //Xóa loại công
  deleteLoaiCong(id: string): Observable<any> {
    var tr = this.http.delete<any>(this.config.ServerWithApiUrl + 'loai-cong/' + id, httpOptions);
    return tr;
  }
}
