import {useContext, useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import './Login.css';
import type { LoginForm } from '../../types';
import { AuthContext } from '../../context/AuthContext';
import { userLogin } from '../../api/users';
import sheSyncLogo from '../designassets/logo.png';

export default function Login () {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    if(!auth){
        return<p>We are still loading!  </p>
    }
        const {login} = auth;


    const [form, setForm] = useState<LoginForm>({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setForm((prev) => ({ ...prev, [name]: value}));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        //validate email and password
        if(!form.email || !form.password) {
            setError("Enter your email and password hon! ");
            return;
        }
        try{
            const data = await userLogin(form.email, form.password );

            //save the user and the token with context
            login(data.user, data.token);

            //go to dashboard after user logs in
            navigate('/projects');
        } catch (err:any) {
            setError(err?.response?.data.message || 'Your login has failed, Give it another go');
        }
    };

    return (
        <div className='splitLoginPage'>
           
            {/* left part */}
            <section className="loginLeft">
                <div className="loginLeftText">
                    <h1 className="loginWelcomeText">
                        So you want to <br/>
                        get in {" "}
                        <span className="logo">
                            <img src={sheSyncLogo} alt ="She Sync Logo"/>
                        </span>
                        <br/>
                        with your <em>tasks?</em>
                    </h1>
                </div>
            </section>

            {/* right part */}
            <section className='loginRight'>
                <div className='loginSection'>
                    <h2 className='loginTitle'>Welcome Back!</h2>

                    <form className="loginForm" onSubmit={handleSubmit}>
                        <div 
                        className="formField">
                            <label className="formLabel" htmlFor="email">
                                What is your email address?
                            </label>
                            <input
                            className='input'
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder=""
                            autoComplete="email"
                            />
                        </div>

                        <div className='loginForm'>
                            <label className="formLabel"htmlFor="password">Let's do a super secrete password</label>
                            <input
                            className="input"
                            id="password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder=""
                            />
                        </div>
                            <button className="loginButton" type="submit">
                            </button>
                            <p className='loginTitle'>
                        If you don't have an account.. <Link to="/register">Join us!</Link>
                    </p>
                    </form>
                </div>
            </section>
            </div>
        
        )

        }