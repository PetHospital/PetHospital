import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamComponent } from './exam/exam.component';
import { PracticeComponent } from './practice/practice.component';
import { CountdownComponent } from './countdown/countdown.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ExamComponent,
        PracticeComponent,
        CountdownComponent
    ],
    exports: [PracticeComponent]
})
export class OnlineTestModule { }
