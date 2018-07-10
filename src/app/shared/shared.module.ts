import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CollapseModule } from 'ngx-bootstrap';

/**
 * The Shared module contains general modules and components to be used in feature modules.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule,
  ],
  declarations: [
  ],
  exports: [
    // external shared modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule,
  ],
})
export class SharedModule {
}
