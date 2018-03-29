import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RoleplayModule } from './roleplay/roleplay.module';
import { OnlineTestModule} from './online-test/onlineTest.module';

import { AppComponent } from './app.component';
import { SceneComponent } from './scene/scene.component';
import { IndexComponent } from './index/index.component';

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
        BrowserAnimationsModule,
        HttpClientModule,
        RoleplayModule,
        OnlineTestModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
