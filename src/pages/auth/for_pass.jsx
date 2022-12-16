import React, {useState} from "react";
import gambar from "../../images/gambarSamping.png";
import { useNavigate } from "react-router-dom";
import Input from "../../module/input";
import Button from "../../module/button";
import { useDispatch } from "react-redux";
import { authForgotPass } from "../../reducer/action/authAction";
import Swal from "sweetalert2";

const ForPass = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [payload, setPayload] = useState({
    email: "",
  });

  // const handleClick = () => {
  //   return navigate("/for_pass_2", { replace: true });
  // }

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
    console.log('running submit');
    try {
      setIsLoading(true);
      const response = await dispatch(authForgotPass(payload));
      console.log("response", response);
      if (response?.status === "Success") {
        Swal.fire(
          'Berhasil mengirim email',
          'Silahkan cek email anda',
          'success'
        )
        // return navigate("/reset-password", { replace: true });
      } else {
        setErrorMessage(response?.response?.data?.msg);
        Swal.fire(
          'Error!',
          errorMessage,
          'error'
        )
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    console.log("running", payload);
  };

  return (
    <div>
      <div className="flex bg-slate-100">
        <div className="flex w-3/4">
          <div className="h-screen w-36 bg-gradient-to-b from-[#D6ADDC] via-[#7DB4DD] to-[#2C5DD4] rounded-br-[200px] rounded-tr-[200px] shadow-md"></div>
          {/* <p>Welcome back</p> */}
          <div className="shadow-xl rounded-md h-3/4 w-2/4 mt-20 ml-[20%] bg-white">
            <h1 className="text-[#9AB2DD] font-semibold text-4xl mt-20 ml-16">Forgot Password</h1>
            <p
              className="text-[#9AB2DD] ml-16 mt-10 w-[19rem]
            "
            >
              <p className="text-red-500">{errorMessage}</p>
              Please enter your email, we will send an url to you to reset your password
            </p>
            <form onSubmit={handleSubmit}>
              <Input className="w-96 h-14 border-2 focus:border-2 border-[#9AB2DD] focus:border-[#9AB2DD] rounded-md ml-16 mt-10 outline-none" placeholder="Email Address" type="email" name="email" onChange={handleChange} value={payload.email}/>
              <Button className="w-96 h-14 bg-gradient-to-r from-[#2C5DD4] via-[#7DB4DD] to-[#D6ADDC] rounded-md ml-16 mt-[73px] text-white font-bold" title={isLoading ? "Sending" : "Send"} />
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

export default ForPass;
