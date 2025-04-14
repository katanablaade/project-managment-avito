export interface Board {
  id: number;
  name: string;
  description: string;
  taskCount: number;
}

export interface Issue {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  assigneeId?: number;
  assignee: Assignee;
  boardId?: number;
  boardName: string;
}

export interface Assignee {
  id: number;
  fullName: string;
  email: string;
  avatarUrl: string;
}

export interface FormTaskData {
  title: string;
  description: string;
  boardId?: number;
  priority: string;
  status?: string;
  assigneeId?: number | string;
  boardName?: string | number;
}
