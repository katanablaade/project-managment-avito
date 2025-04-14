import { memo } from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import './style.css';

interface FormFieldProps {
  type: 'text' | 'textarea' | 'select';
  label: string;
  name: string;
  register: UseFormRegister<any>;
  options?:
    | { id: number; title: string }[]
    | { value: string; title: string }[];
  error?: FieldError;
  disabled?: boolean;
  rules?: Record<string, any>;
}

const FormField = ({
  type,
  label,
  name,
  register,
  options,
  error,
  disabled = false,
  rules,
}: FormFieldProps) => {
  return (
    <div className="FormTask-field">
      <label className="FormTask-label" htmlFor={name}>
        {label}
      </label>
      {type === 'select' ? (
        <select
          className={`FormTask-select ${error ? 'FormTask-input-error' : ''}`}
          {...register(name, rules)}
          disabled={disabled}
        >
          <option value="">Выберите значение</option>
          {options &&
            options.map((option: any) => (
              <option
                key={option.id || option.value}
                value={option.id || option.value}
              >
                {option.title}
              </option>
            ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          className={`FormTask-textarea ${error ? 'FormTask-input-error' : ''}`}
          {...register(name, rules)}
        />
      ) : (
        <input
          className={`FormTask-input ${error ? 'FormTask-input-error' : ''}`}
          type={type}
          {...register(name, rules)}
        />
      )}
      {error && <p className="FormTask-error">{error.message}</p>}
    </div>
  );
};

export default memo(FormField);
