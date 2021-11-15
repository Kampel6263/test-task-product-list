/**
 * Use query params
 */
type RemoveQuery = {
  query: string;
};

type AddQuery = {
  query: string;
  value: any;
};

type ResetQuery = {
  exceptions: string[];
  add: { key: string; value: any }[];
};

export { AddQuery, RemoveQuery, ResetQuery };
