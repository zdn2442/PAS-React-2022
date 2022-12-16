import { useState } from "react";

export default function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPass, setErrorConfirmPass] = useState("");
  const [errorStatus, setErrorStatus] = useState("");
  const [errorJenisKelamin, setErrorJenisKelamin] = useState("");
  const [payload, setPayload] = useState({
    name : "",
    email: "",
    password: "",
    status: "",
    jenisKelamin: ""
  });

  return(isLoading, setIsLoading, errorEmail, setErrorEmail, errorName, setErrorName, errorPassword, setErrorPassword, errorConfirmPass, setErrorConfirmPass, payload, setPayload, errorStatus, setErrorStatus, errorJenisKelamin, setErrorJenisKelamin)
}
