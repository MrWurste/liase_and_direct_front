import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { AxiosError } from 'axios';

const Messenger = () => {
    const token = localStorage.getItem("token");
    
    const { currentUser } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);

    const emailRef = useRef<HTMLInputElement>(null);
    const messageRef = useRef<HTMLInputElement>(null);

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [emailFocus, setEmailFocus] = useState(false);
    const [messageFocus, setMessageFocus] = useState(false);

    useEffect(() => {
        if (emailRef.current) {
            emailRef.current.focus();
        }
    }, []);

    type Message = {
        id: bigint,
        message: string,
        firstname: string,
        lastname: string,
        email: string
    }

    const getMessages = async () => {
        try {
            const response = await axios.get(
                "/messenger/all",
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );
            if (messages) {
                const newMessages = [...messages];
                var count = Object.keys(response.data).length;
                for (let i = 0; i < count; i++) {
                    newMessages.push(response.data[i]);
                }
                //newMessages.push(response.data);
                setMessages(newMessages);
            }
        }
        catch { }
    };

    useEffect(() => {
        let i = false;
        if (!i) getMessages()
        return () => { i = true }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            const response = await axios.post("/messenger",
                JSON.stringify({ addressedTo: email, message }),
                {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    withCredentials: true
                });
            console.log(response.data);
        } catch (error) {
            const e = error as AxiosError;
        }
    }

    return (
        <section className="MessangerContainer">
            <h1>Messenger</h1>
            <h2>Zalogowano jako: {currentUser?.firstname} {currentUser?.lastname} ({currentUser?.email})</h2>
            <div className="RegisterFormContainer">
                <h1>Nowa wiadomość</h1>
                <form onSubmit={handleSubmit}>
                    <span>
                        <label htmlFor="email">Do: </label>
                        <input
                        type="text"
                        id="email"
                        ref={emailRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        ></input>
                    </span>
                    <span>
                        <label htmlFor="message">Treść: </label>
                        <input
                        type="text"
                        id="message"
                        ref={emailRef}
                        autoComplete="off"
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        onFocus={() => setMessageFocus(true)}
                        onBlur={() => setMessageFocus(false)}
                        ></input>
                    </span>
                    <button>Wyślij</button>
                </form>
            </div>
            <div className="List">
                <h3>Wiadomości: </h3>
                <ul>
                    {messages.map(({ id, message, firstname, lastname, email }: any) => {
                        return <li key={message}>
                            <span>Od: {firstname} {lastname} ({email})</span>
                            <p>{message}</p>
                        </li>;
                    })}
                </ul>
            </div>
        </section>
    )
}

export default Messenger;