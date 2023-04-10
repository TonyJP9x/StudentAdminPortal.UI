import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from './student.service';
import { Student } from '../layout/models/ui-models/student.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email','mobile','gender'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();
  @ViewChild(MatPaginator) matPaginator !: MatPaginator
  @ViewChild(MatSort) matSort !: MatSort
  filterString = '';

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    //Fetch Students
    this.studentService.getStudent().subscribe({
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

}
