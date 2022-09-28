import React, { useEffect, useState } from "react";
import Router from 'next/router'
import useRequest from "../../hooks/use-request";
export default function signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [errors, setErrors] = useState([]);
const {doRequest, errors} = useRequest({
  url:'/api/users/signout',
  method:"post",
  body:{},
  onSuccess: () => Router.push('/')
})

useEffect(() => {
  doRequest();
}, [])
 
  return (
    <div className="container">Signing Out...</div>
  );
}
