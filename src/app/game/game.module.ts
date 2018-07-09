import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';

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
    GameComponent
  ],
})
export class GameModule { }
