import {useState, useContext} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import './Register.css';
import type { RegisterForm } from '../../types';
import sheSyncLogo from '/logo.png';
import { userRegister, userLogin } from '../../api/users';
import { AuthContext } from '../../context/AuthContext';

export default function Register(){
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

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
            //register 
            await userRegister(form.username, form.email, form.password);
            
            //login rightaway
            const data = await userLogin(form.email , form.password);

            // go to the dashbaord
            auth?.login(data.user, data.token);
            navigate("/dashboard");
            
        } catch (err:any) {
            setError(err?.response?.data?.message || "Sorry looks like your registration failed, try again");
        }
};

    return (
        <div className='splitRegisterPage'>
            {/* left siiddde */}
            <section className='registerLeft'>
                <div className='registerLeftText'>
                    <h1 className='welcomeText'>Let's get you in <br/>
                    <span className="logo">
                            <img src={sheSyncLogo} alt ="She Sync Logo"/>
                        </span>
                       for real!
                        </h1>

                        <p className='motivationText'>Create your account and start organizing life like you do your seasoning drawer </p>
                  
                </div>
            </section>

            {/* rightttt  */}
            <section className='registerRight'>
                <div className='registerSection'>
                    <h2 className='registerTitle'>Create your Account</h2>
                     {error ? <p className='registerError'>{error}</p> : null}

                     <form className='registerForm' onSubmit={handleSubmit}>
                        <div className='formField'>
                            <label className='formLabel' htmlFor="username">
                                Username
                            </label>
                            {error && <p className="loginError">{error}</p>}

                            <input 
                            className='input'
                            id="username"
                            name="username"
                            type="text"
                            value={form.username}
                            onChange={handleChange}
                            autoComplete='username'
                            />

                            <div className='formField'>
                                <label className='formLabel' htmlFor='email'>Email</label>

                                <input
                                className="input"
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                autoComplete='email'
                                />
                            </div>

                        <div className='formField'>
                            <label className='formLabel' htmlFor="password">
                                Enter a Super Secret Password
                            </label>
                            <input 
                            className='input'
                                id='password'
                                name='password'
                                type='password'
                                value={form.password}
                                onChange={handleChange}
                                />
                        </div>
                        <button className="registerButton" type="submit">
                            Join the cult of the organized
                        </button>
                        <p className="registerLoginDisclaimer">
                            If you already are one of us.. <Link to='/login'>Log in</Link>
                        </p>
                        </div>
                     </form>
                </div>
            </section>
        </div>
    );
}