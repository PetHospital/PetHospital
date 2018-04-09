import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';

import { SceneComponent } from './scene/scene.component';
import { GalleryComponent } from './gallery/gallery.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule
    ],
    declarations: [
        SceneComponent,
        GalleryComponent
    ],
    exports: [
        SceneComponent
    ]
})
export class NavigationModule { }
