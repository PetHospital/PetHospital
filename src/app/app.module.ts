import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SceneComponent } from './scene/scene.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AppRoutingModule } from './app.routing';
import { DialogComponent } from './dialog/dialog.component';
import { BigPicComponent } from './big-pic/big-pic.component';
import { CardComponent } from './card/card.component';
import { TutorComponent } from './tutor/tutor.component';

@NgModule({
    declarations: [
        AppComponent,
        SceneComponent,
        DialogComponent,
        BigPicComponent,
        CardComponent,
        TutorComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
