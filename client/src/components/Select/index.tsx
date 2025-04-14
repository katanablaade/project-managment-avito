import { memo } from 'react';
import './style.css';

interface SelectProps {
  options?: Array<{
    value: string;
    title: string;
  }>;
  value?: string;
  onChange?: (value: string) => void;
  size?: 'small' | 'medium';
  text?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange = () => {},
  size,
  text,
}) => {
  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
  };

  return (
    <select
      className={`Select Select-${size ? `${size}` : ''}${text ? ' text' : ''}`}
      value={value}
      onChange={onSelect}
    >
      {options?.map((item) => (
        <option key={item.value} value={item.value}>
          {item.title}
        </option>
      ))}
    </select>
  );
};

export default memo(Select);
