import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ErrorMessage } from 'formik';
import { FormikProperties } from '../../formik/config/formik-hoc';
import { Icon } from '../icon';
import { OptionsProps } from './options.props';
import * as styles from './options.scss';
import { useDebounce } from '../../utils';
/**
 * Renders Options
 */
const Options: React.FC<OptionsProps & FormikProperties> = ({
  updateFieldValue,
  value,
  properties = [],
  allowSearch = true,
  name,
  error,
  touched
}) => {
  const defaultValue = properties?.find((i) => i.value === value)?.label;

  const [searchValue, setSearchValue] = React.useState<string>(defaultValue || '');
  const [dropdownVisibility, setDropdownVisibility] = React.useState<boolean>(false);

  const filteredProperties = properties.filter((p) => p.label.toLowerCase().includes(searchValue.toLowerCase()));
  const renderProperties = allowSearch ? filteredProperties : properties;

  const debounceValue = useDebounce(searchValue, 3000);

  /**
   * In case user typed value but didn't took with click during search
   */
  React.useEffect(() => {
    if (allowSearch) {
      const typedValue = properties?.find((i) => i.label === searchValue);
      if (typedValue) {
        updateFieldValue(typedValue?.value);
      } else {
        updateFieldValue('');
      }
    }
  }, [debounceValue]);

  return (
    <div className={styles.options}>
      <div className={styles.inputContainer}>
        <input
          value={searchValue}
          readOnly={!allowSearch}
          onChange={({ target }) => {
            setSearchValue(target.value);
          }}
          onFocus={() => {
            if (allowSearch) setDropdownVisibility(true);
          }}
        />
        <Icon name='icon-close' onClick={() => setDropdownVisibility(!dropdownVisibility)} />
      </div>
      {dropdownVisibility && (
        <div className={styles.dropdownContainer}>
          {renderProperties.map((i) => (
            <div
              role='figure'
              className={styles.label}
              key={uuidv4()}
              onKeyDown={() => {
                updateFieldValue(i.value);
              }}
              onClick={() => {
                setDropdownVisibility(false);
                setSearchValue(i.label);
                updateFieldValue(i.value);
              }}
            >
              {i.label}
            </div>
          ))}
        </div>
      )}
      <ErrorMessage name={name} render={(msg) => <div className={styles.error}>{msg}</div>} />
    </div>
  );
};

export { Options };
