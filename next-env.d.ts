/// <reference types="next" />
/// <reference types="next/types/global" />

type SvgrComponent = React.StatelessComponent<React.SVGAttributes<SVGElement>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type AnyObject = Record<any, any>;

declare module '*.svg' {
  const value: SvgrComponent;
  export default value;
}
