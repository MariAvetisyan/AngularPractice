import { Component } from '@angular/core';
import {FormControlData} from '../form-controle-data';
import {FormControl} from '../custom-types/form-contorl';
import {DynamicFormsBuilderService} from '../dynamic-forms-builder.service';
import {ControlType} from '../custom-types/controls-types';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-new-control',
  templateUrl: './add-new-control.component.html',
  styleUrls: ['./add-new-control.component.scss']
})
export class AddNewControlComponent {

  addNewForm = FormControlData.formNewControl;

  private formControl: FormControl = {
    type: undefined,
    id: undefined,
    label: undefined,
    placeholder: undefined,
    isRequired: undefined,
    controlOptions: undefined,
  };


  constructor(private dynamicFormService: DynamicFormsBuilderService,
              private router: Router) { }

  getControlResult(event) {
    switch (event.id) {
      case 'new-control-type':
        switch (event.value) {
          case 'Select':
            this.formControl.type = ControlType.SELECT;
            break;
          case 'Input':
            this.formControl.type = ControlType.INPUT;
            break;
          case 'Textarea':
            this.formControl.type = ControlType.TEXTAREA;
            break;
          case 'Datepicker':
            this.formControl.type = ControlType.DATEPICKER;
            break;
          case 'Number':
            this.formControl.type = ControlType.NUMBER;
            break;
          case 'Radio':
            this.formControl.type = ControlType.RADIO;
            break;
          case 'Checkbox':
            this.formControl.type = ControlType.CHECKBOX;
            break;
        }
        break;
      case 'new-control-id':
        this.formControl.id = event.value;
        break;
      case 'new-control-label':
        this.formControl.label = event.value;
        break;
      case 'new-control-placeholder':
        this.formControl.placeholder = event.value;
        break;
      case 'new-control-control-option':
        this.formControl.controlOptions = event.value.split(', ');
        break;
      case 'new-control-required':
        this.formControl.isRequired = event.value === 'Yes';
        break;
    }
  }

  addControl(): void {
    this.dynamicFormService.addNewControl(this.formControl);
    this.router.navigateByUrl('/form-builder');
  }
}
