import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormControlResult} from './custom-types/form-contorl';
import {DynamicFormsBuilderService} from './dynamic-forms-builder.service';
import {map} from 'rxjs/operators';
import {shareReplay} from 'rxjs/internal/operators';

@Component({
  selector: 'app-dynamic-forms-builder',
  templateUrl: './dynamic-forms-builder.component.html',
  styleUrls: ['./dynamic-forms-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormsBuilderComponent {
  formControls$ = this.dynamicFormService.formBuilderWithResult$;

  constructor(private dynamicFormService: DynamicFormsBuilderService) {
  }

  getControlResult(result: FormControlResult) {
    this.dynamicFormService.getControlResult(result);
  }

  sendData(): void {
    this.validation();
    if(this.isDataValid()) {
      this.dynamicFormService.sendData(this.formControls$);
    }
  }

  validation(): void {
    this.formControls$ = this.dynamicFormService.formBuilderWithResult$.pipe(
      map((formBuilder) =>
        formBuilder.map((formControl: FormControl) => {
          if (formControl.isRequired && !formControl.value) {
            formControl.validationErrorMessage = 'Field is required';
          } else if (formControl.isRequired && formControl.value) {
            formControl.validationErrorMessage = '';
          }
          return formControl;
        })
      ),
      shareReplay(1));
  }

  isDataValid(): boolean {
    let isDataValid;
    this.dynamicFormService.formBuilderWithResult$.subscribe(formControls => {
      let invalidData = formControls.find(item => item.isRequired && !item.value);

      isDataValid = !invalidData;
    });

    return isDataValid;
  }
}
