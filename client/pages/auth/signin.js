import React, { useState } from "react";
import Router from 'next/router'
import useRequest from "../../hooks/use-request";


export default function SigIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [errors, setErrors] = useState([]);
const {doRequest, errors} = useRequest({
  url:'/api/users/signin',
  method:"post",
  body:{
    email,password
  },
  onSuccess: () => Router.push('/')
})
  const submitForm = async (e) => {
    e.preventDefault();
    await doRequest(); 
  };
  return (
    <div className="container">
      <form onSubmit={submitForm}>
        <h1>Sign In form</h1>
        <div className="form-group">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
          />
        </div>
        <button className="btn btn-primary mt-2">Sign In</button>
          
          {errors}
      </form>
    </div>
  );
}
