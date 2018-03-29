import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { DialogComponent } from './dialog/dialog.component';
import { TutorComponent } from './tutor/tutor.component';
<<<<<<< HEAD
import { BigPicModule } from './big-pic/bigPic.module';
=======
import { DataService } from './../shared/service/data.service';
>>>>>>> 9c8f8c20ae8dfb0b506fadb582add97a229b8203

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
