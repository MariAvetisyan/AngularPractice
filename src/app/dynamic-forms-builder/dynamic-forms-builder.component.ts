import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormControlResult} from './custom-types/form-contorl';
import {DynamicFormsBuilderService} from './dynamic-forms-builder.service';
import {combineLatest, merge} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {scan} from 'rxjs/internal/operators';

@Component({
  selector: 'app-dynamic-forms-builder',
  templateUrl: './dynamic-forms-builder.component.html',
  styleUrls: ['./dynamic-forms-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormsBuilderComponent {
  formControls$ = combineLatest(
    [this.dynamicFormService.formBuilderWithNewControl$,
            this.dynamicFormService.sendDataAction$])
    .pipe(
      map(([formBuilder, isDataSend]) =>
        formBuilder.map((formControl: FormControl) => {
          if (isDataSend && formControl.isRequired && !formControl.value) {
            formControl.validationErrorMessage = 'Field is required';
          } else if (isDataSend && formControl.isRequired && formControl.value) {
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
