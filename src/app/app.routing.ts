import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SceneComponent } from './scene/scene.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from '../app/login/login.component';
import { RegisterComponent } from '../app/register/register.component';


export const appRoutes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'scene', component: SceneComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: RegisterComponent},
    { path: 'scene', component: SceneComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
