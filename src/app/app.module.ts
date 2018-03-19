import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SceneComponent } from './scene/scene.component';
import { IndexComponent } from './index/index.component';
import { DialogComponent } from './dialog/dialog.component';
import { BigPicComponent } from './big-pic/big-pic.component';
import { CardComponent } from './card/card.component';
import { TutorComponent } from './tutor/tutor.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MedicalRecordComponent } from './medical-record/medical-record.component';


@NgModule({
    declarations: [
        AppComponent,
        SceneComponent,
        IndexComponent,
        DialogComponent,
        BigPicComponent,
        CardComponent,
        TutorComponent,
        LoginComponent,
        RegisterComponent,
        MedicalRecordComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
