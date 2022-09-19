import React, { useState } from "react";
import  { useNavigate } from 'react-router-dom'

import { useForm } from "./userForm";

function Login() {
    const navigate = useNavigate();

    const navigateToHome = () => {
      // 👇️ navigate to /contacts

      navigate('/topics');
    };
    // defining the initial state for the form
    const initialState = {
        email: "",
        password: "",
    };

    // getting the event handlers from our custom hook
    const { onChange, onSubmit, values } = useForm(
        loginUserCallback,
        initialState
    );

    // a submit function that will execute upon form submission
    async function loginUserCallback() {
      navigateToHome();
      alert("test");
        // send "values" to database
    }

    return (
        // don't mind this ugly form :P
        <form onSubmit={onSubmit}>
        <div>
            <input
                name='email'
                id='email'
                type='email'
                placeholder='Email'
                onChange={onChange}
                required
                />

            <input
                name='password'
                id='password'
                type='password'
                placeholder='Password'
                onChange={onChange}
                required
                />
            <button type='submit'>Login</button>
        </div>
        </form>
    );
}

export default Login;
