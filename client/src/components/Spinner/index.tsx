import { memo } from 'react';
import './style.css';

const Spinner: React.FC = () => {
  return (
    <div className="spinner-wrapper">
      <div className="spinner-circle"></div>
    </div>
  );
};

export default memo(Spinner);
