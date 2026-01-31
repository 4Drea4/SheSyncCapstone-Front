import api from './api';

//shape of login
type Login = {
    token: string;
    user:{
        _id:string;
        email:string;
        username:string;
    };
};
// user function sends login info to my backend
export async function user(
    email: string,
    password: string
): Promise<Login> {
     const response = await api.post<Login>('users/login', {
        email,
        password,
     });

     return response.data;
}