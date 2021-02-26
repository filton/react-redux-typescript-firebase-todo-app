import {
  Todo,
  TodoAction,
  TodoState,
  ADD_TODO,
  FETCH_TODOS,
  DELETE_TODO,
  EDIT_TODO,
  SET_FILTER,
} from '../types';

const initialState: TodoState = {
  todos: [],
  activeTodos: [],
  completedTodos: [],
  appliedFilter: '',
};

const setTodosState = (todos: Todo[]) => {
  return {
    todos,
    activeTodos: todos.filter((t) => !t.completedStatus),
    completedTodos: todos.filter((t) => !!t.completedStatus),
  };
};

const todoReducer = (state = initialState, action: TodoAction) => {
  switch (action.type) {
    case ADD_TODO:
      const updatedTodos = [action.payload, ...state.todos];
      return {
        ...state,
        ...setTodosState(updatedTodos),
      };
    case FETCH_TODOS:
      const fetchedTodos = action.payload;
      return {
        ...state,
        ...setTodosState(fetchedTodos),
      };
    case DELETE_TODO:
      return {
        ...state,
        ...setTodosState(
          [...state.todos].filter((todo) => todo.id !== action.payload)
        ),
      };
    case EDIT_TODO:
      const updatedTodo = action.payload;
      const todos = state.todos.map((t) => {
        if (t.id === updatedTodo.id) {
          t = updatedTodo;
        }
        return t;
      });

      return {
        ...state,
        ...setTodosState(todos),
      };
    case SET_FILTER:
      return {
        ...state,
        appliedFilter: action.payload,
      };
    default:
      return state;
  }
};

export default todoReducer;
