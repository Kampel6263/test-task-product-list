/**
 * Props
 */
type SizeProps = {
  width: number;
  height: number;
};

type CommentsProps = {
  id: string;
  productId: string;
  description: string;
  date: string;
};

type ListData = {
  id: string;
  imageUrl: string;
  name: string;
  count: number;
  size: SizeProps;
  weight: string;
  comments: CommentsProps[];
};

type ItemProps = {
  elData: ListData;
};

export { ItemProps };
