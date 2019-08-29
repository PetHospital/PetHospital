import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BigPicComponent } from '../big-pic/big-pic.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        BigPicComponent,
    ],
    exports: [BigPicComponent]
})
export class BigPicModule { }
