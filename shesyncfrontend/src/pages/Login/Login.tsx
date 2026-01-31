import {useState} from 'react';
import type {LoginForm} from '../../types';
import {useNavigate} from 'react-router-dom';
import './Login.css';

    const [form,setForm] = useState<LoginForm>({
        email: "",
        password: "",
    });

