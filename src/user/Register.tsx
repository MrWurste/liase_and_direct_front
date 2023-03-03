import { useRef, useState, useEffect } from 'react';

const USER_REGEX = /^[a-z][a-z0-9-_](?=.*[@])/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%])/;

const Register = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const errorRef = useRef();

    const [email, setUser] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [matchPassword, setMatchPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, []);

    useEffect(() => {
        
    })

    return (
        <div>

        </div>
    )
}

export default Register;