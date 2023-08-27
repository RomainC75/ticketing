import React, { useState } from "react";
import Router from 'next/router';
import useRequest from "../../hooks/useRequest";
 

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ doRequest, errors ] = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: ()=> Router.push('/')
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    doRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <div>Signin</div>
      <div className="form-group">
        <label htmlFor="">Email</label>
        <input
          value={email}
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="">Password</label>
        <input
          value={password}
          type="password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {errors}

      <button type="submit" className="btn btn-primary">
        Signin
      </button>
    </form>
  );
};

export default Signin;
