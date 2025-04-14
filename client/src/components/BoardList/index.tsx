import { memo } from 'react';
import './style.css';
import { Board } from '../../types';
import BoardsItem from '../BoardsItem';

interface BoardListProps {
  list: Board[];
  handleClick: (item: Board) => void;
}

const BoardList: React.FC<BoardListProps> = ({ list, handleClick }) => {
  return (
    <ul className="List">
      {list.map((item) => (
        <li key={item.id} className="List-item">
          <BoardsItem item={item} onClick={() => handleClick(item)} />
        </li>
      ))}
    </ul>
  );
};

export default memo(BoardList);
