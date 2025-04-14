import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { RootState } from '../..';
import { getBoards, getBordTasks } from '../../../service';
import { Board, Issue } from '../../../types';

export const getAsyncBoards = createAsyncThunk(
  'boards/getAsyncBoards',
  async () => {
    try {
      const response = await getBoards();
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const getAsyncBoardTasks = createAsyncThunk<Issue[], number>(
  'boards/getAsyncBoardTasks',
  async (boardId: number) => {
    try {
      const response = await getBordTasks(boardId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

interface BoardsState {
  boards: Board[];
  boardName: string;
  tasks: Issue[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BoardsState = {
  boards: [],
  boardName: '',
  tasks: [],
  status: 'idle',
  error: null,
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    saveBoardName: (state, action: PayloadAction<string>) => {
      state.boardName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // Загрузка досок
      .addCase(getAsyncBoards.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAsyncBoards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.boards = action.payload;
      })
      .addCase(getAsyncBoards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Неизвестная ошибка';
      })

      // Загрузка задач конкретной доски
      .addCase(getAsyncBoardTasks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAsyncBoardTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(getAsyncBoardTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Неизвестная ошибка';
      });
  },
});

export const selectBoards = (state: RootState) => state.boards.boards;
export const selectBoardName = (state: RootState) => state.boards.boardName;

const selectTasks = (state: RootState) => state.boards.tasks;

export const selectGroupedTasks = createSelector([selectTasks], (tasks) => ({
  toDo: tasks.filter((task) => task.status === 'Backlog'),
  inProgress: tasks.filter((task) => task.status === 'InProgress'),
  done: tasks.filter((task) => task.status === 'Done'),
}));

export const selectUniqueBoards = createSelector([selectBoards], (boards) => {
  const uniqueBoardsMap = new Map<number, { id: number; title: string }>();

  boards.forEach((board) => {
    if (!uniqueBoardsMap.has(board.id)) {
      uniqueBoardsMap.set(board.id, {
        id: board.id,
        title: board.name,
      });
    }
  });

  return Array.from(uniqueBoardsMap.values());
});

export const { saveBoardName } = boardsSlice.actions;

export default boardsSlice.reducer;
