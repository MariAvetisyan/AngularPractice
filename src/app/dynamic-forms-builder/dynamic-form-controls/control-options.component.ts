import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-control-options',
  templateUrl: './control-options.component.html',
  styleUrls: ['./control-options.component.scss'],
})

export class ControlOptionsComponent {
  public controlOptionsCount = new Array(1);
  public value: string;
  private result = new Array<string>();

  @Output() controlOptionsResultEmitter = new EventEmitter<Array<string>>();

  constructor() {
  }

  addOption(): void {
    this.controlOptionsCount = new Array(this.controlOptionsCount.length + 1);
  }

  getResult(result: string, id: number): void {
    this.result[id] = result;
    this.controlOptionsResultEmitter.emit(this.result);
  }
}
