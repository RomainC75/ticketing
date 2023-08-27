import axios from "axios";
import { useState } from "react";

const config = {
    headers: {
        "content-type": "application/json"
    },
    withCredentials: true
};

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body, config);
      console.log("--> no error ? ", response)
      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      console.log("-> errors : ", err);
      setErrors(
        <div className="alert alert-danger">
          <h4>Oups...</h4>
          <ul className="my-0">
            {err.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return [doRequest, errors];
};

export default useRequest;
