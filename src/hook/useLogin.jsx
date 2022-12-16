import { useState } from "react";

function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState({
    name : "",
    email: "",
    password: "",
    status: "",
    jenisKelamin: ""
  });
  const [errorMessage, setErrorMessage] = useState("");

  return (isLoading, setIsLoading, payload, setPayload, errorMessage, setErrorMessage)
}

export default useLogin;