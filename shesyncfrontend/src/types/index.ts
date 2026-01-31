//user given back from the backend
 export type User ={
    _id:string;
    email:string;
    username: string;
 };

 //login api response
 export type Login ={
    token:string;
    user: User;
 };
 
//for login

type FormState = {
    email:string;
    password: string;
};