import { memo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import Input from '../../components/Input';
import Select from '../../components/Select';
import SideLayout from '../../components/SideLayout';
import Button from '../../components/Button';
import {
  setTitleQuery,
  setAssigneeQuery,
  setStatusFilter,
  setBoardFilter,
  selectUniqueStatuses,
  selectUniqueBoards,
  clearFilters,
} from '../../store/slices/issues';

function IssuesFilterContainer() {
  const dispatch = useAppDispatch();

  const statusOptions = useAppSelector(selectUniqueStatuses);
  const boardOptions = useAppSelector(selectUniqueBoards);
  const filters = useAppSelector((state) => state.issues);

  const [titleQuery, setTitle] = useState(filters.titleQuery);
  const [assigneeQuery, setAssignee] = useState(filters.assigneeQuery);
  const [statusValue, setStatus] = useState(filters.statusFilter);
  const [boardValue, setBoard] = useState(filters.boardFilter);

  const handleTitleSearch = (value: string) => {
    setTitle(value);
    dispatch(setTitleQuery(value));
  };

  const handleAssigneeSearch = (value: string) => {
    setAssignee(value);
    dispatch(setAssigneeQuery(value));
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    dispatch(setStatusFilter(value));
  };

  const handleBoardChange = (value: string) => {
    setBoard(value);
    dispatch(setBoardFilter(value));
  };

  const handleReset = () => {
    dispatch(clearFilters());
    setTitle('');
    setAssignee('');
    setStatus('');
    setBoard('');
  };

  return (
    <SideLayout padding="medium">
      <Input
        placeholder="По названию"
        value={titleQuery}
        onChange={handleTitleSearch}
        delay={500}
        theme="big"
      />
      <Input
        placeholder="По имени"
        value={assigneeQuery}
        onChange={handleAssigneeSearch}
        delay={500}
        theme="big"
      />
      <Select
        options={[{ value: '', title: 'Все статусы' }, ...statusOptions]}
        value={statusValue}
        onChange={handleStatusChange}
        size="medium"
      />
      <Select
        options={[{ value: '', title: 'Все проекты' }, ...boardOptions]}
        value={boardValue}
        onChange={handleBoardChange}
        size="medium"
      />
      <Button onClick={handleReset} title="Сбросить" style="primary" />
    </SideLayout>
  );
}

export default memo(IssuesFilterContainer);
