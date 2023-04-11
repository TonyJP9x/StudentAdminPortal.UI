import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../layout/models/api-models/student.model';
import { UpdateStudentRequest } from '../layout/models/api-models/update-student-request.model';

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
  updateStudent(studentId: string, studentRequest: Student){
    const updateStudentRequest: UpdateStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress
    } 

   return this.httpClient.put<Student>(this.baseApiUrl+'/students/' + studentId, updateStudentRequest)
  }
}
