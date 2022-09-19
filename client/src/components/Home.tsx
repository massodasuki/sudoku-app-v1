import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

import { useForm } from "./userForm";

const axios = require('axios').default;

function Home() {
  // defining the initial state for the form
  const initialState = {
    page: ""
  };

  const navigate = useNavigate();
  const navigateToHome = () => {
    // 👇️ navigate to /contacts
    axios.get(`http://localhost:3000/api/sudoku/book/1`)
      .then((res: { data: any; }) => {
        alert('A name was submitted: ' + JSON.stringify(res.data));
        const data = res.data;
        let boards = []
        for (var i = 0; i < data.sudoku.length; i++) {
          boards.push(data.sudoku[i].puzzle)
        }
        for (var i = 0; i < data.sudoku.length; i++) {
          boards.push(data.sudoku[i].answer)
        }
        const sudoku = boards

        // const responsed = true;
        // this.setState({sudoku, responsed});
        // navigate('/topics', state: {});
        navigate('/topics', { state: { data: sudoku } })

      })

  };

  // getting the event handlers from our custom hook
  const { onChange, onSubmit, values } = useForm(
    loginUserCallback,
    initialState
  );

  // a submit function that will execute upon form submission
  async function loginUserCallback() {
    navigateToHome();
    // send "values" to database
  }

  return (
    // don't mind this ugly form :P
    <form onSubmit={onSubmit}>
      <div>
        <input
          name='page'
          id='page'
          onChange={onChange}
          required
        />

        <button type='submit'>Login</button>
      </div>
    </form>
  );
}

export default Home;
