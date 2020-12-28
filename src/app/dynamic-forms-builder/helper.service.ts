import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {FormControl} from './custom-types/form-contorl';
import {map, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HelperService {

  static isValidationError(formControls: Observable<FormControl[]>): boolean {
    let isValidationError;
    formControls.subscribe(formControls => {
      let invalidData = formControls.find(item => item.isRequired && !item.value);

      isValidationError = !invalidData;
    });

    return isValidationError;
  }

  static validation(formControls: Observable<FormControl[]>): Observable<FormControl[]> {
    return formControls.pipe(
      map((formBuilder) =>
        formBuilder.map((formControl: FormControl) => {
          if (formControl.isRequired && !formControl.value) {
            formControl.validationErrorMessage = 'Field is required';
          } else if (formControl.isRequired && formControl.value) {
            formControl.validationErrorMessage = '';
          }
          //why not working?
          // newControl = ({
          //   ...newControl,
          //   value: newControl.id == controlResult.id ? controlResult.value : ''
          // }) as FormControl;

          return formControl;
        })
      ),
      shareReplay(1));
  }

}


