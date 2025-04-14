import { memo, useMemo } from 'react';
import Menu from '../../components/Menu';
import SideLayout from '../../components/SideLayout';
import Button from '../../components/Button';
import { useAppDispatch } from '../../hooks/store';
import { openModal } from '../../store/slices/modal';

function Navigation() {
  const dispatch = useAppDispatch();

  const options = {
    menu: useMemo(
      () => [
        { key: 1, link: '/issues', title: 'Все задачи' },
        { key: 2, link: '/boards', title: 'Проекты' },
      ],
      []
    ),
  };

  return (
    <SideLayout side="between">
      <Menu items={options.menu} />
      <Button
        onClick={() => dispatch(openModal(null))}
        title="Создать задачу"
        style="primary"
      />
    </SideLayout>
  );
}

export default memo(Navigation);
