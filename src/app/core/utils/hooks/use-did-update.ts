import * as React from 'react';
/**
 *
 * @param effect Function to execute when deps have changed
 * @param deps array of dependencies
 */
const useDidUpdate = (effect: typeof Function, deps: any) => {
  const didMountRef = React.useRef(false);
  React.useEffect(() => {
    if (didMountRef.current) {
      effect();
    } else {
      didMountRef.current = true;
    }
  }, deps);
};

export { useDidUpdate };
