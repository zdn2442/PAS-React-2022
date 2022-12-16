import React, { useState } from "react";
import gambar from "../../images/gambarSamping.png";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../module/input";
import Button from "../../module/button";
import { useDispatch } from "react-redux";
import { authResPass } from "../../reducer/action/authAction";

const CreateNewPass = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const { id, token } = useParams();

  const [errorBaru, setErrorBaru] = useState("")
  const [errorConfirm, setErrorConfirm] = useState("")
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [payload, setPayload] = useState({
    passwordBaru: "",
    confirmPassword: ""
  });

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
    console.log("running submit");
    try {
      setIsLoading(true);
      const response = await dispatch(authResPass(id, token, payload));
      console.log("response", response);
      if (response?.status === "Success") {
        return navigate("/dashboard", { replace: true });
      } else {
        setErrorMessage(response?.response?.data?.msg);
      }
      if (payload.passwordBaru === "" || payload.passwordBaru < 8) {
        setErrorBaru("wajib diisi dan tidak boleh kurang dari 8")
      } if (payload.confirmPassword === "" || payload.confirmPassword < 8 || payload.confirmPassword !== payload.passwordBaru) {
        setErrorConfirm("wajib diisi dan harus sama")
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    console.log("running", payload);
  };

  // const handleClick = () => {
  //   return navigate("/login", { replace: true });
  // }

  return (
    <div>
      <div className="flex bg-slate-100">
        <div className="flex w-3/4">
          <div className="h-screen w-36 bg-gradient-to-b from-[#D6ADDC] via-[#7DB4DD] to-[#2C5DD4] rounded-br-[200px] rounded-tr-[200px] shadow-md"></div>
          {/* <p>Welcome back</p> */}
          <div className="shadow-xl rounded-md h-3/4 w-2/4 mt-20 ml-[20%] bg-white">
            <h1 className="text-[#9AB2DD] font-semibold text-4xl mt-20 ml-16">Create New Password</h1>

            <form onSubmit={handleSubmit}>
              <Input className="w-96 h-14 border-2 focus:border-2 border-[#9AB2DD] focus:border-[#9AB2DD] rounded-md ml-16 mt-20 outline-none" placeholder="Create new password" type="password" onChange={handleChange} name="passwordBaru" value={payload.passwordBaru}/>
              <p
                className="text-[#9AB2DD] ml-16 w-[19rem] text-xs
            "
              >
                password must have numbers and sign
              </p>
              <Input className="w-96 h-14 border-2 focus:border-2 border-[#9AB2DD] focus:border-[#9AB2DD] rounded-md ml-16 mt-5 outline-none" placeholder="Confirm password" type="password" name="confirmPassword" onChange={handleChange} value={payload.confirmPassword}/>
              <p
                className="text-[#9AB2DD] ml-16 w-[19rem] text-xs
            "
              >
                password must match
              </p>

              <Button className="w-96 h-14 bg-gradient-to-r from-[#2C5DD4] via-[#7DB4DD] to-[#D6ADDC] rounded-md ml-16 mt-[73px] text-white font-bold" title={isLoading ? "Changing" : "Change"} />
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

export default CreateNewPass;
