import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing';

import { RoleplayModule } from './roleplay/roleplay.module';
import { OnlineTestModule} from './online-test/onlineTest.module';
import { ImageUploadModule } from "angular2-image-upload";
import { AppComponent } from './app.component';
import { SceneComponent } from './scene/scene.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MedicalRecordModule } from './medical-record/medicalRecord.module';
import { UserinfoComponent } from './userinfo/userinfo.component';


@NgModule({
    declarations: [
        AppComponent,
        SceneComponent,
        IndexComponent,
        LoginComponent,
        RegisterComponent,
        UserinfoComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        RoleplayModule,
        OnlineTestModule,
        MedicalRecordModule,
        ImageUploadModule.forRoot(),
    ],
    providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: APP_BASE_HREF, useValue: '/' }],
    bootstrap: [AppComponent]
})
export class AppModule {}
