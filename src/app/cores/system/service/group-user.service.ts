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
export class GroupUserService {

  constructor(
    private http: HttpClient,
    private config: Configuration
  ) { }

  //Tìm kiếm nhóm quyền
  searchGroupUser(model: any): Observable<any> {
    var tr = this.http.post<any>(this.config.ServerWithApiUrl + 'group-users/search', model, httpOptions);
    return tr;
  }

  //Lấy thông tin nhóm quyền
  getGroupUserInfo(id: string): Observable<any> {
    var tr = this.http.get<any>(this.config.ServerWithApiUrl + 'group-users/get-group-user?id=' + id);
    return tr;
  }

  //Tạo mới nhóm quyền
  createGroupUser(model: any): Observable<any> {
    var tr = this.http.post<any>(this.config.ServerWithApiUrl + 'group-users/create', model, httpOptions);
    return tr;
  }

  //Cập nhật nhóm quyền
  updateGroupUser(id: string, model: any): Observable<any> {
    var tr = this.http.put<any>(this.config.ServerWithApiUrl + 'group-users/' + id, model);
    return tr;
  }

  //Xóa nhóm quyền
  deleteGroupUser(id: string): Observable<any> {
    var tr = this.http.delete<any>(this.config.ServerWithApiUrl + 'group-users/' + id, httpOptions);
    return tr;
  }
}
