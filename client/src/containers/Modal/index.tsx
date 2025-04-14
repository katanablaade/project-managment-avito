import { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import ModalLayout from '../../components/ModalLayout';
import FormTask from '../../components/FormTask';
import Spinner from '../../components/Spinner';
import {
  selectCurrentTask,
  clearCurrentTask,
  selectUniqueStatuses,
  selectUniquePriorities,
  selectUniqueAssignees,
  getAsyncTask,
} from '../../store/slices/issues';
import { createAsyncTask, updateAsyncTask } from '../../store/slices/issues';
import { selectUniqueBoards } from '../../store/slices/boards';
import { FormTaskData } from '../../types';
import { closeModal } from '../../store/slices/modal';

function Modal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.modal.isOpen);
  const taskId = useAppSelector((state) => state.modal.taskId);
  const currentTask = useAppSelector(selectCurrentTask);
  const statusOptions = useAppSelector(selectUniqueStatuses);
  const boardOptions = useAppSelector(selectUniqueBoards);
  const priorityOptions = useAppSelector(selectUniquePriorities);
  const assigneeOptions = useAppSelector(selectUniqueAssignees);
  const isLockedProjectField = useAppSelector(
    (state) => state.modal.isLockedProjectField
  );
  const isFromIssuesContainer = useAppSelector(
    (state) => state.modal.isFromIssuesContainer
  );
  const status = useAppSelector((state) => state.issues.status); // Получаем статус загрузки

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormTaskData>({
    defaultValues: {
      title: currentTask?.title || '',
      description: currentTask?.description || '',
      priority: currentTask?.priority || '',
      status: currentTask?.status || '',
      assigneeId: currentTask?.assignee?.id || '',
      boardName: currentTask?.boardId || '',
    },
  });

  useEffect(() => {
    if (taskId) {
      dispatch(getAsyncTask(taskId));
    }
  }, [taskId]);

  useEffect(() => {
    if (currentTask) {
      reset({
        title: currentTask.title,
        description: currentTask.description,
        priority: currentTask.priority,
        status: currentTask.status,
        assigneeId: currentTask.assignee?.id || '',
        boardName: currentTask.boardId,
      });
    } else {
      reset({});
    }
  }, [currentTask, reset]);

  const onSubmit = (data: FormTaskData) => {
    if (currentTask) {
      const updatedData = {
        assigneeId: Number(data.assigneeId),
        description: data.description,
        priority: data.priority,
        status: data.status,
        title: data.title,
      };

      dispatch(updateAsyncTask({ taskId: currentTask.id, data: updatedData }))
        .unwrap()
        .then(() => {
          dispatch(clearCurrentTask());
          reset({});
          dispatch(closeModal());
        })
        .catch((error) => {
          console.error('Ошибка при обновлении задачи:', error);
        });
    } else {
      const newData = {
        assigneeId: Number(data.assigneeId),
        boardId: Number(data.boardName),
        description: data.description,
        priority: data.priority,
        title: data.title,
      };

      dispatch(createAsyncTask(newData))
        .unwrap()
        .then(() => {
          dispatch(clearCurrentTask());
          reset({});
          dispatch(closeModal());
        })
        .catch((error) => {
          console.error('Ошибка при создании задачи:', error);
        });
    }
  };

  const onClose = () => {
    dispatch(clearCurrentTask());
    dispatch(closeModal());
    reset({});
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalLayout
      title={currentTask ? 'Редактирование задачи' : 'Создание задачи'}
      onClose={onClose}
    >
      {status === 'loading' ? (
        <Spinner />
      ) : (
        <FormTask
          register={register}
          handleSubmit={handleSubmit(onSubmit)}
          editingTask={currentTask}
          statusOptions={statusOptions}
          boardOptions={boardOptions}
          priorityOptions={priorityOptions}
          assigneeOptions={assigneeOptions}
          isLockedProjectField={isLockedProjectField}
          isFromIssuesContainer={isFromIssuesContainer}
          onClose={onClose}
          errors={errors}
        />
      )}
    </ModalLayout>
  );
}

export default memo(Modal);
