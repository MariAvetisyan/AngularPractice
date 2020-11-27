import {Injectable} from '@angular/core';
import {FormControl, FormControlResult} from './custom-types/form-contorl';
import {HttpClient} from '@angular/common/http';
import {map, tap, scan} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, forkJoin, merge, Subject} from 'rxjs';
import {ControlType} from './custom-types/controls-types';

@Injectable({
  providedIn: 'root'
})

export class DynamicFormsBuilderService {
  private formBuilderUrl = 'api/formControls';
  formControlsWithResults: Array<FormControl[]>;

  formBuilder$ = this.http.get<FormControl[]>(this.formBuilderUrl)
    .pipe(
      tap(data => console.log(JSON.stringify(data)))
    );

  // private controlResultSubject = new Subject<FormControl>();
  // controlResultAction$ = this.controlResultSubject.asObservable();
  //
  // formBuilderWithResult$ = combineLatest([
  //   this.formBuilder$,
  //   this.controlResultAction$
  // ]).pipe(
  //   map(([formBuilder, controlResult]) =>
  //     formBuilder.map(formControl => {
  //       console.log('dsd', controlResult);
  //       if (controlResult && formControl.id === controlResult.id) {
  //         formControl.value = controlResult.value;
  //       }
  //       return formControl; }
  //     )),
  //   tap(item => console.log('form control with result', item))
  // );
  //

  constructor(private http: HttpClient) {
  }

  getControlResult(result: FormControlResult) {
    // this.controlResultSubject.next(result);

    this.formBuilder$ = this.formBuilder$.pipe(
      map((formBuilder: FormControl[]) => formBuilder.map( (formControl: FormControl) => {
        if (formControl.id === result.id) {
          formControl.value = result.value;
        }
        return formControl;
      }))
    );

    this.formBuilder$.subscribe(item => console.log('item with results', item));
  }

  sendData() {
    console.log('Data received: ');
   // TODO: impl
  }
}


