import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
// import { resolveEnvPrefix } from 'vite';

const Form = () => {
    const [userName, setUsername] = useState('');
    const [usernameValid, setUsernameValid] = useState(false);
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [pswd, setPswd] = useState('');
    const [pswdValid, setPswdValid] = useState(false);
    const [matchPswd, setMatchpswd] = useState('');
    const [matchPswdValid, setMatchPswdValid] = useState(false);


    // useRef to target the 'name' input
    const nameRef = useRef(null);

    // Regex patterns for name, email and password 
    const isValidUsername = /^[0-9A-Za-z]{6,24}$/;
    const isValidPassword = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/;
    const isValidEmail = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

    // Run useEffect to focus on username input on first render
    useEffect(() => {
        // console.log(nameRef.current);
        nameRef.current.focus();
    }, []);

    // Run useEffect to check for validity of userName when there is a change in username input value
    useEffect(() => {
        const result = isValidUsername.test(userName);
        setUsernameValid(result);
    }, [userName]);

    // Run useEffect to check for validity of email when there is a change in email input value
    useEffect(() => {
        const result = isValidEmail.test(email);
        setEmailValid(result);
    }, [email]);

    // Run useEffect to check for validity of 'password' nad 'check Password' when there is a change in either 'password' or 'check Password' input value
    useEffect(() => {
        const result = isValidPassword.test(pswd);
        setPswdValid(result);
        const isPswdMatched = matchPswd === pswd && ((pswd !== "") && (matchPswd !== ""));
        setMatchPswdValid(isPswdMatched);
    }, [pswd, matchPswd]);


    const handleSubmission = async e => {
        e.preventDefault();
        try {
            if(usernameValid && emailValid && pswdValid && matchPswdValid) {
                const details = {id: Math.floor(Math.random() * 4590), userName, email, password: pswd};
                const response = await fetch('https://react-form-validation-database.onrender.com/usersDetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(details)
            });
            if(!response.ok) {
                throw new Error(`${response.status} Error: ${response.statusText}.`);
            } else {
                const data = await response.json();
                console.log(data);
                alert('Registered Successfully');
                setUsername('');
                setEmail('');
                setPswd('');
                setMatchpswd('');
            }                                             
            }
        } catch (error) {
            console.error(error.message);
            alert(error.message);
        }
    } 


  return (
    <main className="container">
        <h1 className="title">Register</h1>
        <form className="w-[90%] my-[20px] mx-auto p-[10px]">
          <div>
            <label className="form-label" htmlFor="name">Username: 
            {/* If the length of 'username' field is not empty and its validity is true, show the Check icon */}
            <span className={userName && (usernameValid === true) ? 'visible' : 'hidden'}><FontAwesomeIcon icon={faCheck} /></span>
            {/* If the length of 'username' field is not empty and its validity is false, show the Exclamation icon */}
            <span className={userName && (usernameValid === false) ? 'visible' : 'hidden'}><FontAwesomeIcon icon={faCircleExclamation} /></span>
            </label>
            <input ref={nameRef} value={userName} onChange={e => setUsername(e.target.value)} className="form-input" placeholder='Tell us your name...' type="text" required />
            {/* For the info paragraph to be displayed, the 'username' input field must not be empty and its validity must be false */}
            {(userName && (usernameValid === false)) && <p className="info">
                At least 2 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
                </p>}
          </div>
          <div>
            <label className="form-label" htmlFor="email">Email: 
            {/* If the length of 'email' field is not empty and its validity is true, show the Check icon */}
            <span className={email && (emailValid === true) ? 'visible' : 'hidden'}><FontAwesomeIcon icon={faCheck} /></span>
            {/* If the length of 'email' field is not empty and its validity is false, show the Exclamation icon */}
            <span className={email && (emailValid === false) ? 'visible' : 'hidden'}><FontAwesomeIcon icon={faCircleExclamation} /></span>
            </label>
            <input value={email} onChange={e => setEmail(e.target.value)} className="form-input" placeholder='Drop your email address here...' type="email" name="email" id="email" required />
            {/* For the info paragraph to be displayed, the 'email' input field must not be empty and its validity must be false */}
            {(email && (emailValid === false)) && <p className="info">
                8 to 32 characters.<br />
                Must include uppercase and lowercase letters, a number and a special character.<br />
                Allowed special characters: @, #, $, %, _, -.
                </p>}
          </div>
          <div>
            <label className="form-label" htmlFor="password">Password: 
            {/* If the length of 'Password' field is not empty and its validity is true, show the Check icon */}
            <span className={pswd && (pswdValid === true) ? 'visible' : 'hidden'}><FontAwesomeIcon icon={faCheck} /></span>
            {/* If the length of 'Password' field is not empty and its validity is false, show the Exclamation icon */}
            <span className={pswd && (pswdValid === false) ? 'visible' : 'hidden'}><FontAwesomeIcon icon={faCircleExclamation} /></span>
            </label>
            <input value={pswd} onChange={e => setPswd(e.target.value)} type="password" name="password" id="password" className="form-input" required />
            {/* For the info paragraph to be displayed, the 'password' input field must not be empty and its validity must be false */}
            {(pswd && (pswdValid === false)) && <p className="info">
                8 to 32 characters.<br />
                Must include uppercase and lowercase letters, a number and a special character.<br />
                Allowed special characters: @, #, $, %.
                </p>}
          </div>
          <div>
            <label className="form-label" htmlFor="match-password">Confirm Password: 
            {/* If the length of 'Confirm Password' field is not empty and its validity is true, show the Check icon */}
            <span className={matchPswd && (matchPswdValid === true) ? 'visible' : 'hidden'}><FontAwesomeIcon icon={faCheck} /></span>
            {/* If the length of 'Confirm Password' field is not empty and its validity is false, show the Exclamation icon */}
            <span className={matchPswd && (matchPswdValid === false) ? 'visible' : 'hidden'}><FontAwesomeIcon icon={faCircleExclamation} /></span>
            </label>
            <input value={matchPswd} onChange={e => setMatchpswd(e.target.value)} type="password" name="match-password" id="match-password" className="form-input" required />
            {/* For the info paragraph to be displayed, the 'Check Password' input field must not be empty and its validity must be false */}
            {matchPswd && (matchPswdValid === false) && <p className="info">Password does not match</p>}
          </div>
          <button onClick={handleSubmission} className="form-button" type='button'>SEND</button>
        </form>
        <footer>
                <p className="text-[0.85rem] text-black text-center font-light animate-slideInFooter tab:text-[1rem] pc:text-[1rem]">&copy;2024 Copyright | Designed by <a className="text-green-400 font-bold" href="http://omotoshoelisha@gmail.com">Omotosho E. Oluwasina</a>.</p>
        </footer>
    </main>
  )
}

export default Form