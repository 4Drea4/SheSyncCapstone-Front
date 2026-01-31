import {useContext, useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import './Login.css';
import type { LoginForm } from '../../types';
import { AuthContext } from '../../context/AuthContext';
import { userLogin } from '../../api/users';


export default function Login () {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    if(!auth){
        return<p>We are still loading!  </p>
    }
        const {login} = auth;


    const [form,setForm] = useState<LoginForm>({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

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
        setLoading(true);

        try{
            const data = await userLogin(form.email, form.password );

            //save the user and the token with context
            login(data.user, data.token);

            //go to dashboard after user logs in
            navigate('/projects');
        } catch (err:any) {
            setError(err.response.data.message || 'Your login has failed, Give it another go');
        } finally {
            setLoading(false);
        };
    }

    return (
        <div className='splitLoginPage'>
           
           
            {/* left part */}
            <section className="loginLeft">
                <div className="loginLeftText">
                    <h1 className="loginWelcomeText">
                        So you want to <br/>
                        get in 
                        with your <em>tasks?</em>
                    </h1>
                </div>
            </section>
         