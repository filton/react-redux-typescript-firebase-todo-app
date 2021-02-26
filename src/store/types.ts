// User Authentication
export const SET_USER = 'SET_USER';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_SUCCESS = 'SET_SUCCESS';
export const NEED_VERIFICATION = 'NEED_VERIFICATION';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  createdAt: any;
}

export interface AuthState {
  user: User | null;
  authenticated: boolean;
  loading: boolean;
  error: string;
  needVerification: boolean;
  success: string;
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

// User Authentication Actions
interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

interface SignOutAction {
  type: typeof SIGN_OUT;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

interface NeedVerificationAction {
  type: typeof NEED_VERIFICATION;
}

interface SetSuccessAction {
  type: typeof SET_SUCCESS;
  payload: string;
}

export type AuthAction =
  | SetUserAction
  | SetLoadingAction
  | SignOutAction
  | SetErrorAction
  | NeedVerificationAction
  | SetSuccessAction;

// Todos
export const ADD_TODO = 'ADD_TODO';
export const FETCH_TODOS = 'FETCH_TODOS';
export const DELETE_TODO = 'DELETE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const SET_FILTER = 'SET_FILTER';

export interface Todo {
  id?: string;
  title: string;
  description: string;
  dateOfCreation: any;
  completedStatus: boolean;
  userId: string;
}

export interface TodoState {
  todos: Todo[];
  activeTodos: Todo[];
  completedTodos: Todo[];
  appliedFilter: string;
}

// Todos Actions
interface AddTodoAction {
  type: typeof ADD_TODO;
  payload: Todo;
}

interface FetchTodoAction {
  type: typeof FETCH_TODOS;
  payload: Todo[];
}

interface DeleteTodoAction {
  type: typeof DELETE_TODO;
  payload: string;
}

interface EditTodoAction {
  type: typeof EDIT_TODO;
  payload: Todo;
}

interface SetFilterAction {
  type: typeof SET_FILTER;
  payload: string;
}

export type TodoAction =
  | FetchTodoAction
  | AddTodoAction
  | DeleteTodoAction
  | EditTodoAction
  | SetFilterAction;
