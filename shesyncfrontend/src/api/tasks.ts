import api from './api';
import type {Task, CreateTaskInput, TaskStatus} from '../types';

//get my tasks
export async function getTasks(projectId: string): Promise<Task[]>
{
    const res = await api.get<Task[]>(`tasks/project/${projectId}`);
    return res.data;
}

//then create task in the project
export async function createTask(
    projectId: string,
    input: CreateTaskInput) : Promise<Task> {
        const res = await api.post<Task>(`/tasks/project/${projectId}`, input);

        return res.data;
    }
//update the task
export async function updateTask(
    taskId: string,
    updates: Partial<{title:string; description?: string; status: TaskStatus  }>

) : Promise<Task> {
    const res = await api.put<Task>(`/tasks/${taskId}`, updates);
    return res.data;
}

//delete the task
export async function deleteTask(taskId: string):Promise<void> {
    await api.delete(`/tasks/${taskId}`);
}

//delete task