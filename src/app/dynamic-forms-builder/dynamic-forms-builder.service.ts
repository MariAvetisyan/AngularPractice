import {Injectable} from '@angular/core';
import {FormControl, FormControlResult} from './custom-types/form-contorl';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {shareReplay} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})

export class DynamicFormsBuilderService {
  private formBuilderUrl = 'api/formControls';

  formBuilder$: Observable<FormControl[]> = this.http.get<FormControl[]>(this.formBuilderUrl);

  private newControlSubject = new BehaviorSubject<FormControl>(null);
  newControlAction$ = this.newControlSubject.asObservable();

  private controlResultSubject = new BehaviorSubject<FormControlResult>(null);
  controlResultAction$ = this.controlResultSubject.asObservable();

  private removeControlSubject = new BehaviorSubject<string>(null);
  removeControlAction$ = this.removeControlSubject.asObservable();

  formBuilderWithResult$ = combineLatest([
    this.formBuilder$,
    this.controlResultAction$,
    this.newControlAction$,
    this.removeControlAction$
  ]).pipe(
    map(([formBuilder, controlResult, newControl, removeControl]) => {
      if (newControl) {
        formBuilder = [...formBuilder, newControl];
      }

      formBuilder.map(formControl => {
          if (controlResult && formControl.id === controlResult.id) {
            formControl.value = controlResult.value;
          }

          return formControl;
        }
      );

      if(removeControl) {
        formBuilder.splice(formBuilder.indexOf(formBuilder.find(item => item.id == removeControl)), 1);
      }

      return formBuilder;

    }),
    shareReplay(1)
  );

  constructor(private http: HttpClient) {
  }

  getControlResult(result: FormControlResult) {
    this.controlResultSubject.next(result);
  }

  addNewControl(newControl: FormControl) {
    this.newControlSubject.next(newControl);
  }

  removeControl(controlId: string) {
    this.removeControlSubject.next(controlId);
  }

  sendData(formControls$: Observable<FormControl[]>) {
    console.log('Data received: ');
    formControls$.subscribe(item => console.log(item));
    return this.http.post<Observable<FormControl[]>>(this.formBuilderUrl, formControls$);
  }
}
