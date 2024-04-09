import {useDispatch} from 'react-redux';
import {setShowToast, setShowToastModal} from '../redux/AppSlice';
import {t} from 'i18next';

interface Props {
  toastModal?: boolean;
  message: any;
  type: 'success' | 'error' | 'warning' | 'info';
}

const useShowToast = () => {
  const dispatch = useDispatch();

  const showToast = (props: Props) => {
    const {message, type, toastModal = false} = props;
    dispatch(
      toastModal
        ? setShowToastModal({
            body: message as string,
            showToast: true,
            title: t('thong-bao'),
            type: type,
          })
        : setShowToast({
            body: message as string,
            showToast: true,
            title: t('thong-bao'),
            type: type,
          }),
    );
  };

  return showToast;
};

export default useShowToast;
