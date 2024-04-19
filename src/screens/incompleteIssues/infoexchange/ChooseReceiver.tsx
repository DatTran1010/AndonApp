import React from 'react';
import {SelectionComponent} from '../../../components';
import {useQuery} from '@tanstack/react-query';
import issuesService from '../../../apis/issuesService';
import {useAppSelector} from '../../../redux/Store';

type Props = {
  idmay: number;
  idsc: number;
  onPressSelection?: (value: any) => void;
};
const ChooseReceiver = (props: Props) => {
  const {idmay, onPressSelection, idsc} = props;
  const {userName, language} = useAppSelector(state => state.app);

  const dataComboCurrentReceiver = useQuery({
    queryKey: ['cbo-current-receiver'],
    queryFn: () =>
      issuesService.getComboCurrentReceiver(userName, language, idmay, idsc),
  });

  return (
    <SelectionComponent
      //   placeholder={t('nguoi-nhan')}
      placeholder={''}
      data={
        (dataComboCurrentReceiver.data &&
          (dataComboCurrentReceiver.data.ResponseData as [])) ||
        []
      }
      labelField="label"
      valueField="value"
      value={'-1'} //default value
      onPressSelection={onPressSelection}
    />
  );
};

export default ChooseReceiver;
