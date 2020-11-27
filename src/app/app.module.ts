import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicFormControlsComponent } from './dynamic-forms-builder/dynamic-form-controls/dynamic-form-controls.component';
import {MaterialModule} from './material.module';
import { DynamicFormsBuilderComponent } from './dynamic-forms-builder/dynamic-forms-builder.component';
import {RequiredDirective} from './directives/required-directive.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {appRoutes} from './app.routing';
import {HttpClientModule} from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockDataInMemoryService } from './mock-data-in-memory.service';

@NgModule({
  declarations: [
    AppComponent,
    DynamicFormControlsComponent,
    DynamicFormsBuilderComponent,
    RequiredDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      MockDataInMemoryService, { dataEncapsulation: false }
    ),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
