import React from "react";
import { useState, useEffect } from "react";
import { HiShoppingCart } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailProduct, postBuyProcess, postKaranjang } from "../api/produk";
import { BiArrowBack, BiSearchAlt } from "react-icons/bi";
import Input from "../module/input";
import ReactStars from "react-rating-stars-component";
import Button from "../module/button";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function Detail() {
  let converter = require("rupiah-format")
  let navigate = useNavigate()
  let { uuid } = useParams();
  const author = useSelector((state) => state.auth);
  const [gambar, setGambar] = useState("");
  const [detail, setDetail] = useState([]);
  const [fetchProduct, setFetchProduct] = useState(false)
  const [payload, setPayload] = useState({
    produkId: ""
  });
  const [load, setLoad] = useState({
    data: [
      {
        id: "",
        produkId: "",
        jumlah: 1,
        userId: 4,
        createdAt: "2022-12-09T02:30:57.000Z",
        updatedAt: "2022-12-09T02:30:57.000Z",
      },
    ],
  });
  

  const handleClick = () => {
    return navigate("/dashboard", {replace:true})
  }

  const handleBeli = async () => {
    try {
      const response = await postBuyProcess(load);
      console.log("Beli =>", response);
         if (response.data.msg === "Transaksi Berhasil") {
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
             title: response.data.msg,
           });
         }
    } catch (err) {
    } finally {
    }
  };

  const handleKeranjang = async () => {
    try {
      setFetchProduct(true);
      const response = await postKaranjang(payload);
      console.log("tambah keranjang =>", response);
      if (response.data.status === "Success") {
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
          title: "Berhasil ditambah",
        });
      }
    } catch (err) {
    } finally {
      setFetchProduct(false);
    }
  };

  const detailProduk = async () => {
    try {
      const response = await getDetailProduct(uuid);
      console.log("response => ", response);
      const dataDetail = response.data.data;
      console.log(dataDetail);
      setPayload({ produkId: response.data.data.id });
      setLoad({
        data: [
          {
            id: response.data.data.id,
            produkId: response.data.data.id,
            jumlah: 1,
            userId: 4,
            createdAt: "2022-12-09T02:30:57.000Z",
            updatedAt: "2022-12-09T02:30:57.000Z",
          },
        ],
      });
      const json = response.data.data.gambarProduk;
      const obj = JSON.parse(json);
      setGambar(obj[0].gambar1);
      setDetail(response.data.data);
      // const harga = detail.harga;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    detailProduk();
  }, []);

  return (
    <React.Fragment>
      <div>
        <div className="w-screen h-20 bg-gradient-to-r from-[#D6ADDC] via-[#7DB4DD] to-[#2C5DD4] flex justify-between">
          <div className="flex space-x-28">
            <div className="h-14 w-36 ml-5 my-3 bg-slate-500 "></div>
            <div className="flex">
              <Input className="w-96 h-11 bg-slate-300 my-4 rounded-md p-5" placeholder="Search" />
              <BiSearchAlt className="w-9 h-9 text-white my-5" />
            </div>
          </div>
          <div className="flex">
            <HiShoppingCart className="w-[30px] h-[30px] mr-10 my-5 text-white cursor-pointer" onClick={handleClick}/>
            <div>
              <div className="h-12 w-12 rounded-full mt-3 mr-8 bg-slate-400"></div>
              <p className="-pl-[10px] mr-7 text-xs text-white text-center">{author.name}</p>
            </div>
          </div>
        </div>
        <div className="flex">
        <div className="rounded-full w-8 h-8 shadow-lg bg-slate-200 text-sm text-center p-[9px] cursor-pointer" onClick={handleClick}>
            <BiArrowBack/>
          </div>
          <img src={gambar} alt="gambar produk" className="w-[35%] h-[450px] border-4 border-[#7DB4DD] rounded-md mt-16 ml-16" />
          <div className="h-96 w-[50%] my-16 bg-gradient-to-l from-[#d6addcb5] via-[#7db4ddb2] to-[#2c5cd49c] ml-16 rounded-lg text-cyan-50 p-6">
            <h1 className=" text-lg">{detail?.namaProduk}</h1>
            <div className=" mt-5 ">
              <div className="flex">
                <ReactStars count={5} value={detail?.rating} size={25} activeColor="#ffd700" isHalf={true} edit={false} />
                <p className="my-2 ml-2">{detail?.rating}</p>
              </div>
              <p>{converter.convert(detail?.harga)}</p>
            </div>
            <p className=" mt-5 bg-white rounded-md text-[#7DB4DD] p-2">{detail.deskripsi}</p>
            <p className=" mt-6 font-bold">Stok {detail?.stok}</p>
          </div>
        </div>
        <div className="h-24 w-[500px] ml-[50%] flex justify-between">
          <Button title={"Beli"} className="w-36 h-8 bg-[#7DB4DD] rounded-md text-white" onClick={handleBeli}/>
          <Button title={"Keranjang"} className="w-36 h-8 border-2 border-[#7DB4DD] rounded-md text-[#7DB4DD]" onClick={handleKeranjang}/>
        </div>
      </div>
    </React.Fragment>
  );
}
