
declare module "object-assign" {
  function assign<T,U>(target:U, source:T, ...args: U[]): T;

  export = assign;
}
