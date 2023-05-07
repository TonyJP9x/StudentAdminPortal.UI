import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../layout/models/api-models/student.model';
import { UpdateStudentRequest } from '../layout/models/api-models/update-student-request.model';
import { CreateStudentRequest } from '../layout/models/api-models/create-student-request.models';

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
  deleteStudent(studentId: string){
    return this.httpClient.delete<Student>(this.baseApiUrl+'/students/'+studentId)
  }
  createStudent( newStudent: Student): Observable<Student>{
    const createStudentRequest: CreateStudentRequest = {
      firstName: newStudent.firstName,
      lastName: newStudent.lastName,
      dateOfBirth: newStudent.dateOfBirth,
      email: newStudent.email,
      mobile: newStudent.mobile,
      genderId: newStudent.genderId,
      physicalAddress: newStudent.address.physicalAddress,
      postalAddress: newStudent.address.postalAddress
    } 
    return this.httpClient.post<Student>(this.baseApiUrl+'/students/newStudent', createStudentRequest)
  }
}
