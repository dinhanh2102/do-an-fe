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
export class FunctionAutoService {

  constructor(
    private http: HttpClient,
    private config: Configuration
  ) { }

  getConfigDesign(slug: string): Observable<any> {
    var tr = this.http.get<any>(this.config.ServerWithApiUrl + 'system-function/get-config-design/' + slug);
    return tr;
  }

  getTreeData(slug: string): Observable<any> {
    var tr = this.http.get<any>(this.config.ServerWithApiUrl + 'system-function/get-tree-data/' + slug);
    return tr;
  }

  search(slug: string, model: any): Observable<any> {
    var tr = this.http.post<any>(this.config.ServerWithApiUrl + 'system-function/search/' + slug, model, httpOptions);
    return tr;
  }

  getUpdateById(slug: string,id: string): Observable<any> {
    var tr = this.http.get<any>(this.config.ServerWithApiUrl + 'system-function/get-update/'+slug+'/' + id);
    return tr;
  }

  create(slug: string,model: any): Observable<any> {
    var tr = this.http.post<any>(this.config.ServerWithApiUrl + 'system-function/create/' + slug, model, httpOptions);
    return tr;
  }

  update(slug: string,id: string, model: any): Observable<any> {
    var tr = this.http.put<any>(this.config.ServerWithApiUrl + 'system-function/update/' + slug + '/' + id, model);
    return tr;
  }

  delete(slug: string,id: string): Observable<any> {
    var tr = this.http.delete<any>(this.config.ServerWithApiUrl + 'system-function/delete/' + slug + '/' + id, httpOptions);
    return tr;
  }

  getDetailById(slug: string,id: string): Observable<any> {
    var tr = this.http.get<any>(this.config.ServerWithApiUrl + 'system-function/get-detail/'+slug+'/' + id);
    return tr;
  }
}
