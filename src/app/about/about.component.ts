import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { IAppState } from '../store/index';

@Component({
  selector: 'app-about',
  styleUrls: ['./about.component.css'],
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {

  constructor(public fb: FormBuilder, public store: Store<IAppState>) {}

  ngOnInit(): void {

  }
}
