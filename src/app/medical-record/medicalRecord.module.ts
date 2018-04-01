import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalRecordComponent } from './medical-record.component';
import { BigPicModule } from '../roleplay/big-pic/bigPic.module';

@NgModule({
    imports: [
        CommonModule,
        BigPicModule
    ],
    declarations: [
        MedicalRecordComponent
    ],
    exports: [MedicalRecordComponent]
})
export class MedicalRecordModule { }
