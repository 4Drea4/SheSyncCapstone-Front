import api from './api';
import type {Task, CreateTaskInput} from '../types';

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
