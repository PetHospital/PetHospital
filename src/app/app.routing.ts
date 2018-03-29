import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from '../app/login/login.component';
import { RegisterComponent } from '../app/register/register.component';
import { SceneComponent } from './scene/scene.component';
import { TutorComponent } from './roleplay/tutor/tutor.component';
import { MedicalRecordComponent } from './medical-record/medical-record.component';
import { PracticeComponent } from './online-test/practice/practice.component';
import { ExamComponent } from './online-test/exam/exam.component';
import { MistakeComponent } from './online-test/mistake/mistake.component';


export const appRoutes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: RegisterComponent},
    { path: 'scene', component: SceneComponent},
    { path: 'role', component: TutorComponent },
    { path: 'disease', component: MedicalRecordComponent},
    { path: 'practice', 
    component: PracticeComponent,
    children: [
        {path: 'test', component: ExamComponent},
        {path: 'wrongCollection', component: MistakeComponent}
    ] }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
