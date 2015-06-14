///<reference path='../../typings/react/react.d.ts'/>

import {
  ReactElement
} from 'react';

interface MapStringTo<T> {
  [key:string]: T
}

interface ComponentTreeNode
{
  style: any;
  component: ReactElement<any>
}

interface ComponentTree extends ComponentTreeNode
{
  children?: ComponentTree[];
}

function ReactJSON( tree: ComponentTree ) : ReactElement<any>
{
  
  return null;
}

export = ReactJSON;
