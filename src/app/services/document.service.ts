import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private apiUrl = 'https://api.diagflashretraite.fr';
  // private apiUrl = 'http://31.207.37.178:3000';

  constructor(private http: HttpClient) {}

  createDocument(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/document`, formData);
  }
  getById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/document/${id}`);
  }
}
