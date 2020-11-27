import {Routes} from '@angular/router';
import {DynamicFormsBuilderComponent} from './dynamic-forms-builder/dynamic-forms-builder.component';

export const appRoutes: Routes = [
  {path: 'form-builder', component: DynamicFormsBuilderComponent},
  { path: '', redirectTo: '/form-builder', pathMatch: 'full' },
];
