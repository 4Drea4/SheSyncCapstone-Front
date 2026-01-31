import api from './api';

type Login = {
    token: string;
    user:{
        _id:string;
        email:string;
        username:string;
    };
};

export async function user{
    email: string;
    password:string
};