import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameComponent } from './game.component';

const mapRoutes: Routes = [
  {
    path: '',
    component: GameComponent,
    data: {
      title: 'Petanque Stats'
    },
  },
  {
    path: 'game/:id',
    component: GameComponent,
    data: {
      title: 'Petanque Game'
    },
  },
];


@NgModule({
  imports: [ RouterModule.forChild(mapRoutes) ],
  exports: [ RouterModule ]
})
export class GameRoutingModule {}
