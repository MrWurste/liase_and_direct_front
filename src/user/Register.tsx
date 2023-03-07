import { useRef, useState, useEffect } from 'react';
import '../css/LRForm.css';
import axios from '../api/axios';
import { Axios, AxiosError } from 'axios';

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%])/;

const REGISTER_URL = '/auth/register'

const Register = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const firstnameRef = useRef<HTMLInputElement>(null);
    const lastnameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const matchPasswordRef = useRef<HTMLInputElement>(null);
    const errorRef = useRef<HTMLParagraphElement>(null);

    const [email, setEmail] = useState("");
    const [emailFocus, setEmailFocus] = useState(false);
    const [validEmail, setValidEmail] = useState(false);

    const [fnameFocus, setFirstnameFocus] = useState(false);
    const [firstname, setFirstname] = useState("");

    const [lnameFocus, setLastnameFocus] = useState(false);
    const [lastname, setLastname] = useState("");

    const [passwordFocus, setPasswordFocus] = useState(false);
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);

    const [matchPassword, setMatchPassword] = useState("")
    const [matchPassFocus, setMatchPasswordFocus] = useState(false);
    const [validMatch, setValidMatch] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (emailRef.current) {
            emailRef.current.focus();
        }
    }, []);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
        console.log(validEmail);
    }, [email]);

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidMatch(password === matchPassword);
        console.log(validPassword + " - " + validMatch);
    }, [password, matchPassword]);

    useEffect(() => {
        setErrorMessage('');
    }, [email, password, matchPassword]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const val1 = EMAIL_REGEX.test(email);
        const val2 = PASSWORD_REGEX.test(password);
        if (!val1 || !val2) {
            setErrorMessage("Niepoprawne dane")
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ email, firstname, lastname, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
            console.log(response.data);
            //TODO handle token, save somewere, idn...
            setSuccess(true);
            //TODO set fields to default
        } catch (error) {
            const e = error as AxiosError;
            if (!e?.response) {
                setErrorMessage('Brak odpowiedzi serwera');
            } else if (e.response?.status === 401) {
                setErrorMessage('Brak dostępu');
            } else {
                setErrorMessage('Rejestracja nieudana')
            }
            errorRef.current?.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Zarejestrowano</h1>
                    <p>Tutaj będzie link do logowania</p>
                </section>
            ) : (
                <section className='RegisterFormContainer'>
                    <p ref={errorRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive">{errorMessage}</p>
                    <h1>Rejestracja</h1>
                    <form onSubmit={handleSubmit}>
                        <span>
                            <label htmlFor='email'>E-mail: </label>
                            <input
                                type="text"
                                id="email"
                                ref={emailRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describeby="uidnote"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                            />
                            <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                Must contain '@'
                            </p>
                        </span>
                        <span>
                            <label htmlFor='firstname'>Imię: </label>
                            <input
                                type="text"
                                id="firstname"
                                ref={firstnameRef}
                                autoComplete="off"
                                onChange={(e) => setFirstname(e.target.value)}
                                required
                                onFocus={() => setFirstnameFocus(true)}
                                onBlur={() => setFirstnameFocus(false)}
                            />
                        </span>
                        <span>
                            <label htmlFor='lastname'>Nazwisko: </label>
                            <input
                                type="text"
                                id="lastname"
                                ref={lastnameRef}
                                autoComplete="off"
                                onChange={(e) => setLastname(e.target.value)}
                                required
                                onFocus={() => setLastnameFocus(true)}
                                onBlur={() => setLastnameFocus(false)}
                            />
                        </span>
                        <span>
                            <label htmlFor='password'>Hasło: </label>
                            <input
                                type="password"
                                id="password"
                                ref={passwordRef}
                                autoComplete="off"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                aria-invalid={validPassword ? "false" : "true"}
                                aria-describeby="pwdnote"
                                onFocus={() => setPasswordFocus(true)}
                                onBlur={() => setPasswordFocus(false)}
                            />
                            <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                                Must contain '@'
                            </p>
                        </span>
                        <span>
                            <label htmlFor='matchPassword'>Potwierdź hasło: </label>
                            <input
                                type="password"
                                id="matchPassword"
                                ref={matchPasswordRef}
                                autoComplete="off"
                                onChange={(e) => setMatchPassword(e.target.value)}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describeby="mpwdnote"
                                onFocus={() => setMatchPasswordFocus(true)}
                                onBlur={() => setMatchPasswordFocus(false)}
                            />
                            <p id="mpwdnote" className={matchPassFocus && !validMatch ? "instructions" : "offscreen"}>
                                Must contain '@'
                            </p>
                        </span>
                        <button disabled={!validEmail || !validPassword || !validMatch || !firstname || !lastname ? true : false}>Zarejestruj się</button>
                    </form>
                </section>
            )}
        </>
    )
}

export default Register;