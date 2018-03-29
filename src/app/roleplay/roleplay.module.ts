import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BigPicComponent } from './big-pic/big-pic.component';
import { CardComponent } from './card/card.component';
import { DialogComponent } from './dialog/dialog.component';
import { TutorComponent } from './tutor/tutor.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        BigPicComponent,
        CardComponent,
        DialogComponent,
        TutorComponent
    ],
    exports: [TutorComponent]
})
export class RoleplayModule { }
