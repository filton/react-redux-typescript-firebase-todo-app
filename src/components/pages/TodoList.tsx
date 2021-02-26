import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import {
  fetchTodos,
  deleteTodo,
  editTodo,
} from '../../store/actions/todoActions';
import { SET_FILTER, Todo } from '../../store/types';
import AddTodo from '../pages/AddTodo';
import { FaSearch } from 'react-icons/fa';

const TodoList: FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    todos: allTodos,
    activeTodos,
    completedTodos,
    appliedFilter,
  } = useSelector((state: RootState) => state.todo);
  const [todos, setTodos] = useState<Todo[]>(allTodos);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = user?.id;
    if (userId) {
      dispatch(fetchTodos(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFilteredTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTodos]);

  useEffect(() => {
    setFilteredTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedFilter]);

  useEffect(() => {
    setFilteredTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const filterTodos = (todosToFilter: Todo[]) => {
    if (searchTerm) {
      return todosToFilter.filter((todo: Todo) => {
        return (
          searchTerm &&
          todo.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    return todosToFilter;
  };

  const setFilteredTodos = () => {
    if (appliedFilter === 'all') {
      setTodos(filterTodos(allTodos));
    } else if (appliedFilter === 'active') {
      setTodos(filterTodos(activeTodos));
    } else if (appliedFilter === 'completed') {
      setTodos(filterTodos(completedTodos));
    } else {
      setTodos(filterTodos(allTodos));
    }
  };

  const deleteTask = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (todo: Todo, prop: string, value: any) => {
    dispatch(editTodo(todo, prop, value));
  };

  return (
    <div className='todo-page'>
      <h1>
        Welcome {user?.firstName} {user?.lastName}
      </h1>
      <div className='search'>
        <input
          type='text'
          className='search-term'
          placeholder='Search'
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <button className='search-button' disabled={!searchTerm}>
          <FaSearch />
        </button>
      </div>
      <AddTodo />
      <div className='task-nav'>
        <button
          onClick={() => dispatch({ type: SET_FILTER, payload: 'all' })}
          className={
            appliedFilter === 'all' || todos === allTodos
              ? 'task-nav-button-active'
              : 'task-nav-button'
          }
        >
          All Tasks
        </button>
        <button
          onClick={() => dispatch({ type: SET_FILTER, payload: 'active' })}
          className={
            appliedFilter === 'active'
              ? 'task-nav-button-active'
              : 'task-nav-button'
          }
        >
          Active Tasks
        </button>
        <button
          onClick={() => dispatch({ type: SET_FILTER, payload: 'completed' })}
          className={
            appliedFilter === 'completed'
              ? 'task-nav-button-active'
              : 'task-nav-button'
          }
        >
          Completed Tasks
        </button>
      </div>
      <ul className='responsive-table'>
        <li className='table-header'>
          <div className='col col-1'>Status</div>
          <div className='col col-2'>Title</div>
          <div className='col col-3'>Description</div>
          <div className='col col-4'>Date of creation</div>
          <div className='col col-5'>Action</div>
        </li>
      </ul>
      {todos && todos.length > 0 ? (
        todos.map((todo: Todo) => (
          <ul
            key={todo.id}
            className={
              !todo.completedStatus
                ? 'responsive-table'
                : 'responsive-table-checked'
            }
          >
            <li className='table-row'>
              <div className='col col-1' data-label='Status'>
                <input
                  type='checkbox'
                  defaultChecked={todo.completedStatus}
                  onChange={() =>
                    todo.id &&
                    handleEdit(todo, 'completedStatus', !todo.completedStatus)
                  }
                />
              </div>
              <div className='col col-2' data-label='Title'>
                <input
                  type='text'
                  value={todo.title}
                  onChange={(e) =>
                    todo.id &&
                    !todo.completedStatus &&
                    handleEdit(todo, 'title', e.target.value)
                  }
                />
              </div>
              <div className='col col-3' data-label='Description'>
                <input
                  type='text'
                  value={todo.description}
                  onChange={(e) =>
                    todo.id &&
                    !todo.completedStatus &&
                    handleEdit(todo, 'title', e.target.value)
                  }
                />
              </div>
              <div className='col col-4' data-label='Date of creation'>
                {todo.dateOfCreation.toLocaleString()}
              </div>
              <div className='col col-5' data-label='Action'>
                <Link to={`/todos/${todo.id}`} className='details-button'>
                  Details
                </Link>
                <button
                  className='delete-button'
                  onClick={() => todo.id && deleteTask(todo.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          </ul>
        ))
      ) : (
        <div>ToDo list is empty...</div>
      )}
    </div>
  );
};

export default TodoList;
