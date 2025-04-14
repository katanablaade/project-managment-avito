import { memo } from 'react';
import './style.css';
import { Issue } from '../../types';
import IssuesItem from '../IssuesItem';

interface IssuesListProps {
  list: Issue[];
  handleClick: (item: Issue) => void;
}

const IssuesList: React.FC<IssuesListProps> = ({ list, handleClick }) => {
  return (
    <ul className="List">
      {list.map((item) => (
        <li key={item.id} className="List-item">
          <IssuesItem item={item} onClick={() => handleClick(item)} />
        </li>
      ))}
    </ul>
  );
};

export default memo(IssuesList);
