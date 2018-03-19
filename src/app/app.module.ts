import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SceneComponent } from './scene/scene.component';
import { IndexComponent } from './index/index.component';

import { AppRoutingModule } from './app.routing';

@NgModule({
    declarations: [
        AppComponent,
        SceneComponent,
        IndexComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
