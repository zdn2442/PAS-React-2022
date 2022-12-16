import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack, BiSearchAlt } from "react-icons/bi";
import Input from "../module/input";
import { HiShoppingCart } from "react-icons/hi";
import { CardCart } from "../module/card";
import { getKeranjang, hapusKeranjang, postBuyProcess, ubahItem } from "../api/produk";
import ReactLoading from "react-loading";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Button from "../module/button";

export default function Cart() {
  const author = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const convertRupiah = require("rupiah-format");
  const navigate = useNavigate();
  const [total, setTotal] = useState()
  const [payload, setPayload] = useState({
    id: "",
    jumlah: "",
  });
  const [load, setLoad] = useState({
    data: "",
  });
  const [listKeranjang, setListKeranjang] = useState([]);
  const [fetchProduct, setFetchProduct] = React.useState(false);
  const [totalSum, setTotalSum] = useState([]);

  const tambahItem = async (id, jumlah) => {
    try {
      getListKeranjang()
      const response = await dispatch(ubahItem(total));
      setTotal({
        id: id,
        jumlah: jumlah,
      });
    } catch (error) {}
  };
  const handleChange = async (e) => {
    setPayload((payload) => {
      return {
        ...payload,
        [e.target.name]: e.target.value,
      };
    });
  };
  // const handleBeli = async () => {
  //   try {
  //     setFetchProduct(true);
  //     const response = await postBeli(load);
  //     console.log("Beli =>", response);
  //     getListKeranjang();
  //     if (response.status === 201) {
  //       const Toast = Swal.mixin({
  //         toast: true,
  //         position: "top-end",
  //         showConfirmButton: false,
  //         timer: 3000,
  //         timerProgressBar: true,
  //         didOpen: (toast) => {
  //           toast.addEventListener("mouseenter", Swal.stopTimer);
  //           toast.addEventListener("mouseleave", Swal.resumeTimer);
  //         },
  //       });

  //       Toast.fire({
  //         icon: "success",
  //         title: response.data.msg,
  //       });
  //     }
  //   } catch (err) {
  //   } finally {
  //     setFetchProduct(false);
  //   }
  // };

  const buyNow = async () => {
    console.log("Udah di set", payload);
    try {
      console.log("Jalan Buy");
      const response = await dispatch(postBuyProcess(payload));
      console.log("RES", response);
      getListKeranjang();
      return;
    } catch (error) {}
    getListKeranjang();
  };

  const deleteProduct = async (id) => {
    // e.preventDefault();
    try {
      const response = await hapusKeranjang(id);
      console.log(response);
      getListKeranjang();
    } catch (error) {
    } finally {
    }
  };
  const getListKeranjang = async () => {
    try {
      setFetchProduct(true);
      const response = await getKeranjang();
      console.log("keranjang =>", response.data.data);
      setListKeranjang(response.data.data);
      setLoad(response.data);
    } catch (err) {
    } finally {
      setFetchProduct(false);
    }
  };

  const handleClick = () => {
    return navigate("/dashoard")
  }

  let array = listKeranjang.map((value) => value?.produk?.harga);
  const hasil = array.reduce((total, currentValue) => total + currentValue, 0);
  console.log("hasil =>", hasil);
  useEffect(() => {
    getListKeranjang();
  }, []);

  return (
    <React.Fragment>
      <div>
        <div className="w-screen h-20 bg-gradient-to-r from-[#D6ADDC] via-[#7DB4DD] to-[#2C5DD4] flex justify-between fixed">
          <div className="flex space-x-28">
            <div className="h-14 w-36 ml-5 my-3 bg-slate-500 "></div>
            <div className="flex">
              <Input className="w-96 h-11 bg-slate-300 my-4 rounded-md p-5" placeholder="Search" />
              <BiSearchAlt className="w-9 h-9 text-white my-5" />
            </div>
          </div>
          <div className="flex">
            <HiShoppingCart className="w-[30px] h-[30px] mr-10 my-5 text-white cursor-pointer" />
            <div>
              <div className="h-12 w-12 rounded-full mt-3 mr-8 bg-slate-400"></div>
              <p className="-pl-[10px] mr-7 text-xs text-white text-center">{author.name}</p>
            </div>
          </div>
        </div>
        <div className="h-20"></div>
        <div className="mx-36 px-[43px] mt-10">
          <div className="rounded-full w-8 h-8 shadow-lg bg-slate-200 text-sm text-center p-[9px] cursor-pointer" onClick={handleClick}>
            <BiArrowBack/>
          </div>
          {/* <CardCart/> */}
          {listKeranjang.length == 0 ? (
            <div className="w-full text-center mt-24">
              <h1 className="font-bold text-3xl">Tidak Ada Barang di keranjang</h1>
            </div>
          ) : (
            // {fetchProduct  (
            //   // <div className="flex justify-center items-center">
            //   //   <ReactLoading type={"spin"} color={"skyblue"} height={100} width={100} className="" />
            //   // </div>
            // ) : (
              listKeranjang.map((item, index) => {
                let converter = require("rupiah-format");
                let harga = item?.produk?.harga;
                let hargaConvert = converter.convert(harga);
                let gambar = item?.produk?.gambarProduk;
                const gambarConvert = JSON.parse(gambar);
                return (
                  <CardCart
                    key={index}
                    namaProduk={item.namaProduk}
                    gambar={gambarConvert[0].gambar1}
                    hargaSatuan={hargaConvert}
                    // onClickHapus={deleteProduct(item.id)}
                    hargaTotal={convertRupiah.convert(total)}
                    onClickTambah={() => {
                      console.log("tambah");
                      tambahItem(item.id, item.jumlah + 1);
                    }}
                    onClickKurang={() => {
                      console.log("tambah");
                      tambahItem(item.id, item.jumlah - 1);
                    }}
                    jumlah={item.jumlah}
                  />
                );
              })
            )}
            <div>
              <div className="w-[100%] h-px bg-slate-400 mt-5"></div>
              <div className="w-[100%] h-20 flex justify-between">
                <p>{hasil}</p>
                <Button title={"Beli"} className="w-36 h-8 bg-[#7DB4DD] rounded-md text-white" onClick={buyNow}/>
              </div>
            </div>
        </div>
      </div>
    </React.Fragment>
  );
}
