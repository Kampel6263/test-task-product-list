import { addEl } from '@src/app/business-logic/redux/store';
import { Field, Form, Formik } from 'formik';
import * as React from 'react';
import { uid } from 'uid';
import * as styles from './modalForm.scss';
import { ListData } from '../list/list.props';
import { useModalFormData } from './modalForm.hook';
/**
 * Renders ModalForm
 */

const ModalForm = ({ data, closeModal }) => {
  const { dispatch, initialValues, validationSchema } = useModalFormData();

  const handleSubmit = (values) => {
    const formValues: ListData = {
      id: uid(),
      imageUrl: values.imageUrl,
      name: values.name,
      count: values.count,
      size: {
        width: values.sizeW,
        height: values.sizeH
      },
      weight: values.weight,
      comments: []
    };

    dispatch(addEl({ allData: data, newData: formValues }));
  };

  return (
    <div className={styles.modalForm}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h2>Creating new item</h2>
          <span className={styles.close} onClick={() => closeModal()}>
            &times;
          </span>
        </div>
        <div className={styles.form}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(false);
              handleSubmit(values);
              resetForm();
              closeModal();
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

                <button type='submit'>Create</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export { ModalForm };
