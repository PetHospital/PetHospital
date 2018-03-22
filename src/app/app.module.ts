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
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MedicalRecordComponent } from './medical-record/medical-record.component';

import { PracticeComponent } from './practice/practice.component';
import { ExamComponent } from './exam/exam.component';


@NgModule({
    declarations: [
        AppComponent,
        SceneComponent,
        IndexComponent,
        LoginComponent,
        RegisterComponent,
        MedicalRecordComponent,
        PracticeComponent,
        ExamComponent,
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
