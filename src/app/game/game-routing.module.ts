import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameComponent } from './game.component';
import { GameNewComponent } from './game-new.component';

const mapRoutes: Routes = [
  {
    path: '',
    component: GameComponent,
    data: {
      title: 'Petanque Stats'
    },
  },
  {
    path: 'games/new',
    component: GameNewComponent,
    data: {
      title: 'Add New Game'
    },
  },
  // {
  //   path: 'game/:id',
  //   component: GameComponent,
  //   data: {
  //     title: 'Petanque Game'
  //   },
  // }
];


@NgModule({
  imports: [ RouterModule.forChild(mapRoutes) ],
  exports: [ RouterModule ]
})
export class GameRoutingModule {}
