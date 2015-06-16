///<reference path='../../typings/react/react.d.ts'/>
///<reference path='../../typings/react-jsx/react-jsx.d.ts'/>

import React = require('react');
/*
import {
  ReactElement,
  ReactType,
  ReactNode,
} from 'react';
*/

interface MapStringTo<T> 
{
  [key:string]: T;
}

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element 

var _htmlTags: string[] = [
  'a', // Inline Text Semantics
  'abbr', // Inline Text Semantics
  'address', // Content Sectioning
  'area', // Image & Multimedia
  'article', // Content Sectioning
  'audio', // Image & Multimedia
  'b', // Inline Text Semantics
  'base', // Document Metadata
  'bdi', // Inline Text Semantics
  'bdo', // Inline Text Semantics
  'body', // Content Sectioning
  'br', // Inline Text Semantics
  'button', // Forms
  'canvas', // Scripting
  'caption', // Table Content
  'cite', // Inline Text Semantics
  'code', // Inline Text Semantics
  'col', // Table Content
  'colgroup', // Table Content
  'content', // Web Components
  'd1', // Text Content
  'data', // Inline Text Semantics
  'datalist', // Forms
  'dd', // Text Content
  'decorator', // Web Components
  'del', // Edits
  'details', // Interactive Elements
  'dfn', // Inline Text Semantics
  'dialog', // Interactive Elements
  'div', // Text Content
  'dt', // Text Content
  'element', // Web Components
  'em', // Inline Text Semantics
  'embed', // Embedded Content
  'fieldset', // Forms
  'figcaption', // Text Content
  'figure', // Text Content
  'footer', // Content Sectioning
  'form', // Forms
  'h1', // Content Sectioning
  'h2', // Content Sectioning
  'h3', // Content Sectioning
  'h4', // Content Sectioning
  'h5', // Content Sectioning
  'h6', // Content Sectioning
  'head', // Document Metadata
  'header', // Content Sectioning
  'hgroup', // Content Sectioning
  'hr', // Text Content
  'html', // Basic Elements
  'i', // Inline Text Semantics
  'iframe', // Embedded Content
  'img', // Image & Multimedia
  'input', // Forms
  'ins', // Edits
  'kbd', // Inline Text Semantics
  'keygen', // Forms
  'label', // Forms
  'legend', // Forms
  'li', // Text Content
  'link', // Document Metadata
  'main', // Text Content
  'map', // Image & Multimedia
  'mark', // Inline Text Semantics
  'menu', // Interactive Elements
  'menuitem', // Interactive Elements
  'meta', // Document Metadata
  'meter', // Forms
  'nav', // Content Sectioning
  'noscript', // Embedded Content
  'object', // Embedded Content
  'ol', // Text Content
  'optgroup', // Forms
  'option', // Forms
  'output', // Forms
  'p', // Text Content
  'param', // Embedded Content
  'pre', // Text Content
  'progress', // Forms
  'q', // Inline Text Semantics
  'rp', // Inline Text Semantics
  'rt', // Inline Text Semantics
  'rtc', // Inline Text Semantics
  'ruby', // Inline Text Semantics
  's', // Inline Text Semantics
  'samp', // Inline Text Semantics
  'script', // Embedded Content
  'section', // Content Sectioning
  'select', // Forms
  'shadow', // Web Components
  'small', // Inline Text Semantics
  'source', // Embedded Content
  'span', // Inline Text Semantics
  'strong', // Inline Text Semantics
  'style', // Document Metadata
  'sub', // Inline Text Semantics
  'summary', // Interactive Elements
  'sup', // Inline Text Semantics
  'table', // Table Content
  'tbody', // Table Content
  'td', // Table Content
  'template', // Web Components
  'textarea', // Forms
  'tfoot', // Table Content
  'th', // Table Content
  'thead', // Table Content
  'time', // Inline Text Semantics
  'title', // Document Metadata
  'tr', // Table Content
  'track', // Image & Multimedia
  'u', // Inline Text Semantics
  'ul', // Text Content
  'var', // Inline Text Semantics
  'video', // Image & Multimedia
  'wbr' // Inline Text Semantics
];

// http://algorithms.openmymind.net/search/binarysearch.html
function binarySearch(values: string[], target: string, start: number, end: number): number 
{
  if (start > end) { return -1; } //does not exist

  var middle = Math.floor((start + end) / 2);
  var value = values[middle];

  if (value > target) { return binarySearch(values, target, start, middle-1); }
  if (value < target) { return binarySearch(values, target, middle+1, end); }
  return middle; //found!
}

function _isTag(tag: string): boolean 
{
  return binarySearch( _htmlTags, tag, 0, _htmlTags.length - 1) != -1;
}

function _isReactElement( child: any ): boolean
{
  return child._isReactElement;
}

var REACT_COMPONENT = 'component';
var REACT_TEXT_CONTENT = 'textContent';
var REACT_CHILDREN = 'children';
 

/*  
function _isReactChild( child: React.ReactChild ): boolean
{
  return typeof(child) == 'string' || _isReactElement(child);
}
          return (React.createElement("footer", 
          { id: "footer" }, 
          React.createElement("span", 
            { id: "todo-count" },
            React.createElement("strong", null, itemsLeft), itemsLeftPhrase), 
            clearCompletedButton));
            
    var tree2 = {
      footer: {
        component: 'footer',
        id: 'footer',
        span: {
          component: 'span',
          id: 'todo-count',
          strong: {
            component: 'strong',
            textContent: itemsLeft,
          }
          textContent: itemsLeftPhrase
        },                
        'itemsLeft': itemsLeft,
	      'itemsLeftPhrase': itemsLeftPhrase,
	      'clearCompletedButton': clearCompletedButton
      }
    };


  */
  
export function _createElement( component: React.ReactChild, tree: any, key: string ) : React.ReactElement<any>
{
  var props: MapStringTo<any> = { 'key': key };
  var children: React.ReactChild[] = [];
  var val: any;

  if( _isReactElement(tree) )
  {
    return tree;
  }

  // allows {h1: "todo"} instead of {hr: {textContent: "todo"}}
  if( !tree || typeof(tree) == 'string' || typeof(tree) == 'number' || typeof(tree) == 'boolean' || Array.isArray(tree) )
  {
    return React.createElement( component, props, tree );  
  }

  var keys: string[] = Object.keys(tree);
  keys.forEach( (tag:string) => {
    val = tree[tag];   
    if( tag == REACT_COMPONENT )
    {
      if( !_isTag(tag) && typeof(val) == 'function')
      {
        component = val;
      } 
    }
    else
    {
      if( tag == REACT_TEXT_CONTENT || tag == REACT_CHILDREN )   
      {
        // see React.createElement("strong", null, itemsLeft)
        children.push(val);
      }
      else if( _isTag(tag) )
      {
        // if we recognize a tag we won't require 'component'
        children.push( _createElement( tag, val, val.key || children.length.toString() ) );
      }
      else if( typeof(val) == 'object' )
      {
        if( _isReactElement(val) )
        {
          children.push(val);
        }
        else if( val.hasOwnProperty( REACT_COMPONENT ) )
        {
          children.push( _createElement( val.component, val, val.key || children.length.toString() ) );
        }
        else
        {
          props[tag] = val;
        }
      }      
      else
      {
        props[tag] = val;
      }
    }
  });

  return React.createElement( component, props, children );
}

export function createElement( tree: any ) : React.ReactElement<any>
{
  var keys: string[] = Object.keys(tree);
  if( keys.length == 1 )
  {
    return _createElement(keys[0], tree[ keys[0] ], tree[keys[0]].key || keys[0]);
  }
  console.error('createElement: JSON must have one child.');
  return null;
}

