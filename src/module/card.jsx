import React from "react";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";

export function Card({ gambar, namaProduk, harga, deskripsi, rating, stok }) {
    let navigate = useNavigate()

    // const handleClickDetail = () => {
    //     return navigate("/dashboard/detail/:uuid", {replace:true})
    // }

  return (
    <React.Fragment>
      <div className="hover:rotate-1 cursor-pointer">
        <div className="w-56 h-64 py-5 border-4 rounded-t-md border-[#9AB2DD] shadow-inherit">
          <img src={gambar} alt="gambar produk" />
        </div>
        <div className="w-56 h-36 shadow-xl z-10 rounded-b-md">
          <div className="flex justify-between">
            <p className="ml-2 text-base text-ellipsis overflow-hidden h-12">{namaProduk}</p>
            <p className="mr-2 font-semibold text-sm">{harga}</p>
          </div>
          <div>
            <p className="overflow-hidden h-12 mt-3 text-xs ml-2">{deskripsi}</p>
            <div className="ml-2 flex justify-between ">
            <div className="w-[50%] flex items-center">
            <ReactStars 
                count={5} 
                value={rating}
                size={15} 
                activeColor="#ffd700"
                isHalf={true}
                edit={false}
            />
            <p className="text-xs ml-1">{rating}</p>
            </div>
            <p className="text-xs mr-2 mt-1">Stok {stok}</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export function CardCart({gambar, namaProduk, hargaSatuan, hargaTotal, jumlah, onClickTambah, onClickHapus, onClickKurang}) {
  return (
    <div className="h-36 w-[100%] border-4 border-[#7DB4DD] rounded-xl flex items-center space-x-16 mt-5">
      <img src={gambar} alt="gambar produk" className="bg-slate-200 w-48 h-[136px] rounded-lg"/>
      <h1>{namaProduk}</h1>
      <p>{hargaSatuan}</p>
      <div className="w-10 h-10 bg-gradient-to-l from-[#D6ADDC] via-[#7DB4DD] to-[#2C5DD4] text-white text-center py-[6px] rounded-md cursor-pointer" onClick={onClickTambah}>+</div>
      <p>{jumlah}</p>
      <div className="w-10 h-10 bg-gradient-to-l from-[#D6ADDC] via-[#7DB4DD] to-[#2C5DD4] text-white text-center py-[6px] rounded-md cursor-pointer" onClick={onClickKurang}>-</div>
      <p>{hargaTotal}</p>
      <div className="border-2 border-red-500 text-red-500 w-10 h-10 text-center px-[10px] py-2 rounded-md cursor-pointer hover:bg-red-500 hover:text-white" onClick={onClickHapus}><MdDeleteForever/></div>
    </div>
  )
}