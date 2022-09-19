import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react'

function Home() {
  const [color, setColor] = useState("red");
  const navigate = useNavigate();

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    // 👇️ redirect to /contacts
    navigate('/contacts');
  };


  return (
    <form onSubmit={handleSubmit}>
      <a>{color}</a>
      <input />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Home;
