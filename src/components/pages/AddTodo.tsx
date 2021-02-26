import { FC, useState, FormEvent } from 'react';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { createTodo } from '../../store/actions/todoActions';
import { Todo } from '../../store/types';

const AddTodo: FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (!user || !title || !description) {
      return;
    }

    const data: Todo = {
      title,
      description,
      completedStatus: false,
      dateOfCreation: new Date().toLocaleString(),
      userId: user.id,
    };

    dispatch(createTodo(data));
    setTitle('');
    setDescription('');
  };

  return (
    <div className='addtodo'>
      <form onSubmit={submitHandler}>
        <input
          type='text'
          name='title'
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          placeholder='Title'
        />
        <input
          type='text'
          name='description'
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          placeholder='Description'
        />
        <button disabled={!title || !description}>Add Todo</button>
      </form>
    </div>
  );
};

export default AddTodo;
