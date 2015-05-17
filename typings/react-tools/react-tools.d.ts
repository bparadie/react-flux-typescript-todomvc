
declare module 'react-tools' {

  interface TransformOptions
  {
    harmony?: boolean;
  }

  function transform(jsx: string, options: TransformOptions): string;
}
