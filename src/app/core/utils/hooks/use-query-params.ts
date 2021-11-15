import { AddQuery, RemoveQuery, ResetQuery } from '@src/app/core/typescript';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { objectMap } from './use-object-map';

const useQueryParams = () => {
  const history = useHistory();
  const { pathname } = history.location;
  const parsedQueries = queryString.parse(history.location.search.slice(1));
  /**
   * Remove query
   */
  const removeQueryParam = ({ query }: RemoveQuery): void => {
    delete parsedQueries[query];
    const stringified = queryString.stringify(parsedQueries);
    history.replace({
      pathname,
      search: stringified
    });
  };
  /**
   * Add query
   */
  const addQueryParam = ({ query, value }: AddQuery): void => {
    parsedQueries[query] = value;
    const stringified = queryString.stringify(parsedQueries);
    history.replace({ pathname, search: stringified });
  };
  /**
   * Reset query
   */
  const resetQueryParams = ({ exceptions, add }: ResetQuery): void => {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in parsedQueries) {
      if (!exceptions.includes(key)) {
        delete parsedQueries[key];
      }
    }
    add.forEach((item) => {
      parsedQueries[item.key] = item.value;
    });
    const stringified = queryString.stringify(parsedQueries);
    history.replace({ pathname, search: stringified });
  };
  /**
   * Parsing types
   */
  const parsedObject = objectMap(parsedQueries, (value, key) => {
    if (value === 'true') {
      return true;
    }
    if (value === 'false') {
      return false;
    }
    if (!Number.isNaN(value)) {
      return Number(value);
    }
    return value;
  });

  return {
    history,
    urlQueries: parsedObject,
    removeQueryParam,
    addQueryParam,
    resetQueryParams
  };
};
export { useQueryParams };
