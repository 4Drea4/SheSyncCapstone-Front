//user given back from the backend
 export type User ={
    _id:string;
    email:string;
    username: string;
 };

 //login api response
 export type LoginRes ={
    token:string;
    user: User;
 };

//for login
export type LoginForm = {
    email:string;
    password: string;
};