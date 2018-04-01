import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { DialogComponent } from './dialog/dialog.component';
import { TutorComponent } from './tutor/tutor.component';
import { BigPicModule } from './big-pic/bigPic.module';
import { DataService } from './../shared/service/data.service';

@NgModule({
    imports: [
        CommonModule,
        BigPicModule
    ],
    declarations: [
        CardComponent,
        DialogComponent,
        TutorComponent
    ],
    providers: [
        DataService
    ],
    exports: [TutorComponent]
})
export class RoleplayModule { }
