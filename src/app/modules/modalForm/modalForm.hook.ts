import { useDispatch } from 'react-redux';
// import * as React from 'react';
import * as Yup from 'yup';
import { FormValues } from './modalForm.props';

const useModalFormData = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    imageUrl: Yup.string().required('Required'),
    name: Yup.string().required('Required'),
    count: Yup.number().required('Required'),
    sizeW: Yup.number().required('Required'),
    sizeH: Yup.number().required('Required'),
    weight: Yup.string().required('Required')
  });

  const initialValues: FormValues = {
    imageUrl: 'https://nasijagaltangsel.websites.co.in/dummytemplate/img/product-placeholder.png',
    name: '',
    count: null,
    sizeW: null,
    sizeH: null,
    weight: ''
  };

  return { dispatch, validationSchema, initialValues };
};

export { useModalFormData };
