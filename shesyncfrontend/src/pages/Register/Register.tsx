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
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setForm((prev) => ({...prev, [name]: value}));
    };
    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        if(!form.username || !form.email || !form.password) {
            setError("Uh oh you have to fill out each input field love!");
            return;
        }
        try {
            await userRegister(form.username, form.email, form.password);
            navigate("/login");
        } catch (err:any) {
            setError(err?.response?.data?.message || "Sorry looks like your registration failed, try again");
        }
};

    return (
        
    )