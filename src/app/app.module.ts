import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing';

import { RoleplayModule } from './roleplay/roleplay.module';
import { OnlineTestModule} from './online-test/onlineTest.module';

import { AppComponent } from './app.component';
import { SceneComponent } from './scene/scene.component';
import { IndexComponent } from './index/index.component';
<<<<<<< HEAD
import { TutorComponent } from './tutor/tutor.component';
import { DialogComponent } from './tutor/dialog/dialog.component';
import { CardComponent } from './tutor/card/card.component';
import { BigPicComponent } from './tutor/card/big-pic/big-pic.component';
=======
>>>>>>> 186f7f8835777fcf98eebe61d30f994e5742fdab
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MedicalRecordComponent } from './medical-record/medical-record.component';


@NgModule({
    declarations: [
        AppComponent,
        SceneComponent,
        IndexComponent,
        LoginComponent,
        RegisterComponent,
        MedicalRecordComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        RoleplayModule,
        OnlineTestModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
