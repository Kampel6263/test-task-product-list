/**
 * Props
 */
type ButtonProps = {
  /**
   * Variant
   */
  variant?: string;
  /**
   * Type
   */
  type: 'submit' | 'button' | 'reset';
  /**
   * On click
   */
  onClick: () => void;
  /**
   * Theme
   */
  theme: 'primary' | 'default';
  /**
   * Disabled
   */
  disabled?: boolean;
};

export { ButtonProps };
