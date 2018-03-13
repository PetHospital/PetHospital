import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SceneComponent } from './scene/scene.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AppRoutingModule } from './app.routing';

@NgModule({
    declarations: [
        AppComponent,
        SceneComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
