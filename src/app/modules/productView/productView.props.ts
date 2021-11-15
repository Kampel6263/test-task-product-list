import { type } from 'os';
import { boolean } from 'yup';
import { ListData } from '../list/list.props';

/**
 * Props
 */

type;

type ProductViewProps = {
  infoData: ListData[];
  id: string;
  editMode: boolean;
  setEditMode: () => void;
};

export { ProductViewProps };
