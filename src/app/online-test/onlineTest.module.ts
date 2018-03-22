import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamComponent } from './exam/exam.component';
import { PracticeComponent } from './practice/practice.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ExamComponent,
        PracticeComponent
    ],
    exports: [PracticeComponent]
})
export class OnlineTestModule { }
