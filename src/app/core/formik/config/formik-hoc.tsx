import * as React from 'react';
import { FieldMetaProps, FieldProps, useField, useFormikContext } from 'formik';
import { get } from 'object-path';

export type FormikProperties<V = unknown> = Partial<FieldProps> &
  Partial<FieldMetaProps<unknown>> & {
    value?: V;
    updateFieldValue: (val: V) => void;
    disabled?: boolean;
    name: string;
  };

const withField = <P extends FormikProperties>(WrappedComponent: React.FC<P>) => {
  const Component: React.FC<Partial<FormikProperties>> = WrappedComponent;
  const ComponentContext: React.FC<{ name: string }> = (props) => {
    const { name } = props;
    const { values, errors, setFieldValue, ...formik } = useFormikContext<FieldProps>();

    const value = get(values, name);
    const [config, meta] = useField(name);

    return (
      <Component
        {...formik}
        {...props}
        {...meta}
        updateFieldValue={(val) => {
          setFieldValue(name, val);
        }}
        value={value}
      />
    );
  };

  return ComponentContext as React.ComponentType<
    { name: string } & Omit<P, keyof FormikProperties> & Partial<Pick<P, keyof FormikProperties>>
  >;
};

export { withField };
