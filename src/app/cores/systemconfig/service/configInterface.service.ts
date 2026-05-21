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
export class ConfigInterfaceService {

  constructor(
    private http: HttpClient,
    private config: Configuration
  ) { }

  
  createOrUpdate(model: any) {
    var tr = this.http.post<any>(this.config.ServerWithApiUrl + 'config-interface/create-or-update', model, httpOptions);
    return tr;
  }

  getConfig() {
    var tr = this.http.get<any>(this.config.ServerWithApiUrl + 'config-interface/get-detail', httpOptions);
    return tr;
  }
}
