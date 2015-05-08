/**
 * Source: https://github.com/jbrantly/reactconf/blob/master/src_ts/lib/react-jsx.d.ts
 */

///<reference path="../react/react.d.ts"/>

declare module "react/addons" {
  function jsx(jsx?: string): React.ReactElement<any>;
}

declare module "react/lib/cx" {
  function cs(json:any): string;
  export = cs;
}
