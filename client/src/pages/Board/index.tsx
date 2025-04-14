import { memo, useEffect } from 'react';
import PageLayout from '../../components/PageLayout';
import Navigation from '../../containers/navigation';
import BoardsCard from '../../components/BoardsCard';
import Spinner from '../../components/Spinner';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import {
  getAsyncBoardTasks,
  selectBoardName,
  selectGroupedTasks,
} from '../../store/slices/boards';
import { openModal } from '../../store/slices/modal';
import { Issue } from '../../types';

function Board() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const groupedTasks = useAppSelector(selectGroupedTasks);
  const boardName = useAppSelector(selectBoardName);
  const status = useAppSelector((state) => state.boards.status);

  useEffect(() => {
    if (id) {
      dispatch(getAsyncBoardTasks(Number(id)));
    }
  }, [id, dispatch]);

  const handleClick = (item: Issue) => {
    dispatch(
      openModal({
        taskId: item.id,
        isLockedProjectField: true,
        isFromIssuesContainer: false,
      })
    );
  };

  if (status === 'failed') {
    return <div>Ошибка загрузки данных</div>;
  }

  return (
    <PageLayout>
      <Navigation />
      {status === 'loading' ? (
        <Spinner />
      ) : (
        <BoardsCard
          projectName={boardName}
          groupedTasks={groupedTasks}
          handleClick={handleClick}
        />
      )}
    </PageLayout>
  );
}

export default memo(Board);
