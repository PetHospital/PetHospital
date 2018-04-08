import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from '../app/login/login.component';
import { RegisterComponent } from '../app/register/register.component';
import { SceneComponent } from './navigation/scene/scene.component';
import { TutorComponent } from './roleplay/tutor/tutor.component';
import { MedicalRecordComponent } from './medical-record/medical-record.component';
import { PracticeComponent } from './online-test/practice/practice.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { ExamComponent } from './online-test/exam/exam.component';
import { MistakeComponent } from './online-test/mistake/mistake.component';
import { CollectionComponent } from './online-test/collection/collection.component';
import { ErrorComponent } from './error/error.component';


export const appRoutes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: RegisterComponent},
    { path: 'navigation', component: SceneComponent},
    { path: 'role', component: TutorComponent },
    { path: 'disease', component: MedicalRecordComponent},
    { path: 'tutor', component: TutorComponent},
    { path: 'practice', component: PracticeComponent },
    { path: 'userinfo', component: UserinfoComponent},
    { path: 'mistake', component: MistakeComponent},
    { path: 'collection', component: CollectionComponent},
    { path: 'exam/:id', component: ExamComponent},
    { path: '**', component: ErrorComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
