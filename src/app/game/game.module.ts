import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { GameRoutingModule } from './game-routing.module';
import { GamesComponent } from './games.component';
import { GameNewComponent } from './game-new.component';
import { TeamsComponent } from './teams.component';
import { PlayerSkillsComponent } from './player-skills.component';
import { TeamSkillsComponent } from './team-skills.component';

/**
 * The User module contains view components related
 * to user profile and user management.
 */
@NgModule({
  imports: [
    SharedModule,
    GameRoutingModule
  ],
  declarations: [
    GamesComponent,
    GameNewComponent,
    TeamsComponent,
    PlayerSkillsComponent,
    TeamSkillsComponent
  ],
})
export class GameModule { }
