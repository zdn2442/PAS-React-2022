import React, {useState} from "react";
import gambar from "../../images/gambarSamping.png";
import gambar1 from "../../images/google.png";
import gambar2 from "../../images/facebook.png";
import gambar3 from "../../images/vk.png";
import { useNavigate } from "react-router-dom";
import Input from "../../module/input";
import Button from "../../module/button";
import { useDispatch } from "react-redux";
// import useLogin from "../../hook/useLogin";
import { authLogin } from "../../reducer/action/authAction";
import Swal from 'sweetalert2'

const Login = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  // const { isLoading, setIsLoading, payload, setPayload, errorMessage, setErrorMessage } = useLogin();
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState({
    name : "",
    email: "",
    password: "",
    status: "",
    jenisKelamin: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [errorEmail, setErrorEmail] = useState("")
  const [errorPassword, setErrorPassword] = useState("")

  const handleClickRegister = () => {
    return navigate("/register", { replace: true });
  };
  const handleClickForPass = () => {
    return navigate("/lupa-password", { replace: true });
  };

  const handleChange = (e) => {
    setPayload((payload) => {
      return {
        ...payload,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await dispatch(authLogin(payload));
      console.log("response", response);
      if (response?.status === "Success") {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Berhasil Login'
        })
        return navigate("/dashboard", { replace: true });
      } else {
        setErrorMessage(response?.response?.data?.msg);
        Swal.fire(
          'Error!',
          errorMessage,
          'error'
        )
      }
      if (payload.password === "") {
        setErrorPassword("Password wajib diisi")
      } else if (payload.password.length < 8) {
        setErrorEmail("Password harus 8 karakter")
      } if (payload.email === "") {
        setErrorEmail("Email wajib diisi")
      } 
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    setPayload(() => {
      return {
        name: "",
        email: "",
        password: "",
        status: "",
        jenisKelamin: "",
      };
    });
    console.log("running", payload);
  };

  return (
    <div>
      <div className="flex bg-slate-100">
        <div className="flex w-3/4">
          <div className="h-screen w-36 bg-gradient-to-b from-[#D6ADDC] via-[#7DB4DD] to-[#2C5DD4] rounded-br-[200px] rounded-tr-[200px] shadow-md">
            <div className="bg-[#4975D6] mt-40 text-center h-14 w-44 py-4 rounded-tr-md rounded-br-md ">
              <p className="text-white font-semibold text-lg">Sign In</p>
            </div>
            <p className="mx-10 text-white mt-10 font-medium cursor-pointer" onClick={handleClickRegister}>
              Sign Up
            </p>
            <div className="h-12 w-12 border-2 rounded-full mx-10 mt-10 p-[9px] cursor-pointer">
              <img src={gambar1} alt="" className="h-6 w-6" />
            </div>
            <div className="h-12 w-12 border-2 rounded-full mx-10 mt-10 p-[9px] cursor-pointer">
              <img src={gambar2} alt="" className="h-6 w-6" />
            </div>
            <div className="h-12 w-12 border-2 rounded-full mx-10 mt-10 p-[9px] cursor-pointer">
              <img src={gambar3} alt="" className="h-6 w-6" />
            </div>
          </div>
          {/* <p>Welcome back</p> */}
          <div className="shadow-xl rounded-md h-3/4 w-2/4 mt-20 ml-[20%] bg-white">
            <h1 className="text-[#9AB2DD] font-semibold text-4xl mt-20 ml-16">Login</h1>
            <div className="h-16 w-5"></div>
            <form onSubmit={handleSubmit}>
              <p className="text-red-500 mb-5 ml-16">{errorMessage}</p>
              <Input 
                className="w-96 h-14 border-2 focus:border-2 border-[#9AB2DD] focus:border-[#9AB2DD] rounded-md ml-16 outline-none p-5" 
                placeholder="Email Address" 
                type="email" 
                name="email" 
                onChange={handleChange} 
                value={payload.email}
              />
              <p className="text-red-500 ml-16">{errorEmail}</p>
              <Input 
                className="w-96 h-14 border-2 focus:border-2 border-[#9AB2DD] focus:border-[#9AB2DD] rounded-md ml-16 mt-5 outline-none p-5" 
                placeholder="Password" 
                type="password" 
                name="password" 
                onChange={handleChange} 
                value={payload.password}
              />
              <p className="text-red-500 ml-16">{errorPassword}</p>
              <p className="ml-[61%] cursor-pointer underline text-[#9AB2DD] mt-5" onClick={handleClickForPass}>
                Forgot Passsword
              </p>
              <Button className="w-96 h-14 bg-gradient-to-r from-[#2C5DD4] via-[#7DB4DD] to-[#D6ADDC] rounded-md ml-16 mt-[73px] text-white font-bold" title={isLoading ? 'Signed In' : 'Login'} />
            </form>
          </div>
        </div>
        <div className="h-screen  w-1/3 d">
          <img src={gambar} alt="" className="h-[100%] w-[200%] shadow-md" />
        </div>
      </div>
    </div>
  );
};

export default Login;
