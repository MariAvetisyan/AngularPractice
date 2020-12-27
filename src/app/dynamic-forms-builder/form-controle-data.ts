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
      controlOptions: [ControlType.SELECT, ControlType.RADIO, ControlType.CHECKBOX, ControlType.NUMBER, ControlType.DATEPICKER,
        ControlType.TEXTAREA, ControlType.INPUT],
      isRequired: true,
      isShow: true
    },

    {
      type: ControlType.INPUT,
      id: 'new-control-id',
      label: 'Control id',
      isRequired: true,
      isShow: true
    },

    {
      type: ControlType.INPUT,
      id: 'new-control-label',
      label: 'Control label',
      isRequired: true,
      isShow: true
    },

    {
      type: ControlType.INPUT,
      id: 'new-control-placeholder',
      label: 'Control placeholder',
      isRequired: false,
      isShow: true
    },

    // {
    //   type: ControlType.INPUT,
    //   id: 'new-control-control-option',
    //   label: 'Control options',
    //   hint: 'Type options separate with comma and space',
    //   isRequired: true,
    //   isShow: false
    // },

    {
      type: ControlType.INPUT,
      id: 'new-control-hint',
      label: 'Control hint',
      isRequired: false,
      isShow: true
    },

    {
      type: ControlType.RADIO,
      id: 'new-control-required',
      label: 'Is control required?',
      controlOptions: ['Yes', 'No'],
      isRequired: true,
      isShow: true
    }
  ];
}
