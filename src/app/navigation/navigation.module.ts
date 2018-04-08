import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SceneComponent } from './scene/scene.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SceneComponent
    ],
    exports: [
        SceneComponent
    ]
})
export class NavigationModule { }
