import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamesComponent } from './games.component';
import { GameNewComponent } from './game-new.component';
import { TeamsComponent } from './teams.component';
import { PlayerSkillsComponent } from './player-skills.component';

const mapRoutes: Routes = [
  {
    path: '',
    component: GamesComponent,
    data: {
      title: 'Petanque Stats'
    },
  },
  {
    path: 'games',
    component: GamesComponent,
    data: {
      title: 'Games'
    },
  },
  {
    path: 'games/new',
    component: GameNewComponent,
    data: {
      title: 'Add New Game'
    },
  },
  {
    path: 'teams',
    component: TeamsComponent,
    data: {
      title: 'Teams'
    },
  },
  {
    path: 'players/skills',
    component: PlayerSkillsComponent,
    data: {
      title: 'Player Skills'
    },
  }
];


@NgModule({
  imports: [ RouterModule.forChild(mapRoutes) ],
  exports: [ RouterModule ]
})
export class GameRoutingModule {}
