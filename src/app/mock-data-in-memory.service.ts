import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {FormControlData} from './dynamic-forms-builder/form-controle-data';

@Injectable({
  providedIn: 'root',
})

export class MockDataInMemoryService implements InMemoryDbService {
  createDb() {
    const formControls = FormControlData.formControls;

    return {formControls};
  }
}
