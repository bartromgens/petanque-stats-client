import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullLayoutComponent } from './nav/full-layout.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    loadChildren: './game/game.module#GameModule',
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes, { enableTracing: false }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
