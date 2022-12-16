import React from "react";
import gambar from "../../images/gambarSamping.png";
import gambar1 from "../../images/google.png";
import gambar2 from "../../images/facebook.png";
import gambar3 from "../../images/vk.png";
import { useNavigate } from "react-router-dom";
import Input from "../../module/input";
import Select from "../../module/select";
import Button from "../../module/button";
// import useRegister from "../../hook/useRegister";
import { useDispatch } from "react-redux";
import { authRegister } from "../../reducer/action/authAction";
import { useState } from "react";
import Swal from "sweetalert2";

const Register = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  // const { isLoading, setIsLoading, errorEmail, setErrorEmail, errorName, setErrorName, errorPassword, setErrorPassword, errorConfirmPass, setErrorConfirmPass, payload, setPayload, errorStatus, setErrorStatus, errorJenisKelamin, setErrorJenisKelamin } = useRegister();
  const [isLoading, setIsLoading] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPass, setErrorConfirmPass] = useState("");
  const [errorStatus, setErrorStatus] = useState("");
  const [errorJenisKelamin, setErrorJenisKelamin] = useState("");
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
    status: "",
    jenisKelamin: "",
  });

  const handleClick = () => {
    return navigate("/login", { replace: true });
  };

  const [errorMessage, setErrorMessage] = React.useState("");
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
      const response = await dispatch(authRegister(payload));
      console.log("response", response);
      if (response?.status === "Success") {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Berhasil Register",
        });
        return navigate("/login", { replace: true });
      } else {
        setErrorConfirmPass("Password tidak sama")
        setErrorMessage(response?.response?.data?.msg);
        setErrorEmail(response?.response?.data?.errors?.email?.msg);
        setErrorName(response?.response?.data?.errors?.name?.msg);
        setErrorPassword(response?.response?.data?.errors?.password?.msg);
        setErrorStatus(response?.response?.data?.errors?.status?.msg);
        setErrorJenisKelamin(response?.response?.data?.errors?.jenisKelamin?.msg);
        Swal.fire("Error!", "Gagal Register", "error");
      }
    } catch (error) {
      console.log(error);
      // console.log(errorJenisKelamin);
    } finally {
      setIsLoading(false);
    }
    console.log("running", payload);
  };

  return (
    <div>
      <div className="flex bg-slate-100">
        <div className="flex w-3/4">
          <div className="h-screen w-36 bg-gradient-to-b from-[#D6ADDC] via-[#7DB4DD] to-[#2C5DD4] rounded-br-[200px] rounded-tr-[200px] shadow-md">
            <p className="mx-10 text-white mt-40 font-medium cursor-pointer" onClick={handleClick}>
              Sign In
            </p>
            <div className="bg-[#4975D6] mt-10 text-center h-14 w-44 py-4 rounded-tr-md rounded-br-md ">
              <p className="text-white font-semibold text-lg">Sign Up</p>
            </div>
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
            <h1 className="text-[#9AB2DD] font-semibold text-4xl mt-20 ml-16">Register</h1>
            <form onSubmit={handleSubmit}>
              {" "}
              <div className="">
                <Input className="w-48 h-14 border-2 border-[#9AB2DD] rounded-md ml-16 mt-20 p-5" placeholder="Username" type="name" onChange={handleChange} name="name" />
                <Input className="w-48 h-14 border-2 border-[#9AB2DD] rounded-md ml-5 mt-20 p-5" placeholder="Email Address" type="email" onChange={handleChange} name="email" />
              </div>{" "}
              <div className="flex">
                <Input className="w-48 h-14 border-2 border-[#9AB2DD] rounded-md ml-16 mt-5 p-5" placeholder="Confirm Password" type="password" onChange={handleChange} name="password" />
                <Input className="w-48 h-14 border-2 border-[#9AB2DD] rounded-md ml-5 mt-5 p-5" placeholder="Password" type="password" onChange={handleChange} name="password" />
              </div>
              <div className="flex">
                <Select className="w-48 h-14 border-2 border-[#9AB2DD] rounded-md ml-16 mt-5 p-5" placeholder="Status" onChange={handleChange} name="status">
                  <option>Status</option>
                  <option value="active">Active</option>
                  <option value="nonactive">NonActive</option>
                </Select>
                <Select className="w-48 h-14 border-2 border-[#9AB2DD] rounded-md ml-5 mt-5 p-5" placeholder="Gender" onChange={handleChange} name="jenisKelamin">
                  <option>Gender</option>
                  <option typeof="enum" value="laki-laki">
                    laki-laki
                  </option>
                  <option typeof="enum" value="perempuan">
                    perempuan
                  </option>
                </Select>
              </div>
              <Button className="w-3/4 h-14 bg-gradient-to-r from-[#2C5DD4] via-[#7DB4DD] to-[#D6ADDC] rounded-md ml-16 mt-10 text-white font-bold" title={isLoading ? "Signed Up" : "Register"} />
            </form>
          </div>
          <div className="fixed ml-[39%] mt-28 bg-red-50 rounded-md">
            <p className="text-red-500">{errorMessage}</p>
            <p className="text-red-500">{errorName}</p>
            <p className="text-red-500">{errorEmail}</p>
            <p className="text-red-500">{errorPassword}</p>
            <p className="text-red-500">{errorStatus}</p>
            <p className="text-red-500">{errorJenisKelamin}</p>
            <p className="text-red-500">{errorConfirmPass}</p>
          </div>
        </div>
        <div className="h-screen  w-1/3 d">
          <img src={gambar} alt="" className="h-[100%] w-[200%] shadow-md" />
        </div>
      </div>
    </div>
  );
};

export default Register;
