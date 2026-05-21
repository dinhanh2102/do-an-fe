import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from '../config/configuration';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private http: HttpClient,
    private config: Configuration
  ) { }

  downloadFile(model: any): Observable<any> {
    let apiPath = this.config.ServerWithApiUrl + 'file/download-file';
    var tr = this.http.post(apiPath, model, {
      responseType: "blob"
    });
    return tr
  }

  downloadFiles(model: any): Observable<any> {
    let apiPath = this.config.ServerWithApiUrl + 'file/download-files';
    var tr = this.http.post(apiPath, model, {
      responseType: "blob"
    });
    return tr
  }

  // Upload 1 file
  uploadFile(file: any, folderName: string): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('folderName', folderName);
    formData.append('file', file);
    console.log(formData)
    var tr = this.http.post<any>(this.config.ServerWithApiUrl + 'file/upload-file', formData);
    return tr
  }

  // Upload nhiều file
  uploadFiles(files: any, model: any): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('folderName', model);
    files.forEach((file: any) => {
      formData.append('files', file);
    });
    var tr = this.http.post<any>(this.config.ServerWithApiUrl + 'file/upload-files', formData);
    return tr
  }

  downloadFileZip(listfile: any): Observable<any> {
    var tr = this.http.post(this.config.ServerWithApiUrl + 'file/download-files', listfile, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: "blob"
    },);
    return tr
  }

  downloadFileLink(path: string, fileName: string) {
    var link = document.createElement("a");
    link.href = path;

    fileName = fileName.replace('\\', '-');
    fileName = fileName.replace('/', '-');
    fileName = fileName.replace(':', '-');
    fileName = fileName.replace('?', '-');
    fileName = fileName.replace('*', '-');
    fileName = fileName.replace('"', '-');
    fileName = fileName.replace('<', '-');
    fileName = fileName.replace('>', '-');
    fileName = fileName.replace('|', '-');

    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
