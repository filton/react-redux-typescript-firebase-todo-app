import firebase from '../../config/firebase';
import {
  TodoAction,
  Todo,
  ADD_TODO,
  FETCH_TODOS,
  DELETE_TODO,
  EDIT_TODO,
} from '../types';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';

// Create Todo
export const createTodo = (
  todo: Todo
): ThunkAction<void, RootState, null, TodoAction> => {
  return async (dispatch) => {
    try {
      const ref = await firebase.firestore().collection('todos').add(todo);
      todo.id = ref.id;
      dispatch({
        type: ADD_TODO,
        payload: todo,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

// Fetch todos
export const fetchTodos = (
  userId: string
): ThunkAction<void, RootState, null, TodoAction> => {
  return async (dispatch) => {
    try {
      const docs = await firebase
        .firestore()
        .collection('todos')
        .where('userId', '==', userId)
        .get();
      const arr: Todo[] = [];
      docs.forEach((doc) => {
        const {
          title,
          description,
          dateOfCreation,
          completedStatus,
          userId,
        } = doc.data();
        arr.push({
          title,
          description,
          dateOfCreation,
          completedStatus,
          id: doc.id,
          userId,
        });
      });
      dispatch({
        type: FETCH_TODOS,
        payload: arr,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

// Delete todo
export const deleteTodo = (
  id: string
): ThunkAction<void, RootState, null, TodoAction> => {
  return async (dispatch) => {
    try {
      await firebase.firestore().collection('todos').doc(id).delete();
      dispatch({
        type: DELETE_TODO,
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

// Edit Todo
export const editTodo = (
  todo: Todo,
  prop: string,
  value: any
): ThunkAction<void, RootState, null, TodoAction> => {
  return async (dispatch) => {
    try {
      await firebase
        .firestore()
        .collection('todos')
        .doc(todo.id)
        .update({
          [prop]: value,
        });

      todo = {
        ...todo,
        [prop]: value,
      };
      dispatch({
        type: EDIT_TODO,
        payload: todo,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
