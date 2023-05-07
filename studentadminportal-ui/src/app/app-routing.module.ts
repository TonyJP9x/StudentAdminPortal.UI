import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { ViewStudentComponent } from './students/view-student/view-student.component';
import { LoginComponent } from './authen/login/login.component';

const routes: Routes = [

  {
    path:'students',component: StudentsComponent
  },
  {
    path:'students/:id', component:ViewStudentComponent
  },
  {
    path:'students/newStudent', component:ViewStudentComponent
  },
  {
    path:'login', component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
