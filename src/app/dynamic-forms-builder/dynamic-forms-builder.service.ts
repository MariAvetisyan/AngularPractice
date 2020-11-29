import {Injectable} from '@angular/core';
import {FormControl, FormControlResult} from './custom-types/form-contorl';
import {HttpClient} from '@angular/common/http';
import {map, tap, scan} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, merge, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DynamicFormsBuilderService {
  private formBuilderUrl = 'api/formControls';

  formBuilder$: Observable<FormControl[]> = this.http.get<FormControl[]>(this.formBuilderUrl);

  private controlResultSubject = new BehaviorSubject<FormControlResult>(null);
  controlResultAction$ = this.controlResultSubject.asObservable();

  formBuilderWithResult$ = combineLatest([
    this.formBuilder$,
    this.controlResultAction$
  ]).pipe(
    map(([formBuilder, controlResult]) =>
      formBuilder.map(formControl => {
        if (controlResult && formControl.id === controlResult.id) {
            formControl.value = controlResult.value;
          }

        return formControl;
        }
      ))
  );

  private sendDataSubject = new BehaviorSubject<boolean>(false);
  sendDataAction$ = this.sendDataSubject.asObservable();

  private newControlSubject = new BehaviorSubject<FormControl>(null);
  newControlAction$ = this.newControlSubject.asObservable();

  formBuilderWithNewControl$ = combineLatest([
    this.formBuilderWithResult$,
    this.newControlAction$
  ]).pipe(
    map(([formBuilder, newControl]) => {
      if (newControl) {
        return [...formBuilder, newControl];
      }

      return formBuilder;
    }),
    tap(item => console.log('esel verjakanna', item))
  );

  constructor(private http: HttpClient) {
  }

  getControlResult(result: FormControlResult) {
    this.controlResultSubject.next(result);
  }

  addNewControl(newControl: FormControl) {
    this.formBuilder$ = this.formBuilderWithNewControl$;
    this.newControlSubject.next(newControl);
  }

  sendData(formControls$: Observable<FormControl[]>) {
    this.sendDataSubject.next(true);

    console.log('Data received: ');
    return this.http.post<Observable<FormControl[]>>(this.formBuilderUrl, formControls$);
  }
}


