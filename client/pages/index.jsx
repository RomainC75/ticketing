import React from "react";
import axios from "axios";
import buildClient from "../api/build-client";

const HomePage = ({ currentUser }) => {
  console.log(currentUser);
  

  return <div>
    <h1>Landing Page</h1>
    {currentUser ? 
      <div>Connected as {currentUser.email}</div>
    :
    <div>Not connected</div>}
  </div>;
};

HomePage.getInitialProps = async ({ req }) => {
  const client = buildClient({ req });
  const { data } = await client.get("/api/users/currentuser");
  return data;
};

export default HomePage;
