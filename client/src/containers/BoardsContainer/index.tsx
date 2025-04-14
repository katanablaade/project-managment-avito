import { memo, useEffect } from 'react';
import List from '../../components/BoardList';
import Spinner from '../../components/Spinner';

import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { useNavigate } from 'react-router-dom';
import { Board } from '../../types';
import {
  getAsyncBoards,
  getAsyncBoardTasks,
  saveBoardName,
  selectBoards,
} from '../../store/slices/boards';

function BoardsContainer() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const boards = useAppSelector(selectBoards);
  const status = useAppSelector((state) => state.boards.status);

  useEffect(() => {
    dispatch(getAsyncBoards());
  }, [dispatch]);

  const handleClick = (item: Board) => {
    dispatch(getAsyncBoardTasks(item.id));
    dispatch(saveBoardName(item.name));
    navigate(`/board/${item.id}`);
  };

  if (status === 'failed') {
    return <div>Ошибка загрузки данных</div>;
  }

  return (
    <>
      {status === 'loading' ? (
        <Spinner />
      ) : (
        <List list={boards} handleClick={handleClick} />
      )}
    </>
  );
}

export default memo(BoardsContainer);
