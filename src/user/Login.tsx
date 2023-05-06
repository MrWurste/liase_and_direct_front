import { useRef, useState, useEffect } from "react";
import '../css/LRForm.css';
import axios from "../api/axios";
import { AxiosError } from "axios";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const { userModifier } = useAuth();
    const { currentUser } = useAuth();

    const [success, setSuccess] = useState(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const errorRef = useRef<HTMLInputElement>(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const LOGIN_URL = "/auth/authenticate"

    useEffect(() => {
        if (emailRef.current) {
            emailRef.current.focus();
        }
    }, []);

    useEffect(() => {
        setErrorMessage("");
    }, [email, password]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const accessToken = response?.data?.token;
            const roles = response?.data?.roles;
            localStorage.setItem("token", accessToken);
            userModifier ({email, roles, accessToken, firstname: "", lastname: ""})
            setEmail("");
            setPassword("");
            setSuccess(true);
            console.log(response.data);
        } catch (error) {
            const e = error as AxiosError;
            if (!e?.response) {
                setErrorMessage('Brak odpowiedzi serwera');
            } else if (e.response?.status === 401) {
                setErrorMessage('Brak dostępu');
            } else if (e.response?.status === 403) {
                setErrorMessage('Błędne dane');
            } else {
                setErrorMessage('Logowanie nieudane')
            }
            errorRef.current?.focus();
        }
    }
    return (
        <>
            {success ? (
                <section className='RegisterFormContainer'>
                    <h1>Zalogowano</h1>
                    <p>jako</p>
                    <p>{currentUser?.email}</p>
                    
                    <p><a href={"/"}>Strona główna</a></p>
                </section>
            ) : (
                <section className='RegisterFormContainer'>
                    <p ref={errorRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive">{errorMessage}</p>
                    <h1>Logowanie</h1>
                    <form onSubmit={handleSubmit}>
                        <span>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="text"
                                id="email"
                                ref={emailRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            ></input>
                        </span>
                        <span>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            ></input>
                        </span>
                        <button>Zaloguj się</button>
                    </form>
                    <p> Nie masz konta? Załóż je <a id="registerLink" href="/register">tutaj</a>.</p>
                </section>
            )}
        </>
    )
}

export default Login;