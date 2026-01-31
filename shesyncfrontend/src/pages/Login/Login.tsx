import {useState} from 'react';
import type {FormState} from '../../types';
import {useNavigate} from 'react-router-dom';
import './Login.css';

    const [form,setForm] = useState<FormState>({
        email: "",
        password: "",
    });

