import { memo, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { getAsyncTasks, selectFilteredIssues } from '../../store/slices/issues';
import IssuesList from '../../components/IssuesList';
import Button from '../../components/Button';
import { openModal } from '../../store/slices/modal';
import { Issue } from '../../types';
import SideLayout from '../../components/SideLayout';

function IssuesContainer() {
  const dispatch = useAppDispatch();
  const issues = useAppSelector(selectFilteredIssues);
  const status = useAppSelector((state) => state.issues.status);

  useEffect(() => {
    dispatch(getAsyncTasks());
  }, [dispatch]);

  const handleClick = (item: Issue) => {
    dispatch(
      openModal({
        taskId: item.id,
        isLockedProjectField: false,
        isFromIssuesContainer: true,
      })
    );
  };

  if (status === 'failed') {
    return <div>Ошибка загрузки данных</div>;
  }

  return (
    <>
      {status === 'loading' ? (
        <Spinner />
      ) : (
        <>
          <IssuesList list={issues} handleClick={handleClick} />
          <SideLayout side="end">
            <Button
              style="primary"
              onClick={() => dispatch(openModal(null))}
              title="Создать задачу"
            />
          </SideLayout>
        </>
      )}
    </>
  );
}

export default memo(IssuesContainer);
