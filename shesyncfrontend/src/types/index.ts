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

//for registration to the site
export type RegisterForm = {
   username: string;
   email: string;
   password:string;
}

export type Project = {
   _id: string;
   name: string;
   description?: string;
   createdAt?: string;
   updatedAt? : string;
};

export type CreateProjectInput = {
   name: string;
   description?: string;
};

export type TaskStatus = "todo" |  'Working On It' | 'Woohoo Done did it!'; 

export type Task = {
   _id: string;
   title: string;
   description?:string;
   status: TaskStatus;
   project: string;
   createdAt?: string;
   updatedAt?:string;
}

export type CreateTaskInput = {
title: string;
description? :string;
status?: TaskStatus;
}