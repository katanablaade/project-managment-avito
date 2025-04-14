import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { RootState } from '../..';
import { createTask, getTask, getTasks, updateTask } from '../../../service';
import { FormTaskData, Issue } from '../../../types';
import { getAsyncBoardTasks } from '../boards';

export const getAsyncTasks = createAsyncThunk<Issue[]>(
  'issues/getAsyncTasks',
  async () => {
    try {
      const response = await getTasks();
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const getAsyncTask = createAsyncThunk<Issue, number>(
  'issues/getAsyncTask',
  async (taskId: number) => {
    try {
      const response = await getTask(taskId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const updateAsyncTask = createAsyncThunk<
  Issue,
  { taskId: number; data: FormTaskData },
  { dispatch: any; state: RootState }
>(
  'issues/updateAsyncTask',
  async ({ taskId, data }, { dispatch, getState }) => {
    try {
      await updateTask(taskId, data);
      const updatedTaskResponse = await getTask(taskId);

      const state = getState();
      const boardId =
        state.issues.boardOptions.find(
          (option: { id: number; title: string }) =>
            option.title === updatedTaskResponse.boardName
        )?.id || null;

      if (boardId) {
        dispatch(getAsyncBoardTasks(boardId));
      }

      return updatedTaskResponse;
    } catch (error) {
      throw error;
    }
  }
);

export const createAsyncTask = createAsyncThunk<
  Issue,
  FormTaskData,
  { dispatch: any; state: RootState }
>(
  'issues/createAsyncTask',
  async (data: FormTaskData, { dispatch, getState }) => {
    try {
      const response = await createTask(data);
      const newTaskId = response.id;
      const fullTaskResponse = await getTask(newTaskId);
      const state = getState();
      const boardId =
        state.issues.boardOptions.find(
          (option: { id: number; title: string }) =>
            option.title === fullTaskResponse.boardName
        )?.id || null;

      if (boardId) {
        dispatch(getAsyncBoardTasks(boardId));
      }

      return fullTaskResponse;
    } catch (error) {
      throw error;
    }
  }
);

interface IssuesState {
  issues: Issue[];
  currentTask: Issue | null;
  boardOptions: { id: number; title: string }[];
  titleQuery: string;
  assigneeQuery: string;
  statusFilter: string;
  boardFilter: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: IssuesState = {
  issues: [],
  currentTask: null,
  boardOptions: [],
  titleQuery: '',
  assigneeQuery: '',
  statusFilter: '',
  boardFilter: '',
  status: 'idle',
  error: null,
};

export const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    setTitleQuery: (state, action) => {
      state.titleQuery = action.payload;
    },
    setAssigneeQuery: (state, action) => {
      state.assigneeQuery = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
    setBoardFilter: (state, action) => {
      state.boardFilter = action.payload;
    },
    clearFilters: (state) => {
      state.titleQuery = '';
      state.assigneeQuery = '';
      state.statusFilter = '';
      state.boardFilter = '';
    },
    clearCurrentTask: (state) => {
      state.currentTask = null;
    },
    setBoards: (state, action) => {
      state.boardOptions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Загрузка всех задач
      .addCase(getAsyncTasks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAsyncTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.issues = action.payload;
      })
      .addCase(getAsyncTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Неизвестная ошибка';
      })

      // Загрузка одной задачи по ID
      .addCase(getAsyncTask.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAsyncTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const boardId =
          state.boardOptions.find((item: { id: number; title: string }) => {
            return item.title === action.payload.boardName;
          })?.id || -1;

        state.currentTask = { ...action.payload, boardId };
      })
      .addCase(getAsyncTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Неизвестная ошибка';
      })

      // Обновление задачи
      .addCase(updateAsyncTask.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateAsyncTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedTask = action.payload;
        const index = state.issues.findIndex(
          (issue) => issue.id === updatedTask.id
        );

        if (index !== -1) {
          state.issues[index] = updatedTask;
        }
        if (state.currentTask && state.currentTask.id === updatedTask.id) {
          state.currentTask = updatedTask;
        }
      })
      .addCase(updateAsyncTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Неизвестная ошибка';
      })

      // Создание задачи
      .addCase(createAsyncTask.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createAsyncTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const newTask = action.payload;
        state.issues.push(newTask);

        if (!state.currentTask) {
          state.currentTask = newTask;
        }
      })
      .addCase(createAsyncTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Неизвестная ошибка';
      });
  },
});

// Селекторы

const selectIssues = (state: RootState) => state.issues.issues;

export const selectCurrentTask = (state: RootState) => state.issues.currentTask;

const selectUniqueValues = (
  fieldExtractor: (issue: Issue) => string | undefined
) =>
  createSelector([selectIssues], (issues) => {
    const values = issues
      .map(fieldExtractor)
      .filter((value): value is string => Boolean(value));
    const uniqueValues = [...new Set(values)];
    return uniqueValues.map((value) => ({
      value,
      title: value,
    }));
  });

export const selectUniqueStatuses = selectUniqueValues((issue) => issue.status);
export const selectUniqueBoards = selectUniqueValues(
  (issue) => issue.boardName
);

export const selectUniquePriorities = selectUniqueValues(
  (issue) => issue.priority
);

export const selectUniqueAssignees = createSelector(
  [selectIssues],
  (issues) => {
    const assigneesMap = new Map<number, { id: number; title: string }>();
    issues.forEach((issue) => {
      const assignee = issue.assignee;
      if (assignee && !assigneesMap.has(assignee.id)) {
        assigneesMap.set(assignee.id, {
          id: assignee.id,
          title: assignee.fullName,
        });
      }
    });

    return Array.from(assigneesMap.values());
  }
);

export const selectFilteredIssues = createSelector(
  [
    selectIssues,
    (state: RootState) => state.issues.titleQuery,
    (state: RootState) => state.issues.assigneeQuery,
    (state: RootState) => state.issues.statusFilter,
    (state: RootState) => state.issues.boardFilter,
  ],
  (issues, titleQuery, assigneeQuery, statusFilter, boardFilter) => {
    return issues.filter((issue) => {
      const matchesTitle =
        !titleQuery ||
        issue.title.toLowerCase().includes(titleQuery.toLowerCase());
      const matchesAssignee =
        !assigneeQuery ||
        issue.assignee?.fullName
          ?.toLowerCase()
          .includes(assigneeQuery.toLowerCase());
      const matchesStatus = !statusFilter || issue.status === statusFilter;
      const matchesBoard = !boardFilter || issue.boardName === boardFilter;

      return matchesTitle && matchesAssignee && matchesStatus && matchesBoard;
    });
  }
);

export const {
  setTitleQuery,
  setAssigneeQuery,
  setStatusFilter,
  setBoardFilter,
  clearFilters,
  clearCurrentTask,
  setBoards,
} = issuesSlice.actions;

export default issuesSlice.reducer;
