import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../layout/models/api-models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUrl = 'https://localhost:7184';
  constructor(private httpClient:HttpClient) { }

  getStudents(): Observable<Student[]>{
    return this.httpClient.get<Student[]>(this.baseApiUrl + '/students');
  }
  getStudent(studentId: string):Observable<Student>{
    return this.httpClient.get<Student>(this.baseApiUrl + '/students/' + studentId)
  }
}
