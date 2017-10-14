import { Route } from '@angular/router';

export const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'chords'},
  { loadChildren: 'app/chords/chords.module#ChordsModule', path: 'chords' },
  { loadChildren: 'app/about/about.module#AboutModule', path: 'about' }
];
