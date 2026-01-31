import api from './api';

export type AuthResponse = {
    token:string,
    user:{
        _id:string;
        email: string;
        username:string;
    };
};
export async function login(email:string,password: string): Promise <AuthResponse> {
    const response = await api.post<AuthResponse>("/users/login", { email,password});
    return response.data;

}
export async function register(username:string, email:string,password: string)Promise<AuthResponse>{
    const response = await api.post<AuthResponse>('/users/register', {username, email, password});
    return response.data;
}
