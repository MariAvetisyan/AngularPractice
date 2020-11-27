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
}
