import React from "react";
import axios from "axios";



const Home = ({ currentUser }) => {
  console.log(currentUser);
  // axios.get('/api/users/currentuser').catch((err) => {
  //   console.log(err.message);
  // });

  return <h1>Landing Page</h1>;
};

// execute on the SERVER most of the time
// !execute on the CLIENT when navigating from one page to another !!
Home.getInitialProps = async ({req}) => {
  // console.log("-> req : ", req.headers)
  if (typeof window === "undefined") {
    // we are in the server
    const { data } = await axios.get(
      // trying to get the data from another namespace inside K8's
      // !format : SERVICENAME.NAMESPACE.svc.cluster.local
      // not http'S'
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: {
          // for ingress-nginx
          // let him know, we are trying to reach this domain name
          // cf the host of ingress-srv.yaml
          Host: "ticketing.dev",
        },
      }
    );
    console.log("-> data : ", data)
    return data;
  } else {
    // we are in the browser
    const { data } = await axios.get("/api/users/currentuser");
  }

  // const response = await axios.get('/api/users/currentuser');
  // return response.data;
  console.log("++++++++++++++");
  return {};
};

export default Home;
