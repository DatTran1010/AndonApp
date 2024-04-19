import React from 'react';
import {RadioButtonComponent} from '../../components';
import {DataRadioButtonType} from '../../types/CommonType';
import {t} from 'i18next';

type Props = {
  onSelectOption: (id: number, label: string) => void;
};
const OptionRadio = (props: Props) => {
  const {onSelectOption} = props;
  const DATA_OPTION: DataRadioButtonType[] = [
    {
      id: 0,
      labelRadio: t('theo-so-lan'),
    },
    {
      id: 1,
      labelRadio: t('theo-so-phut'),
    },
  ];

  const [selected, setSelected] = React.useState(0);

  return (
    <RadioButtonComponent
      horizontal={true}
      dataRadio={DATA_OPTION}
      selected={selected}
      onSelectRadioButton={(id, label) => {
        setSelected(id);
        onSelectOption(id, label);
      }}
    />
  );
};

export default OptionRadio;
