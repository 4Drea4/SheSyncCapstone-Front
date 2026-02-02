import api from './api';
import type { Project, CreateProjectInput } from '../types';

export async function getProjects(): Promise<Project[]> {
    const res = await api.get<Project[]>("/projects");
    return res.data;
}
export async function createProject(input: CreateProjectInput) : Promise<Project>{
    const res = await api.post<Project>("/projects", input);
    return res.data;
}