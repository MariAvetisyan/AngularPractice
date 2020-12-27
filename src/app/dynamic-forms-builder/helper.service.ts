import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {FormControl, FormControlResult} from './custom-types/form-contorl';
import {map, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HelperService {

  static isDataValid(data: Observable<FormControl[]>): boolean {
    let isDataValid;
    data.subscribe(formControls => {
      let invalidData = formControls.find(item => item.isRequired && !item.value);

      isDataValid = !invalidData;
    });

    return isDataValid;
  }

  static validation(data: Observable<FormControl[]>): Observable<FormControl[]> {
    return data.pipe(
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

  static combineControlsWithResults(formControl: Observable<FormControl[]>, result: Observable<FormControlResult>): Observable<FormControl[]> {
    return combineLatest([
      formControl,
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


