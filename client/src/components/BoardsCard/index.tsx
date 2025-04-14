import { memo } from 'react';
import './style.css';
import IssuesItem from '../IssuesItem';
import { Issue } from '../../types';

interface BoardsCardProps {
  projectName: string;
  groupedTasks: {
    toDo: Issue[];
    inProgress: Issue[];
    done: Issue[];
  };
  handleClick: (item: Issue) => void;
}

const BoardsCard: React.FC<BoardsCardProps> = ({
  projectName,
  groupedTasks,
  handleClick,
}) => {
  const renderColumn = (title: string, tasks: Issue[]) => (
    <div className="BoardsCard-column">
      <h4>{title}</h4>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <IssuesItem
              key={task.id}
              item={task}
              onClick={() => handleClick(task)}
            />
          ))
        ) : (
          <li>Нет задач</li>
        )}
      </ul>
    </div>
  );

  return (
    <div className="BoardsCard">
      <h3 className="BoardsCard-title">{projectName}</h3>
      <div className="BoardsCard-table">
        {renderColumn('Backlog', groupedTasks.toDo)}
        {renderColumn('In Progress', groupedTasks.inProgress)}
        {renderColumn('Done', groupedTasks.done)}
      </div>
    </div>
  );
};

export default memo(BoardsCard);
