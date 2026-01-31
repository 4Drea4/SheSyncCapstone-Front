import {useContext, useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import './Login.css';
import type { LoginForm, LoginRes } from '../../types';
import { AuthContext } from '../../context/AuthContext';
import { login } from '../../api/users';


export default function Login () {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

}

    const [form,setForm] = useState<LoginForm>({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");
    
