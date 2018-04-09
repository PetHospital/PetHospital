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
import {TestListComponent} from './online-test/test-list/test-list.component';
import { TestResultComponent } from './online-test/test-result/test-result.component';
import { RoomDetailComponent } from './navigation/room-detail/room-detail.component';


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
    { path: 'testList', component: TestListComponent},
    { path: 'testResult/:id', component: TestResultComponent},
    { path: 'roomDetail/:id', component: RoomDetailComponent},
    { path: '**', component: ErrorComponent }
    
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
