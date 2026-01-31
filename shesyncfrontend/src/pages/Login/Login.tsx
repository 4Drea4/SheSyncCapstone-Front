import {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import './Login.css';
import type { LoginForm, LoginRes } from '../../types';
import { login } from '../../api/users';
import { AuthProvider } from '../../context/AuthContext';

export default function Login () {
    const navigate = useNavigate();
    const { login } = AuthProvider();

}

    const [form,setForm] = useState<LoginForm>({
        email: "",
        password: "",
    });

