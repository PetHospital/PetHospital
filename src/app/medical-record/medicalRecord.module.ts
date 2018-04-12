import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalRecordComponent } from './medical-record.component';
import { BigPicModule } from '../roleplay/big-pic/bigPic.module';
// import { HeaderComponent } from '../shared/component/header/header.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
    imports: [
        CommonModule,
        BigPicModule,
        SharedModule
    ],
    declarations: [
        MedicalRecordComponent
    ],
    exports: [MedicalRecordComponent]
})
export class MedicalRecordModule { }
