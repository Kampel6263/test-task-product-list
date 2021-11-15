import { make } from 'redux-chill';

const getAllEl = make('[general] get all items')
  .stage((payload: { id: string }) => payload)
  .stage('submit', (payload: { id: string }) => payload);

const addEl = make('[general] add new item')
  .stage((payload: { allData: object[]; newData: object }) => payload)
  .stage('sumbit', (payload: { allData: object[]; newData: object }) => payload);

const removeEl = make('[general] remove item')
  .stage((payload: { id: string | number; allData: object[] }) => payload)
  .stage('submit', (payload: { id: string | number; allData: object[] }) => payload);

const setPruductView = make('[general] set product view')
  .stage((payload: string) => payload)
  .stage('sumbit', (payload: string) => payload);

const addComment = make('[general] create new comment')
  .stage((payload: { id: string; commentData: object; allData: object[] }) => payload)
  .stage('submit', (payload: { id: string; commentData: object; allData: object[] }) => payload);

const editProduct = make('[general] edit product')
  .stage((payload: { id: string; newValues: object; allData: object[] }) => payload)
  .stage('submit', (payload: { id: string; newValues: object; allData: object[] }) => payload);
export { getAllEl, addEl, removeEl, setPruductView, addComment, editProduct };
