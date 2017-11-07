import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ChordsComponent } from './chords.component';
import { routes } from './chords.router';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { ChordCalculatorService } from './chordCalculator.service';
import { WindowRefService } from './windowRefService.service';



@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    MultiselectDropdownModule
  ],
  declarations: [
    ChordsComponent
  ],
  providers: [
    WindowRefService,
    ChordCalculatorService
  ],
  bootstrap: [
    ChordsComponent
  ]
})
export class ChordsModule {}
