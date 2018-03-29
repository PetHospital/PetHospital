import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from '../app/login/login.component';
import { RegisterComponent } from '../app/register/register.component';
import { SceneComponent } from './scene/scene.component';
import { TutorComponent } from './roleplay/tutor/tutor.component';
import { MedicalRecordComponent } from './medical-record/medical-record.component';
import { PracticeComponent } from './online-test/practice/practice.component';
<<<<<<< HEAD
import { UserinfoComponent } from './userinfo/userinfo.component';
=======
import { ExamComponent } from './online-test/exam/exam.component';
import { MistakeComponent } from './online-test/mistake/mistake.component';
import { CollectionComponent } from './online-test/collection/collection.component';
>>>>>>> 9c8f8c20ae8dfb0b506fadb582add97a229b8203


export const appRoutes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: RegisterComponent},
    { path: 'scene', component: SceneComponent},
    { path: 'role', component: TutorComponent },
    { path: 'disease', component: MedicalRecordComponent},
<<<<<<< HEAD
    { path: 'tutor', component: TutorComponent},
    { path: 'practice', component: PracticeComponent },
    { path: 'userinfo', component: UserinfoComponent}
=======
    { path: 'practice', component: PracticeComponent},
    { path: 'mistake', component: MistakeComponent},
    { path: 'collection', component: CollectionComponent}
>>>>>>> 9c8f8c20ae8dfb0b506fadb582add97a229b8203
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes), RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
