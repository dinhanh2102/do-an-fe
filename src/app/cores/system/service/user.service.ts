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
export class UserService {

  constructor(
    private http: HttpClient,
    private config: Configuration
  ) { }

 //Tìm kiếm tài khoản
  searchUser(model: any): Observable<any> {
    return this.http.post<any>(this.config.ServerWithApiUrl + 'users/search', model, httpOptions);
  }

  //Xóa tài khoản
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(this.config.ServerWithApiUrl + 'users/delete/' + id, httpOptions);
  }

  //Thêm mới tài khoản
  createUser(model: any): Observable<any> {
    return this.http.post<any>(this.config.ServerWithApiUrl + 'users/create', model, httpOptions);
  }

  //Cập nhật tài khoản
  updateUser(id: string, model: any): Observable<any> {
    return this.http.put<any>(this.config.ServerWithApiUrl + 'users/update/' + id, model, httpOptions);
  }

  //Lấy thông tin tài khoản
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(this.config.ServerWithApiUrl + 'users/get-user-by-id/' + id, httpOptions);
  }

  //Khóa/Mở khóa tài khoản
  userAdminLockOrUnlock(id: string, islock: boolean): Observable<any> {
    return this.http.put<any>(this.config.ServerWithApiUrl + 'users/lock/' + id +'?isunlock=' + islock, httpOptions);
  }

  //Thay đổi mật khẩu
  changePassword(id: string, model: any): Observable<any> {
    return this.http.put<any>(this.config.ServerWithApiUrl + 'users/change-password/' + id, model, httpOptions);
  }

  //Lấy quyền theo nhóm
  getPermission(groupuserid: string): Observable<any> {
    var tr = this.http.get<any>(this.config.ServerWithApiUrl + 'users/get-permission'+'?groupUserId=' +groupuserid, httpOptions);
    return tr;
  }

  //Cập nhật thông tin tài khoản
  updateUserInfo(id: string, model: any): Observable<any> {
    return this.http.put<any>(this.config.ServerWithApiUrl + 'users/update-info/' + id, model, httpOptions);
  }

  //CHi tiết tài khoản
  getUserInfo(id: string): Observable<any> {
    return this.http.get<any>(this.config.ServerWithApiUrl + 'users/get-user-by-info/' + id, httpOptions);
  }
}
