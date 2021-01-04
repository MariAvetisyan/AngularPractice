import {ControlType} from './controls-types';

export interface FormControl {
  type: ControlType;
  id: string;
  value?: any;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  controlOptions?: any[];
  hint?: string,
  isRemovable?: boolean;
  validationErrorMessage?: string;
}

export interface FormControlResult {
  type: ControlType;
  id: string;
  value: any;
}

