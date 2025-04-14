import { memo, useCallback, useLayoutEffect, useState } from 'react';
import './style.css';

interface InputProps {
  type?: string;
  onChange: (value: string, name?: string) => void;
  theme?: string;
  delay?: number;
  value?: string;
  placeholder?: string;
  name?: string;
}

function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): T {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return ((...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  }) as T;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  onChange = () => {},
  theme = '',
  delay = 600,
  value: initialValue = '',
  placeholder = '',
  name,
}) => {
  const [value, setValue] = useState<string>(initialValue);

  const onChangeDebounce = useCallback(
    debounce((value: string) => onChange(value, name), delay),
    [onChange, name, delay]
  );

  const onChangeField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChangeDebounce(newValue);
  };

  useLayoutEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      className={`Input Input-${theme}`}
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={onChangeField}
    />
  );
};

export default memo(Input);
