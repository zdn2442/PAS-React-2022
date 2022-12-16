import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getProduk } from "../api/produk";
import { Card } from "../module/card";
import ReactLoading from "react-loading";
import { HiShoppingCart } from "react-icons/hi";
import { BiSearchAlt } from "react-icons/bi";
import Input from "../module/input";
import Select from "../module/select";
import { useNavigate } from "react-router-dom";
import Button from "../module/button";

export default function Dashboard() {
  // let [status, setStatus] = React.useState(false);
  const author = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [listProduct, setListProduct] = React.useState([]);
  const [payload, setPayload] = React.useState({
    kategori: "",
    keyword: "",
    hargaTerendah: "",
    hargaTertinggi: "",
  });
  const [fetchProduct, setFetchProduct] = React.useState(false);

  const handleClick = () => {
    return navigate("/keranjang", {replace:true})
  }

  const handleChange = (e) => {
    setPayload((payload) => {
      return {
        ...payload,
        [e.target.name]: e.target.value,
      };
    });
  };

  const getHandleProduk = async (e) => {
    // e.preventDefault()
    try {
      setFetchProduct(true);
      const response = await getProduk(payload.kategori, payload.keyword, payload.hargaTerendah, payload.hargaTertinggi);
      console.log("response =>", response);
      console.log("product =>", response.data.data.rows);
      setListProduct(response.data.data.rows);
      // setPayload(response.data.data.rows)
    } catch (err) {
      console.log("err =>", err);
    } finally {
      setFetchProduct(false);
    }
  };


  React.useEffect(() => {
    getHandleProduk();
  }, [payload.kategori, payload.keyword, payload.hargaTerendah, payload.hargaTertinggi]);

  // const GambarProduk = JSON.parse(listProduct)
  console.log("listProduct =>", listProduct);
  console.log("payload =>", payload);

  return (
    <React.Fragment>
      <div>
        <div className="w-screen h-20 bg-gradient-to-r from-[#D6ADDC] via-[#7DB4DD] to-[#2C5DD4] flex justify-between fixed z-10">
          <div className="flex space-x-28">
            <div className="h-14 w-36 ml-5 my-3 bg-slate-500 "></div>
            <div className="flex">
              <Input
                name="keyword"
                className="w-96 h-11 bg-slate-300 my-4 rounded-md p-5"
                placeholder="Search"
                value={payload.keyword}
                onChange={handleChange}
              />
              <BiSearchAlt
                className="w-9 h-9 text-white my-5"
              />
            </div>
          </div>
          <div className="flex">
            <HiShoppingCart className="w-[30px] h-[30px] mr-10 my-8 text-white cursor-pointer" onClick={handleClick}/>
            <div>
            <div className="h-12 w-12 rounded-full mt-3 mr-8 bg-slate-400"></div>
            <p className="-pl-2 mr-7 text-xs text-white text-center">{author.name}</p>
            </div>
          </div>
        </div>
        <div className="h-20"></div>
        <div className="flex justify-between ">
          <div className="m-10 grid grid-cols-4 space-y-3 space-x-5 ">
            {fetchProduct ? (
              <div className="flex justify-center items-center w-screen">
                <ReactLoading type={"spin"} color={"skyblue"} height={100} width={100} className="" />
              </div>
            ) : (
              listProduct.map((item, index) => {
                let converter = require("rupiah-format");
                let harga = item.harga;
                let hargaConvert = converter.convert(harga);
                let gambar = item.gambarProduk;
                const gambarConvert = JSON.parse(gambar);
                return (
                  <button onClick={() => {
                    return navigate(`/dashboard/detail/${item.uuid}`, {replace:true})
                  }}>
                     <Card key={index} namaProduk={item.namaProduk} gambar={gambarConvert[0].gambar1} harga={hargaConvert} deskripsi={item.deskripsi} rating={item.rating} stok={item.stok}/>
                  </button>
                )
              })
            )}
            {/* <button onClick={getHandleProduk}>tombol</button> */}
          </div>
          <div className="w-[20%] h-96 border-4 border-[#9AB2DD] rounded-b-lg fixed ml-[80%]">
            <div className="w-36 h-10 bg-gradient-to-l from-[#D6ADDC] via-[#7DB4DD] to-[#2C5DD4] rounded-md mx-24 mt-10 text-center py-2">
              <p className="text-white font-bold text-md">Filter</p>
              <Select
                className="w-36 h-10 border-2 rounded-md border-[#9AB2DD] text-[#7DB4DD] mt-6"
                value={payload.kategori}
                onChange={handleChange}
                name="kategori"
              >
                <option value={''}>Kategori</option>
                <option value="handphone">handphone</option>
                <option value="mobil">mobil</option>
                <option value="motor">motor</option>
                <option value="sepatu">sepatu</option>
                <option value="tas">tas</option>
                <option value="televisi">televisi</option>
              </Select>
              <Input
                type="number"
                className="w-36 h-10 border-2 rounded-md border-[#9AB2DD] text-[#7DB4DD] mt-6"
                value={payload.hargaTertinggi}
                onChange={handleChange}
                name="hargaTertinggi"
                placeholder="Harga Tertinggi"
              />
              <Input
                type="number"
                className="w-36 h-10 border-2 rounded-md border-[#9AB2DD] text-[#7DB4DD] mt-6"
                value={payload.hargaTerendah}
                onChange={handleChange}
                name="hargaTerendah"
                placeholder="Harga Terendah"
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
