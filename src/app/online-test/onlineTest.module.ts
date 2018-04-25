import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExamComponent } from './exam/exam.component';
import { PracticeComponent } from './practice/practice.component';
import { MistakeComponent } from './mistake/mistake.component';
import { DataService } from './../shared/service/data.service';
import {  } from './onlineTest-routing.module';
import { TestListComponent } from './test-list/test-list.component';
import { TestResultComponent } from './test-result/test-result.component';
import { ExerciseComponent } from './exercise/exercise.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        ExamComponent,
        PracticeComponent,
        MistakeComponent,
        TestListComponent,
        TestResultComponent,
        ExerciseComponent
    ],
    providers: [
        DataService
    ],
    exports: [PracticeComponent]
})
export class OnlineTestModule { }
