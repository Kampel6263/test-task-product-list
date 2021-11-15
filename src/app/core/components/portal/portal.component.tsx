import * as React from 'react';
import { createPortal } from 'react-dom';
import { PortalProps } from './portal.props';

/**
 * Renders Portal
 */
const Portal: React.FC<PortalProps> = ({ children, domNode }) => {
  const rootElement = document.getElementById(domNode);
  return createPortal(children, rootElement);
};

export { Portal };
