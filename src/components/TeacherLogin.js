import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import Navbar from "./Navbar";

function TeacherLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);
    // Add code here to handle form submission
    const data = await fetch("http://localhost:8000/teacher/login",
      {method:"POST" ,
       headers:{
        "content-type":"application/json"
       } ,
    body:JSON.stringify({teacherId:username , password:password})});

    const res = await data.json();
    console.log(res);
    if (res.status === 201) {
        alert('login successfull');
        setUsername('');
        setPassword('')
        history('/dashboard');
    }
  };

  

  return (
    <>
    <Navbar />
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Teacher Login</h1>
        <label htmlFor="username">Teacher Id:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
    </>
  );
}

export default TeacherLogin;
