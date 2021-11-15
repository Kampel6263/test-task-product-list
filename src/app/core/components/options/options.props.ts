import { Option } from '@src/app/core/typescript';

/**
 * Props
 */
type OptionsProps = {
  properties: Option<string | number>[];
  allowSearch?: boolean;
  name?: string;
};

export { OptionsProps };
