import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamComponent } from './exam/exam.component';
import { PracticeComponent } from './practice/practice.component';
import { CountdownComponent } from './countdown/countdown.component';
import { PracticeService } from './practice/practice.service';
import { MistakeComponent } from './mistake/mistake.component';
import { CollectionComponent } from './collection/collection.component';
import { DataService } from './../shared/service/data.service';
import {  } from './onlineTest-routing.module';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ExamComponent,
        PracticeComponent,
        CountdownComponent,
        MistakeComponent,
        CollectionComponent
    ],
    providers: [
        PracticeService,
        DataService
    ],
    exports: [PracticeComponent]
})
export class OnlineTestModule { }
