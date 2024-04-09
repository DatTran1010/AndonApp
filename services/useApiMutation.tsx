import {useDispatch} from 'react-redux';
import {MutationFunction, useMutation} from '@tanstack/react-query';
import {setOverlay} from '../src/redux/AppSlice';

interface Props<T, TVariables> {
  mutationFn: MutationFunction<T, TVariables>;
}
const useApiMutation = <T, TVariables>(props: Props<T, TVariables>) => {
  const {mutationFn} = props;
  const dispatch = useDispatch();

  const mutation = useMutation<T, Error, TVariables, unknown>({
    mutationFn: mutationFn,
  });

  // Trả về mutation và các giá trị cần thiết khác (nếu có)
  return mutation;
};

export default useApiMutation;
