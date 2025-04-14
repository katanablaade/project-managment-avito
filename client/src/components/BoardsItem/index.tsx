import { memo } from 'react';
import './style.css';
import Button from '../Button';
import { Board } from '../../types';

interface BoardsItemProps {
  item: Board;
  onClick: () => void;
}

const BoardsItem: React.FC<BoardsItemProps> = ({ item, onClick }) => {
  return (
    <div className="BoardsItem">
      <div className="BoardsItem-info">
        <div className="BoardsItem-title">{item.name}</div>
        <div className="BoardsItem-description">{item.description}</div>
        <div className="BoardsItem-taskCount">
          Задач: {item.taskCount || 'Нет задач'}
        </div>
      </div>

      <div className="BoardsItem-actions">
        <Button onClick={onClick} style="primary" title="Перейти к доске" />
      </div>
    </div>
  );
};

export default memo(BoardsItem);
