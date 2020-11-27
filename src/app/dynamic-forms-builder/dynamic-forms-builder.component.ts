import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormControlResult} from './custom-types/form-contorl';
import {DynamicFormsBuilderService} from './dynamic-forms-builder.service';
import {combineLatest} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-dynamic-forms-builder',
  templateUrl: './dynamic-forms-builder.component.html',
  styleUrls: ['./dynamic-forms-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormsBuilderComponent {
  formControls$ = combineLatest(
    [this.dynamicFormService.formBuilderWithResult$,
            this.dynamicFormService.sendDataAction$])
    .pipe(
      map(([formBuilder, isDatSend]) =>
        formBuilder.map((formControl: FormControl) => {
          if (isDatSend && formControl.isRequired && !formControl.value) {
            formControl.validationErrorMessage = 'Field is required';
          } else if (isDatSend && formControl.isRequired && formControl.value) {
            formControl.validationErrorMessage = '';
          }
          return formControl;
        })
      ));


  constructor(private dynamicFormService: DynamicFormsBuilderService) {
  }

  getControlResult(result: FormControlResult) {
    this.dynamicFormService.getControlResult(result);
  }

  sendData(): void {
    this.dynamicFormService.sendData(this.formControls$);
  }
}
