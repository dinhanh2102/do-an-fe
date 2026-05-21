import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from 'src/app/shared';




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class FunctionConfigService {

  constructor(
    private http: HttpClient,
    private config: Configuration
  ) { }

  searchFunction(model: any){
    var tr = this.http.post<any>(this.config.ServerWithApiUrl + 'system-function/search-config',model,httpOptions);
    return tr;
  }

  getTableName(): Observable<any> {
    var tr = this.http.get<any>(this.config.ServerWithApiUrl + 'system-function/table' , httpOptions);
    return tr;
  }
  getColumnTable(tableName: string): Observable<any> {
    var tr = this.http.get<any>(this.config.ServerWithApiUrl + 'system-function/column-table/' + tableName);
    return tr;
  }
  getComboxColumnTable(tableName: string): Observable<any> {
    var tr = this.http.get<any>(this.config.ServerWithApiUrl + 'system-function/combox-column-table/' + tableName);
    return tr;
  }

  getUpdateFunctionConfigById(id: string){
    var tr = this.http.get<any>(this.config.ServerWithApiUrl + 'system-function/get-update-config/' +id ,httpOptions);
    return tr;  
  }

  createFunctionConfig(model: any){
    var tr = this.http.post<any>(this.config.ServerWithApiUrl + 'system-function/create-config',model,httpOptions);
    return tr;
  }

  updateFunctionConfig(id: string,model: any){
    var tr = this.http.put<any>(this.config.ServerWithApiUrl + 'system-function/update-config/' +id, model ,httpOptions);
    return tr;  
  }
  deleteFunctionConfig(id: string): Observable<any> {
    return this.http.delete<any>(this.config.ServerWithApiUrl + 'system-function/delete-config/' + id, httpOptions);
  }

}
