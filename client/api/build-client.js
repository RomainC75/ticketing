import axios from "axios";

// build axios instances depending on where the request comes from (server/client)
// execute on the SERVER most of the time
// !execute on the CLIENT when navigating from one page to another !!
const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    //from the server
    console.log("-> from server")
    return axios.create({
      baseURL:
        // trying to get the data from another namespace inside K8's
        // !format : SERVICENAME.NAMESPACE.svc.cluster.local
        // not http'S'
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      // for ingress-nginx
      // let him know, we are trying to reach this domain name
      // cf the host of ingress-srv.yaml
      headers: req.headers,
    });
  } else {
    //from the client
    console.log("-> from client")
    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;
