import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  isOpen: boolean;
  taskId: number | null;
  isLockedProjectField: boolean;
  isFromIssuesContainer: boolean;
}

const initialState: ModalState = {
  isOpen: false,
  taskId: null,
  isLockedProjectField: false,
  isFromIssuesContainer: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.taskId = action.payload?.taskId || null;
      state.isLockedProjectField =
        action.payload?.isLockedProjectField || false;
      state.isFromIssuesContainer =
        action.payload?.isFromIssuesContainer || false;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.taskId = null;
      state.isLockedProjectField = false;
      state.isFromIssuesContainer = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
