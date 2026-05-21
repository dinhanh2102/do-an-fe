import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../common/Constants';
import { Configuration } from '../config/configuration';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ComboboxService {

  constructor(
    private http: HttpClient,
    private config: Configuration,
    public constant: Constants,
  ) { }

  //lấy thông tin combobox theo tên table
  getDataCombobox(tableName: string): Observable<any> {
    var tr = this.http.get<any>(this.config.ServerWithApiUrl + 'combobox/get-data/' + tableName, httpOptions);
    return tr;
  }

  getListGroupuser(): Observable<any> {
    var tr = this.http.get<any>(this.config.ServerWithApiUrl + 'combobox/get-list-group-user', httpOptions);
    return tr;
  }

  getListUser(): Observable<any> {
    var tr = this.http.get<any>(this.config.ServerWithApiUrl + 'combobox/get-list-user', httpOptions);
    return tr;
  }

  getListMenu(): Observable<any> {
    var tr = this.http.get<any>(this.config.ServerWithApiUrl + 'combobox/get-list-menu', httpOptions);
    return tr;
  }

  getSystemFunctionAuto(): Observable<any> {
    var tr = this.http.get<any>(this.config.ServerWithApiUrl + 'combobox/get-system-function-auto', httpOptions);
    return tr;
  }

  getNhanVien() {
    return this.http.get<any>(this.config.ServerWithApiUrl + 'combobox/get-nhan-vien', httpOptions);
  }

  getDonVi() {
    return this.http.get<any>(this.config.ServerWithApiUrl + 'combobox/get-don-vi', httpOptions);
  }

  getPhongBanByIdDonVi(id: string) {
    return this.http.get<any>(this.config.ServerWithApiUrl + 'combobox/get-phong-ban-by-idDonVi?id=' + id, httpOptions);
  }

  getChucDanhByIdPhongBan(id: string) {
    return this.http.get<any>(this.config.ServerWithApiUrl + 'combobox/get-chuc-danh-by-id-phong-ban/' + id, httpOptions);
  }

  getTrinhDo() {
    return this.http.get<any>(this.config.ServerWithApiUrl + 'combobox/get-trinh-do', httpOptions);
  }

  getBaoHiem() {
    return this.http.get<any>(this.config.ServerWithApiUrl + 'combobox/get-bao-hiem', httpOptions);
  }

  getNganHang() {
    return this.http.get<any>(this.config.ServerWithApiUrl + 'combobox/ngan-hang', httpOptions);
  }

  getPhuCap() {
    return this.http.get<any>(this.config.ServerWithApiUrl + 'combobox/get-phu-cap', httpOptions);
  }
  getGroupUser(id: string) {
    return this.http.get<any>(this.config.ServerWithApiUrl + 'combobox/get-group-user/'+ id, httpOptions);
  }
}
