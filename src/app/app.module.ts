import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing';

import { NavigationModule } from './navigation/navigation.module';
import { RoleplayModule } from './roleplay/roleplay.module';
import { MedicalRecordModule } from './medical-record/medicalRecord.module';
import { OnlineTestModule} from './online-test/onlineTest.module';
import { ImageUploadModule } from "angular2-image-upload";
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ErrorComponent } from './error/error.component';
import { UserinfoComponent } from './userinfo/userinfo.component';

import { DataService } from './shared/service/data.service';

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        LoginComponent,
        RegisterComponent,
        UserinfoComponent,
        ErrorComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NavigationModule,
        RoleplayModule,
        OnlineTestModule,
        MedicalRecordModule,
        SharedModule,
        ImageUploadModule.forRoot(),
    ],
    providers: [
        DataService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
