import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CacheService } from './cache.service';
import { GameService } from './game.service';

/**
 * The Core module contains global singleton services.
 */
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    CacheService,
    GameService
  ]
})
export class CoreModule {
  /**
   * Prevent feature-modules from importing this module.
   * Should only be imported by root module.
   */
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
