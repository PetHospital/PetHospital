import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SceneComponent } from './scene/scene.component';
import { SharedModule } from './../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        SceneComponent
    ],
    exports: [
        SceneComponent
    ]
})
export class NavigationModule { }
