import {Component} from '@angular/core';
import {FormControl, FormControlResult} from './custom-types/form-contorl';
import {DynamicFormsBuilderService} from './dynamic-forms-builder.service';

@Component({
  selector: 'app-dynamic-forms-builder',
  templateUrl: './dynamic-forms-builder.component.html',
  styleUrls: ['./dynamic-forms-builder.component.scss'],
})
export class DynamicFormsBuilderComponent {
  formControls$ = this.dynamicFormService.formBuilder$;


  constructor(private dynamicFormService: DynamicFormsBuilderService) {
  }

  getControlResult(result: FormControlResult) {
    this.dynamicFormService.getControlResult(result);
  }

  sendData(): void {
    // TODO: implement sendData function
  }

  isThereValidationError(item: FormControl) {
    // TODO: implement
  }
}
