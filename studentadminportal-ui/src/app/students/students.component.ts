import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from './student.service';
import { Student } from '../layout/models/ui-models/student.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email','mobile','gender','edit','delete'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();
  @ViewChild(MatPaginator) matPaginator !: MatPaginator
  @ViewChild(MatSort) matSort !: MatSort
  filterString = '';

  constructor(private studentService: StudentService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    //Fetch Students
   this.getAllStudent()
  }
  getAllStudent(){
    this.studentService.getStudents().subscribe({
      next: data => {
        this.dataSource = new MatTableDataSource<Student>(data);
        if(this.matPaginator){
          this.dataSource.paginator = this.matPaginator
        }
        if(this.matSort){
          this.dataSource.sort = this.matSort
        }
      }

      ,
      error: err => console.log(err)
    });
  }
  filterStudents(){
    this.dataSource.filter = this.filterString.trim().toLocaleLowerCase();
  }
  deleteStudent(studentId:string)
  {
    this.studentService.deleteStudent(studentId).subscribe({
      next: data => {console.log(data), this.snackbar.open('Student deleted successfully', undefined, {
        duration: 2000
      }), this.getAllStudent()},
      error: err => console.log(err)
    })
  }

}
