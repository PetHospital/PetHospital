import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamComponent } from './exam/exam.component';
import { PracticeComponent } from './practice/practice.component';
import { CountdownComponent } from './countdown/countdown.component';
import { PracticeService } from './practice/practice.service';
import { ExamService } from './exam/exam.service';
import { MistakeComponent } from './mistake/mistake.component';
import { MistakeService } from './mistake/mistake.service';
import { CollectionService } from './collection/collection.service';
import { Collection } from './collection/collection';
import { CollectionComponent } from './collection/collection.component';
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
        ExamService,
        MistakeService,
        CollectionService
    ],
    exports: [CollectionComponent]
})
export class OnlineTestModule { }
