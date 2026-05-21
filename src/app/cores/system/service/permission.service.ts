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
export class PermissionService {

  constructor(
    private http: HttpClient,
    private config: Configuration
  ) { }

  
  deletePermision(id: string): Observable<any> {
    return this.http.delete<any>(this.config.ServerWithApiUrl + 'permission/user-delete/' + id, httpOptions);
  }

  getUser(model: any) {
    var tr = this.http.post<any>(this.config.ServerWithApiUrl + 'permission/user-info',model, httpOptions);
    return tr;
  }
}
