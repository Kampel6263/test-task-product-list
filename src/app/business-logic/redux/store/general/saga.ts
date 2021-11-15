import { Saga } from 'redux-chill';
import { put, call } from 'redux-saga/effects';
import { SagasContext } from '../../config/sagas-context';
import { getAllEl, addEl, removeEl, setPruductView, addComment, editProduct } from './actions';
/**
 * general saga
 */
class GeneralSaga {
  /**
   * App init
   */

  @Saga(getAllEl)
  public *getAllEl(payload: Payload<typeof getAllEl>, { api }: SagasContext) {
    try {
      const response = yield call(api.general.fetchEl, payload.id);

      yield put(getAllEl.submit(response));
    } catch (error) {
    } finally {
    }
  }
  @Saga(addEl)
  public *addEl(payload: Payload<typeof addEl>, { api }: SagasContext) {
    try {
      console.log(payload, 'in sagas');
      const response = yield call(api.general.addEl, payload.allData, payload.newData);
      yield put(addEl.sumbit(response));
    } catch (error) {}
  }
  @Saga(removeEl)
  public *removeEl(payload: Payload<typeof removeEl>, { api }: SagasContext) {
    try {
      console.log(payload.id, 'pl id');

      const response = yield call(api.general.removeEl, payload.id, payload.allData);
      yield put(removeEl.submit(response));
    } catch (error) {}
  }
  @Saga(setPruductView)
  public *setPruductView(payload: Payload<typeof setPruductView>, { api }: SagasContext) {
    try {
      const response = yield call(api.general.pruductView, payload);
      yield put(setPruductView.sumbit(response));
    } catch (error) {}
  }
  @Saga(addComment)
  public *addComment(payload: Payload<typeof addComment>, { api }: SagasContext) {
    try {
      const response = yield call(api.general.addComment, payload.id, payload.commentData, payload.allData);

      yield put(addComment.submit(response));
    } catch (error) {}
  }
  @Saga(editProduct)
  public *editProduct(payload: Payload<typeof editProduct>, { api }: SagasContext) {
    try {
      const response = yield call(api.general.editProduct, payload.id, payload.newValues, payload.allData);
      yield put(editProduct.submit(response));
    } catch (error) {}
  }
}

export { GeneralSaga };
