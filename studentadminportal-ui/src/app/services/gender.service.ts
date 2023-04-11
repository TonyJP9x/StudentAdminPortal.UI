import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gender } from '../layout/models/api-models/gender.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private baseApiUrl = 'https://localhost:7184';

  constructor(private httpClient:HttpClient) { }

  getGenders(): Observable<Gender[]>{
    return this.httpClient.get<Gender[]>(this.baseApiUrl + '/genders');
  }
}
