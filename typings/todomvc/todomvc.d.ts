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
 
interface MapStringTo<T> {
  [key:string]: T;
}

interface TodoData {
  id: string;
  complete: boolean;
  text: string;
}

interface TodoState {
  allTodos: MapStringTo<TodoData>;
  areAllComplete: boolean;
}

interface TodoItemProps {
  todo: TodoData;
}

interface TodoAction {
  actionType: number;
  id?: string;
  text?: string;
}

interface TodoTextInputElement {
  id: string;
}

declare module todomvc {
  type TodoMap = MapStringTo<TodoData>;
}
