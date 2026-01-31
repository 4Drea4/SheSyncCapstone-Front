import {useState} from 'react';
import type {LoginForm} from '../types';


    const [form,setForm] = useState<LoginForm>({
        email: "",
        password: "",
    });

    