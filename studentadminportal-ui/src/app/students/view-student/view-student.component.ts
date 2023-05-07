import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/layout/models/ui-models/student.model';
import { GenderService } from 'src/app/services/gender.service';
import { Gender } from 'src/app/layout/models/ui-models/gender.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  studentId: string | null | undefined;
  student :Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    genderId: '',
    profileImageUrl: '',
    gender: {
      id: '',
      description: ''
    },
    address:{
      id:'',
      physicalAddress:'',
      postalAddress:'',
      studentId: ''
    }
  }
  isExsitingStudent!: boolean
  header = ''
  genders : Gender[] = []
  constructor(private  studentService: StudentService, private genderService: GenderService, private route: ActivatedRoute, private snackbar: MatSnackBar , private router:Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.studentId = params.get('id')
        if(this.studentId === 'newStudent'){
          this.isExsitingStudent = false
          this.header = 'Add new student'
          this.genderService.getGenders().subscribe({
            next:data => this.genders = data,
            error:err => console.log(err)
          })
        }else{
          this.isExsitingStudent = true
          this.header = 'View Student'
          if(this.studentId){
            this.studentService.getStudent(this.studentId).subscribe({
              next: data => this.student = data,
              error: err => console.log(err)
            })
            this.genderService.getGenders().subscribe({
              next:data => this.genders = data,
              error:err => console.log(err)
            })
          }

        }
      }
    )
   
  }
  onUpdate():void{
    this.studentService.updateStudent(this.student.id, this.student).subscribe({
        next: data => {
          console.log(data),
          this.snackbar.open('Student updated successfully', undefined, {
            duration: 2000
          })
        },
        error: err => console.log(err)
      }
    );
  }
  onCreate(){
    this.studentService.createStudent(this.student).subscribe({
      next:data => {
        console.log(data),
        this.snackbar.open('Student created successfully', undefined,{
          duration:2000
        })
        this.router.navigateByUrl('/students')
      },
      error: err => console.log(err)
    })
  }
}
