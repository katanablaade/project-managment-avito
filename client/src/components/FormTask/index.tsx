import { memo } from 'react';
import './style.css';
import { FormTaskData, Issue } from '../../types';
import { useNavigate } from 'react-router-dom';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import Button from '../Button';
import FormField from '../FormField';

interface Option {
  value: string;
  title: string;
}

interface FormTaskProps {
  register: UseFormRegister<FormTaskData>;
  handleSubmit: (event?: React.BaseSyntheticEvent) => void;
  errors: FieldErrors<FormTaskData>;
  editingTask: Issue | null;
  boardOptions: { id: number; title: string }[];
  statusOptions: Option[];
  priorityOptions: Option[];
  assigneeOptions: { id: number; title: string }[];
  isLockedProjectField: boolean;
  isFromIssuesContainer: boolean;
  onClose: () => void;
}

const FormTask = ({
  register,
  handleSubmit,
  errors,
  boardOptions,
  statusOptions,
  priorityOptions,
  assigneeOptions,
  editingTask,
  isLockedProjectField,
  isFromIssuesContainer,
  onClose,
}: FormTaskProps) => {
  const navigate = useNavigate();

  return (
    <form className="FormTask" onSubmit={handleSubmit}>
      <FormField
        type="text"
        label="Название"
        name="title"
        register={register}
        error={errors.title}
        rules={{
          required: 'Поле обязательно для заполнения',
          minLength: { value: 3, message: 'Минимум 3 символа' },
        }}
      />
      <FormField
        type="textarea"
        label="Описание"
        name="description"
        register={register}
        error={errors.description}
        rules={{
          required: 'Поле обязательно для заполнения',
          minLength: { value: 5, message: 'Минимум 5 символов' },
        }}
      />

      <FormField
        type="select"
        label="Проект"
        name="boardName"
        register={register}
        options={boardOptions}
        error={errors.boardName}
        disabled={isLockedProjectField}
      />

      <FormField
        type="select"
        label="Приоритет"
        name="priority"
        register={register}
        options={priorityOptions}
        error={errors.priority}
        rules={{ required: 'Поле обязательно для заполнения' }}
      />

      <FormField
        type="select"
        label="Статус"
        name="status"
        register={register}
        options={statusOptions}
        error={errors.status}
        rules={{ required: 'Поле обязательно для заполнения' }}
      />
      <FormField
        type="select"
        label="Исполнитель"
        name="assigneeId"
        register={register}
        options={assigneeOptions}
        error={errors.assigneeId}
        rules={{ required: 'Поле обязательно для заполнения' }}
      />

      <div className="FormTask-action">
        {isFromIssuesContainer && (
          <Button
            style="primary"
            type="button"
            onClick={() => {
              navigate(`/board/${editingTask?.boardId}`);
              onClose();
            }}
            title="Перейти на доску"
          />
        )}

        <Button
          style="primary"
          type="submit"
          title={editingTask ? 'Обновить' : 'Создать'}
        />
      </div>
    </form>
  );
};

export default memo(FormTask);
