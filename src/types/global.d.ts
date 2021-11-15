/**
 * Extract payload from creator
 */
declare type Payload<T extends ActionCreator<any>> = ReturnType<T>['payload'];

/**
 * Mapping object
 */
interface ObjectConstructor {
  /**
   * Returns an object created by key-value entries for properties and methods
   * @param entries An iterable object that contains key-value entries for properties and methods.
   */
  fromEntries<T = unknown>(entries: Iterable<readonly [PropertyKey, T]>): { [k in PropertyKey]: T };

  /**
   * Returns an object created by key-value entries for properties and methods
   * @param entries An iterable object that contains key-value entries for properties and methods.
   */
  fromEntries(entries: Iterable<readonly any[]>): any;
}
