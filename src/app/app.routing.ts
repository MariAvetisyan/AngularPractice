import {Routes} from '@angular/router';
import {DynamicFormsBuilderComponent} from './dynamic-forms-builder/dynamic-forms-builder.component';
import {AddNewControlComponent} from './dynamic-forms-builder/add-new-control/add-new-control.component';

export const appRoutes: Routes = [
  {path: 'form-builder', component: DynamicFormsBuilderComponent},
  {path: 'new-control', component: AddNewControlComponent},
  { path: '', redirectTo: '/form-builder', pathMatch: 'full' },
];
