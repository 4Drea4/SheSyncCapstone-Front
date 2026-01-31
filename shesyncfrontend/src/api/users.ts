import api from './api';

export type AuthResponse = {
    token:string,
    user:{
        _id:string;
        email: string;
        username:string;
    };
};
