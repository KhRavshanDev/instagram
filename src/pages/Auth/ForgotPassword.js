import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { LOGIN, SIGN_UP } from '../../constants/routes';
import logo from "./lock.png"
import "./style.css"

const ForgotPassword = () => {
    const [ email, setEmail ] = useState('');
    const [ error, setError ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Password reset email sent!");
        })
        .catch((error) => {
            setError(`${error.code} ${error.message}`)
        });
    }

    const isInvalid = email.trim() === '';

    useEffect(() => {
        document.title = "Forgot Password - Instagram";
    }, [])

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col">
                <div className="p-4 bg-white border border-gray-primary mb-4 w-80 rounded" style={{height: "32rem", width: "23rem"}}>
                    <div className="flex justify-center align-center mb-5">
                        <img src={logo} alt='logo' style={{maxWidth: "70%"}}/>
                    </div>

                    <div className="instagram-font text-2xl text-center mb-8">
                        Troubled logging in?
                    </div>

                    <div className="text-sm text-center text-gray-400 mb-8">
                        Enter your email and we'll send you a link to get back into your account.
                    </div>
                    { error && <p className="mb-4 text-xs text-red-500">{error}</p> }
                    <form onSubmit={handleSubmit} className="" method="post">
                        <div>
                            <input
                                type="text"
                                aria-label="Enter your email address"
                                placeholder="Email address"
                                className="text-sm text-gray-base w-full py-5 px-4 h-2 border
                                border-gray-primary rounded mb-5"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <button
                                disabled={isInvalid}
                                type="submit"
                                className={
                                    `bg-blue-500 cursor-pointer text-white rounded w-full h-8 mb-8 font-bold ${isInvalid && "opacity-50"}`
                                }
                            >
                                Reset Password
                            </button>
                        </div>
                    </form>

                    <div className='flex justify-center flex-column items-center'>
                        <div className='flex flex-row'>
                                <div class="text-sm text-gray-400 mb-4">OR</div>
                        </div>

                    </div>

                        <div className='flex justify-center items-center'>
                            <Link to={SIGN_UP} className="text-sm font-semibold text-blue-900 text-center w-full p-4">
                                Create new account
                            </Link>
                        </div>

                </div>
                <div className="rounded flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
                    <p className="text-sm">Back to{` `}
                        <Link to={LOGIN} className="font-bold text-blue-inst">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
