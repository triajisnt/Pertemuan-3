// Fungsi untuk menampilkan promo
function tampilkanPromo() {
    let hari = new Date().getDay();
    let promo = "";
    if(hari === 0 || hari === 6) {
        promo = "diskon 25% untuk semua level pedas";
    } else {
        promo = "beli 3 gratis 1 untuk seblak level 5!";
    }
    document.getElementById("promoMessage").innerHTML = promo;
}

// Daftar Menu Seblak
let menuFavorit = [
    {nama: "Seblak Kerupuk", harga: 15000, diskon: false, gambar: "img/kerupuk.jpg"},
    {nama: "Seblak Ceker", harga: 10000, diskon: true, gambar: "img/ceker.jpg"}, // Diskon 25%
    {nama: "Seblak Kikil", harga: 20000, diskon: false, gambar: "img/kikil.jpg"},
    {nama: "Seblak Bakso", harga: 11000, diskon: true, gambar: "img/bakso.jpg"}   // Diskon 25%
];

// Fungsi untuk menampilkan menu Favorit
function tampilkanMenu() {
    let listMenu = document.getElementById("listMenu");
    let pilihMenu = document.getElementById("pilihMenu");
    // Menghapus list dan dropdown sebelumnya
    listMenu.innerHTML = "";
    pilihMenu.innerHTML = "";

    // Menampilkan menu ke dalam list/dropdown
    menuFavorit.forEach(function(item, index) {
        // Membuat elemen list baru
        let li = document.createElement("li");
        let img = document.createElement("img");
        img.src = item.gambar;
        img.alt = item.nama;

        // Set teks dan gambar ke dalam <li>
        li.textContent = `${item.nama} - Rp ${item.harga}`;
        li.prepend(img); 
        listMenu.appendChild(li);

        // Menambahkan ke dropdown pilihan menu
        let option = document.createElement("option");
        option.value = index;
        option.textContent = item.nama;
        pilihMenu.appendChild(option);
    });
}


//fungsi untuk memeriksa jumlah pesanan 
function cekPesanan() {
    let menuIndex = document.getElementById("pilihMenu").value;
    let jumlah = document.getElementById("inputJumlah").value;
    let hasil = '';
    let total = 0;

    //validasi jumlah pesanan
    if (jumlah > 20) {
        Swal.fire({
            icon: 'error',
            title: 'Pesanan Terlalu Banyak!',
            text: 'Maksimal 20 porsi.',
            confirmButtonText: 'OK'
        });
        } else if (jumlah >= 1 && jumlah <= 20) {
        let menuPilihan = menuFavorit[menuIndex];
        let hargaPerItem = menuPilihan.harga;

        //cekm apakah menu memiliki diskon
        if(menuPilihan.diskon){
            hargaPerItem *=0.75; //25%
        }
        total = hargaPerItem * jumlah;
        totalHargaSetelahDiskon = total; // Simpan total harga setelah diskon untuk perhitungan kembalian
        hasil = `Pesanan Anda sebanyak ${jumlah} porsi ${menuPilihan.nama} telah diterima!`;
        document.getElementById("totalBayar").innerHTML = `Total yang harus dibayar: Rp ${total}`;
        Swal.fire({
            icon: 'success',
            title: 'Pesanan Berhasil!',
            text: `Anda memesan ${jumlah} porsi ${menuPilihan.nama}. Total yang harus dibayar adalah Rp ${total}.`,
            confirmButtonText: 'OK'
        });
        } else {
        hasil = "Silakan masukkan jumlah pesanan yang valid.";
        document.getElementById("totalBayar").innerHTML = '';
        }
        document.getElementById("hasilPesanan").innerHTML = hasil;
    }
// Fungsi untuk menghitung kembalian
function hitungKembalian() {
    let uangBayar = document.getElementById("uangBayar").value;
    let kembalian = uangBayar - totalHargaSetelahDiskon;

    if (kembalian < 0) {
        Swal.fire({
            icon: 'error',
            title: 'Uang Kurang',
            text: 'Uang yang Anda masukkan tidak cukup untuk membayar pesanan.',
            confirmButtonText: 'Coba Lagi'
        });
    } else {
        Swal.fire({
            icon: 'success',
            title: 'Pembayaran Berhasil',
            text: `Kembalian Anda adalah Rp ${kembalian}`,
            confirmButtonText: 'OK'
        });
    }
}
