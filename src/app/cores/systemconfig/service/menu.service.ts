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
export class MenuService {

  constructor(
    private http: HttpClient,
    private config: Configuration
  ) { }

  searchMenu(model: any) {
    var tr = this.http.post<any>(this.config.ServerWithApiUrl + 'menu/search', model, httpOptions);
    return tr;
  }

  getMenu(): Observable<any> {
    var tr = this.http.get<any>(this.config.ServerWithApiUrl + 'menu/get-menu-user', httpOptions);
    return tr;
  }
  getMenuById(id: string): Observable<any> {
    var tr = this.http.get<any>(this.config.ServerWithApiUrl + 'menu/get-by-id/' + id);
    return tr;
  }
  createMenu(model: any) {
    var tr = this.http.post<any>(this.config.ServerWithApiUrl + 'menu/create', model, httpOptions);
    return tr;
  }

  updateMenu(id: string, model: any) {
    var tr = this.http.put<any>(this.config.ServerWithApiUrl + 'menu/update/' + id, model, httpOptions);
    return tr;
  }
  disableMenu(id: string) {
    var tr = this.http.put<any>(this.config.ServerWithApiUrl + 'menu/disable/' + id, httpOptions);
    return tr;
  }
  deleteMenu(id: string): Observable<any> {
    return this.http.delete<any>(this.config.ServerWithApiUrl + 'menu/delete/' + id, httpOptions);
  }

  updateIndex(model: any) {
    var tr = this.http.post<any>(this.config.ServerWithApiUrl + 'menu/update-index', model, httpOptions);
    return tr;
  }

  getFuntionAuto() {
    var tr = this.http.get<any>(this.config.ServerWithApiUrl + 'menu/list-funtion-auto', httpOptions);
    return tr;
  }
}
