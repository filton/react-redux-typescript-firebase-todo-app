import { FC, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { deleteTodo } from '../../store/actions/todoActions';
import { Todo } from '../../store/types';

const TodoDetails: FC = () => {
  const { todos: allTodos } = useSelector((state: RootState) => state.todo);
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [todos] = useState<Todo[]>(allTodos);
  const selectedTodo = todos.find((t) => t.id === id);
  const [todo] = useState(selectedTodo);

  if (!todo) {
    return null;
  }

  const deleteTask = (id: string) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className='todo-page'>
      <div className='details-header'>
        <Link className='back-button' to={'/todos'}>
          Back to todo list
        </Link>
        <h1>Details</h1>
      </div>
      <div className='container'>
        <ul className='responsive-table'>
          <li className='table-header'>
            <div className='col col-1'>Status</div>
            <div className='col col-2'>Title</div>
            <div className='col col-3'>Description</div>
            <div className='col col-4'>Date of creation</div>
            <div className='col col-5'>Action</div>
          </li>

          <li className='table-row'>
            <div className='col col-1' data-label='Status'>
              {todo.completedStatus ? 'Completed' : 'Active'}
            </div>
            
            <div className='col col-2' data-label='Title'>
              {todo.title}
            </div>

            <div className='col col-3' data-label='Description'>
              {todo.description}
            </div>

            <div className='col col-4' data-label='Date of creation'>
              {todo.dateOfCreation.toLocaleString()}
            </div>
            
            <div className='col col-5' data-label='Action'>
              <Link
                className='details-delete-button'
                onClick={() => todo.id && deleteTask(todo.id)}
                to={'/todos'}
              >
                Delete
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TodoDetails;
