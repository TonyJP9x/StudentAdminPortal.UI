import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/layout/models/ui-models/student.model';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  studentId: string | null | undefined;
  student !:Student
  constructor(private  studentService: StudentService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.studentId = params.get('id')
        if(this.studentId){
          this.studentService.getStudent(this.studentId).subscribe({
            next: data => this.student = data,
            error: err => console.log(err)
          })
        }
      }
    )
   
  }

}
