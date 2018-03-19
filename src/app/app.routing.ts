import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SceneComponent } from './scene/scene.component';
import { IndexComponent } from './index/index.component';

export const appRoutes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'scene', component: SceneComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
