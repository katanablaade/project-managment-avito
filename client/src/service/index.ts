import axios, { AxiosResponse } from 'axios';
import { FormTaskData, Board, Issue } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 10000,
});

export const getBoards = async (): Promise<Board[]> => {
  try {
    const response: AxiosResponse<{ data: Board[] }> = await api.get(
      'api/v1/boards'
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getBordTasks = async (boardId: number): Promise<Issue[]> => {
  try {
    const response: AxiosResponse<{ data: Issue[] }> = await api.get(
      `api/v1/boards/${boardId}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTasks = async (): Promise<Issue[]> => {
  try {
    const response: AxiosResponse<{ data: Issue[] }> = await api.get(
      'api/v1/tasks'
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTask = async (taskId: number): Promise<Issue> => {
  try {
    const response: AxiosResponse<{ data: Issue }> = await api.get(
      `api/v1/tasks/${taskId}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateTask = async (
  taskId: number,
  data: FormTaskData
): Promise<Issue> => {
  try {
    const response: AxiosResponse<{ data: Issue }> = await api.put(
      `api/v1/tasks/update/${taskId}`,
      data
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createTask = async (data: FormTaskData): Promise<Issue> => {
  try {
    const response: AxiosResponse<{ data: Issue }> = await api.post(
      'api/v1/tasks/create',
      data
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
