import {Injectable} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {FormControl, FormControlResult} from './custom-types/form-contorl';
import {map, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HelperService {

  static isDataValid(formControls: Observable<FormControl[]>): boolean {
    let isDataValid;
    formControls.subscribe(formControls => {
      let invalidData = formControls.find(item => item.isRequired && !item.value);

      isDataValid = !invalidData;
    });

    return isDataValid;
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

  static combineControlsWithResults(formControls: Observable<FormControl[]>, result: Observable<FormControlResult>): Observable<FormControl[]> {
    return combineLatest([
      formControls,
      result
    ]).pipe(
      map(([formBuilder, controlResult]) =>
        formBuilder.map(formControl => {
            if (controlResult && formControl.id === controlResult.id) {
              formControl.value = controlResult.value;
            }

            return formControl;
          }
        )),
      shareReplay(1)
    );
  }

}


