import api from './api';
import type { Project, CreateProjectInput } from '../types';


//function to get an array of projects to return my promise 
export async function getProjects(): Promise<Project[]> {
    const res = await api.get<Project[]>("/projects");
    return res.data;
}
//send to backend
export async function createProject(input: CreateProjectInput) : Promise<Project>{
    const res = await api.post<Project>("/projects", input);
    return res.data;
}

//be able to delete the project
export async function deleteProject(projectId:string): Promise<void> {
    await api.delete(`/projects/${projectId}`);
}