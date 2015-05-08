interface MapStringTo<T>
{
  [key:string]: T;
}

interface TodoData
{
  id: string;
  complete: boolean;
  text: string;
}

interface TodoState
{
  allTodos: MapStringTo<TodoData>;
  areAllComplete: boolean;
}

interface TodoItemProps
{
  todo: TodoData;
}

interface TodoAction
{
  actionType: number;
  id?: string;
  text?: string;
}

interface TodoTextInputElement
{
  id: string;
}

declare module todomfc
{
  type TodoMap = MapStringTo<TodoData>;
}




