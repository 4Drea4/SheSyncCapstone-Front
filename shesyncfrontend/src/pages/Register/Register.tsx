import {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import './Register.css';
import type { RegisterForm } from '../../types';
import sheSyncLogo from '/public/logo.png';

export default function Register(){
    const navigate = useNavigate();

    const [form, setForm] = useState<RegisterForm>({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
}