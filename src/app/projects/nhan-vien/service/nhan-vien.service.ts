import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/shared';
import { Observable } from 'rxjs';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const httpOptionsFile = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class NhanVienService {
  private apiUrl = 'http://127.0.0.1:5000/'
  constructor(
    private http: HttpClient,
    private config: Configuration
  ) { }

  searchNhanVien(model: any): Observable<any> {
    return this.http.post<any>(this.config.ServerWithApiUrl + 'nhan-vien/search-nhan-vien', model, httpOptions);
  }

  createNhanVien(model: any): Observable<any> {
    return this.http.post<any>(this.config.ServerWithApiUrl + 'nhan-vien/create-nhan-vien', model, httpOptions);
  }

  deleteNhanVien(id: string): Observable<any> {
    return this.http.delete<any>(this.config.ServerWithApiUrl + 'nhan-vien/delete-nhan-vien/' + id, httpOptions);
  }

  getNhanVienById(id: string): Observable<any> {
    return this.http.get<any>(this.config.ServerWithApiUrl + 'nhan-vien/get-nhan-vien-by-id/' + id, httpOptions);
  }

  updateNhanVien(id: string, model: any): Observable<any> {
    return this.http.post<any>(this.config.ServerWithApiUrl + 'nhan-vien/update-nhan-vien/' + id, model, httpOptions);
  }

  uploadVideo(videoFile: File, folderName: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', videoFile);
    formData.append('folderName', folderName);

    return this.http.post(this.apiUrl + 'upload-video', formData);
  }
  checkEmployee(employeeCode: string): Observable<any> {
    const params = { employee_code: employeeCode };
    return this.http.get<any>(this.apiUrl + 'check_employee', { params });
  }
  getListNganHang(): Observable<any> {
    return this.http.get<any>('https://api.vietqr.io/v2/banks');
  }
  delete_video(id: string): Observable<any> {

    return this.http.post<any>(this.apiUrl + 'delete_directory', { folder_name: id }, httpOptions);
  }
}
