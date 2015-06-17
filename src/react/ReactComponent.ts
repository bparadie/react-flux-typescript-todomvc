/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * Typescript port by Bernd Paradies, May 2015
 */

///<reference path='../../typings/react/react.d.ts'/>
///<reference path='../../typings/react/react-addons.d.ts'/>

import React = require('react/addons');

class ReactComponent<P,S> extends React.Component<P,S> {
  
  public getDerivedInitialState(): S {
    return null;
  }

  public getInitialState = (): S => {
    return this.getDerivedInitialState();
  };

  /**
   * @see React.createClass
   */
  constructor(props:P, context:any) {
    
    super(props, context);

    this.props = props;
    this.context = context;
    this.state = this.getInitialState();

    // Nasty trick to avoid warnings.
    this.getInitialState = null;
  }
}

export = ReactComponent;
