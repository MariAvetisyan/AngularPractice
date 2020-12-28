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

  formBuilderWithResult$ = this.formBuilder$;

  constructor(private http: HttpClient) {
  }

  getFormBuilder(): Observable<FormControl[]> {

    return this.formBuilderWithResult$ = combineLatest([
      this.formBuilderWithResult$,
      this.controlResultAction$,
      this.newControlAction$
    ]).pipe(
      map(([formBuilder, controlResult, newControl]) => {
        formBuilder.map(formControl => {
            if (controlResult && formControl.id === controlResult.id) {
              formControl.value = controlResult.value;
            }

            return formControl;
          }
        );

        if (newControl) {
          return [...formBuilder, newControl];
        }

        return formBuilder;

      }),
      shareReplay(1)
    );
  }

  getControlResult(result: FormControlResult) {
    this.controlResultSubject.next(result);
    this.getFormBuilder();
  }

  addNewControl(newControl: FormControl) {
    this.newControlSubject.next(newControl);
    this.getFormBuilder();
  }

  sendData(formControls$: Observable<FormControl[]>) {
    console.log('Data received: ');
    formControls$.subscribe(item => console.log(item));
    return this.http.post<Observable<FormControl[]>>(this.formBuilderUrl, formControls$);
  }
}


