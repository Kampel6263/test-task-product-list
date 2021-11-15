import { addComment, editProduct } from '@src/app/business-logic/redux/store';
import { Field, Formik, Form, validateYupSchema } from 'formik';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductViewProps } from './productView.props';
import * as styles from './productView.scss';
import { State } from '@src/app/business-logic/redux/config';
import { uid } from 'uid';
import { CommentsProps, SizeProps } from '../list/list.props';
import * as Yup from 'yup';
import dayjs from 'dayjs';
/**
 * Renders ProductView
 */

type FormValues = {
  imageUrl: string;
  name: string;
  count: number | null;
  sizeW: number | null;
  sizeH: number | null;
  weight: string;
};

const ProductView: React.FC<ProductViewProps> = ({ infoData, id, editMode, setEditMode }) => {
  const currentEl = infoData.filter((el) => el.id === id)[0];
  const dispatch = useDispatch();
  const { data } = useSelector((state: State) => state.general);

  const validationSchema = Yup.object().shape({
    imageUrl: Yup.string().required('Required'),
    name: Yup.string().required('Required'),
    count: Yup.number().required('Required'),
    sizeW: Yup.number().required('Required'),
    sizeH: Yup.number().required('Required'),
    weight: Yup.string().required('Required')
  });

  const validationSchemaComments = Yup.object().shape({
    description: Yup.string().required('Required')
  });

  const initialValues: FormValues = {
    imageUrl: currentEl.imageUrl,
    name: currentEl.name,
    count: currentEl.count,
    sizeW: currentEl.size.width,
    sizeH: currentEl.size.height,
    weight: currentEl.weight
  };

  const handleSubmit = (values) => {
    const formValues: {
      imageUrl: string;
      name: string;
      count: number;
      size: SizeProps;
      weight: string;
    } = {
      imageUrl: values.imageUrl,
      name: values.name,
      count: values.count,
      size: {
        width: values.sizeW,
        height: values.sizeH
      },
      weight: values.weight
    };
    dispatch(editProduct({ id: id, newValues: formValues, allData: data }));
  };

  const handleSubmitComment = (values) => {
    console.log(values);
    const commentData: CommentsProps = {
      id: uid(),
      productId: id,
      description: values.description,
      date: String(dayjs().format('HH:mm DD.MM.YYYY'))
    };

    dispatch(addComment({ id: id, commentData: commentData, allData: data }));
  };

  return (
    <div className={styles.productView}>
      <div className={styles.info}>
        <img src={currentEl.imageUrl} alt='' />
        {editMode ? (
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(false);
                handleSubmit(values);
                resetForm();
                setEditMode();
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div>
                    <Field type='text' placeholder='Image url:' name='imageUrl' />
                    {errors.imageUrl && touched.imageUrl ? <div className={styles.error}>This field is required *</div> : null}
                  </div>
                  <div>
                    <Field type='name' placeholder='Name:' name='name' />
                    {errors.name && touched.name ? <div className={styles.error}>This field is required *</div> : null}
                  </div>
                  <div>
                    <Field type='number' placeholder='Count:' name='count' />
                    {errors.count && touched.count ? <div className={styles.error}>This field is required *</div> : null}
                  </div>
                  <div>
                    <Field type='number' placeholder='Size width:' name='sizeW' />
                    {errors.sizeW && touched.sizeW ? <div className={styles.error}>This field is required *</div> : null}
                  </div>
                  <div>
                    <Field type='number' placeholder='Size height:' name='sizeH' />
                    {errors.sizeH && touched.sizeH ? <div className={styles.error}>This field is required *</div> : null}
                  </div>

                  <div>
                    <Field type='text' placeholder='Weight:' name='weight' />
                    {errors.weight && touched.weight ? <div className={styles.error}>This field is required *</div> : null}
                  </div>
                  <button type='submit'>Save</button>
                </Form>
              )}
            </Formik>
          </div>
        ) : (
          <div className={styles.content}>
            <h2>Name: {currentEl.name}</h2>
            <div>Id: {currentEl.id}</div>
            <div>Count: {currentEl.count}</div>
            <div>Weight: {currentEl.weight}</div>
            <div>Size width: {currentEl.size.width}</div>
            <div>Size height: {currentEl.size.height}</div>
          </div>
        )}
      </div>
      <div className={styles.commentsBl}>
        <h2>Comments</h2>

        <div className={styles.comments}>
          {currentEl.comments.length > 0 ? (
            currentEl.comments.map((el) => (
              <div key={el.id}>
                <div className={styles.header}>
                  <div>
                    {el.description} - {el.date}
                    <div>Id: {el.id}</div>
                    <div>Product id: {el.productId}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div> Comments is empty </div>
          )}
        </div>
        <Formik
          initialValues={{
            description: ''
          }}
          validationSchema={validationSchemaComments}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(false);
            handleSubmitComment(values);
            resetForm();
          }}
        >
          {({ touched, errors }) => (
            <Form>
              <div>
                <Field type='textarea' placeholder='Input your comment' name='description' />
                {errors.description && touched.description ? <div className={styles.error}>This field is required *</div> : null}
              </div>
              <button type='submit'>Add comment</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export { ProductView };
