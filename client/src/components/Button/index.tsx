import { memo } from 'react';
import './style.css';

interface ButtonProps {
  onClick?: () => void;
  title: string;
  style?: string;
  type?: 'button' | 'submit';
}

function Button({ onClick, title, style = '', type = 'button' }: ButtonProps) {
  return (
    <div className="Button">
      <button type={type} className={`Button-${style}`} onClick={onClick}>
        {title}
      </button>
    </div>
  );
}

export default memo(Button);
