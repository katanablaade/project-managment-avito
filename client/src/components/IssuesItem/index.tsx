import { memo } from 'react';
import { Issue } from '../../types';
import './style.css';

interface IssuesItemProps {
  item: Issue;
  onClick: () => void;
}

const IssuesItem: React.FC<IssuesItemProps> = ({ item, onClick }) => {
  return (
    <div className="IssuesItem" onClick={onClick}>
      <div className="IssuesItem-title">{item.title}</div>
      <div className="IssuesItem-description">{item.description}</div>
      <div
        className={`IssuesItem-priority priority-${item.priority.toLowerCase()}`}
      >
        Приоритет: {item.priority}
      </div>
      <div className={`IssuesItem-status status-${item.status.toLowerCase()}`}>
        Статус: {item.status}
      </div>
      <div className="IssuesItem-assignee">
        <span>{item.assignee.fullName}</span>
      </div>
    </div>
  );
};

export default memo(IssuesItem);
