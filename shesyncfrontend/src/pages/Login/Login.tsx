import {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import './Login.css';
import type { LoginForm, LoginRes } from '../../types';
import { login } from '../../api/users';
import { AuthContext } from '../../context/AuthContext';

    const [form,setForm] = useState<LoginForm>({
        email: "",
        password: "",
    });

