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
import { ErrorComponent } from './error/error.component';
import {TestListComponent} from './online-test/test-list/test-list.component';
import { TestResultComponent } from './online-test/test-result/test-result.component';
import { RoomDetailComponent } from './navigation/room-detail/room-detail.component';
import { ExerciseComponent } from './online-test/exercise/exercise.component';

import { AuthGuard } from './shared/service/auth_guard.service';

export const appRoutes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: RegisterComponent},
    { path: 'navigation', component: SceneComponent, canActivate: [AuthGuard]},
    { path: 'role', component: TutorComponent, canActivate: [AuthGuard]},
    { path: 'disease', component: MedicalRecordComponent, canActivate: [AuthGuard]},
    { path: 'tutor', component: TutorComponent, canActivate: [AuthGuard]},
    { path: 'practice', component: PracticeComponent, canActivate: [AuthGuard]},
    { path: 'userinfo', component: UserinfoComponent, canActivate: [AuthGuard]},
    { path: 'mistake', component: MistakeComponent, canActivate: [AuthGuard]},
    { path: 'exam/:id/:duration', component: ExamComponent, canActivate: [AuthGuard]},
    { path: 'exercise/:level', component: ExerciseComponent, canActivate: [AuthGuard]},
    { path: 'testList', component: TestListComponent, canActivate: [AuthGuard]},
    { path: 'testResult/:type/:id', component: TestResultComponent, canActivate: [AuthGuard]},
    { path: 'roomDetail/:id', component: RoomDetailComponent, canActivate: [AuthGuard]},
    { path: '**', component: ErrorComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
