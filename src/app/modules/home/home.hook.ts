import { useSelector } from 'react-redux';
import { State } from '@src/app/business-logic/redux/config';

/**
 *
 */
const useHomeData = () => {
  const { data, currentPruductView } = useSelector((state: State) => state.general);
  return { data, currentPruductView };
};

export { useHomeData };
