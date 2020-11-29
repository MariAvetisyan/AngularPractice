import {FormControl} from './custom-types/form-contorl';
import {ControlType} from './custom-types/controls-types';


export class FormControlData {
  static formControls: FormControl[] = [
    {
      type: ControlType.INPUT,
      id: 'name',
      label: 'Enter your name',
      placeholder: 'Name',
      isRequired: true
    },

    {
      type: ControlType.INPUT,
      id: 'surname',
      label: 'Enter your surname',
      placeholder: 'Surname',
      isRequired: true
    },

    {
      type: ControlType.DATEPICKER,
      id: 'birth-date',
      label: 'Birth Date',
      placeholder: 'mm/dd/yyyy',
      isRequired: true
    },

    {
      type: ControlType.RADIO,
      id: 'gender',
      label: 'Gender',
      isRequired: true,
      controlOptions: ['Male', 'Female']
    },

    {
      type: ControlType.NUMBER,
      id: 'phone',
      label: 'Phone number',
      placeholder: '37499999999',
      isRequired: true
    },

    {
      type: ControlType.SELECT,
      id: 'city',
      label: 'City where you live',
      placeholder: 'Select the city',
      isRequired: true,
      controlOptions: ['Yerevan', 'Vanadzor', 'Gyumri', 'Martakert', 'Spitak', 'Martuni']
    },

    {
      type: ControlType.CHECKBOX,
      id: 'hobby',
      label: 'Your hobby',
      isRequired: false,
      controlOptions: ['Playing games', 'Coding', 'Sleeping', 'Hacking', 'Reading']
    },

    {
      type: ControlType.TEXTAREA,
      id: 'info',
      label: 'Additional info',
      placeholder: 'Additional info',
      isRequired: false,
    },
  ];

  static formNewControl: FormControl[] = [
    {
      type: ControlType.SELECT,
      id: 'new-control-type',
      label: 'Choose the type of control',
      controlOptions: ['Select', 'Input', 'Textarea', 'Datepicker', 'Number', 'Radio',
        'Checkbox', 'Button'],
      isRequired: true,
    },

    {
      type: ControlType.INPUT,
      id: 'new-control-id',
      label: 'Enter control id',
      isRequired: true,
    },

    {
      type: ControlType.INPUT,
      id: 'new-control-label',
      label: 'Enter control label',
      isRequired: true,
    },

    {
      type: ControlType.INPUT,
      id: 'new-control-placeholder',
      label: 'Enter control placeholder',
      isRequired: false,
    },

    {
      type: ControlType.INPUT,
      id: 'new-control-control-option',
      label: 'Enter control options',
      isRequired: false,
    },

    {
      type: ControlType.RADIO,
      id: 'new-control-required',
      label: 'Is control required?',
      controlOptions: ['Yes', 'No'],
      isRequired: true,
    }
  ];
}
