import axios from "./base_url";

export async function getProduk(kategori, keyword, hargaTerendah, hargaTertinggi) {
  return axios.get(`/produk/list?kategori=${kategori}&page=1&pageSize=100&keyword=${keyword}&hargaTerendah=${hargaTerendah}&hargaTertinggi=${hargaTertinggi}`);
}

export async function getDetailProduct(uuid) {
  return axios.get(`/produk/detail/${uuid}`);
}

export async function getKeranjang() {
  return axios.get(`/keranjang`);
}

export async function postKaranjang(payload) {
  return axios.post(`/keranjang/tambah`, payload);
}

export async function hapusKeranjang(id) {
  return axios.delete(`/keranjang/hapus/${id}`);
}

export async function postBuyProcess(payload) {
  return axios.post(`/beli/tambah`, payload);
}

export async function ubahItem(id, jumlah) {
  return axios.put(`/keranjang/ubah-jumlah-item`, id, jumlah);
}
export async function getHistory() {
  return axios.get(`/beli/history`);
}
