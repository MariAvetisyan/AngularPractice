import {Injectable} from '@angular/core';
import {FormControl, FormControlResult} from './custom-types/form-contorl';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';

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
      )),
    tap(item => console.log('form control with result', item))
  );


  private sendDataSubject = new BehaviorSubject<boolead>(false);
  sendDataAction$ = this.sendDataSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  getControlResult(result: FormControlResult) {
    this.controlResultSubject.next(result);
  }

  sendData(formControls$: Observable<FormControl[]>) {
    this.sendDataSubject.next(true);

    console.log('Data received: ');
    return this.http.post<Observable<FormControl[]>>(this.formBuilderUrl, formControls$)
      .pipe(
        tap(item => console.log(item))
      );
  }
}


