$(document).ready(function() {

  // === Fungsi untuk menampilkan data dari localStorage ===
  function loadData() {
    const data = JSON.parse(localStorage.getItem("skincareList")) || [];
    const list = $("#daftarSkincare");
    list.empty();

    if (data.length === 0) {
      list.append("<li>Belum ada produk skincare.</li>");
    } else {
      data.forEach((item, index) => {
        list.append(`
          <li>
            <span><strong>${item.nama}</strong> - Stok: ${item.stok}</span>
            <button class="delete-btn" data-index="${index}">Hapus</button>
          </li>
        `);
      });
    }
  }

  // === Fungsi untuk menyimpan ke localStorage ===
  function saveData(data) {
    localStorage.setItem("skincareList", JSON.stringify(data));
  }

  // === Tambah Produk ===
  $("#tambahBtn").click(function() {
    const nama = $("#namaSkincare").val().trim();
    const stok = $("#stokSkincare").val().trim();

    if (nama === "" || stok === "") {
      alert("Nama dan stok produk wajib diisi!");
      return;
    }

    const produkBaru = { nama: nama, stok: parseInt(stok) };
    let data = JSON.parse(localStorage.getItem("skincareList")) || [];
    data.push(produkBaru);
    saveData(data);

    $("#namaSkincare").val("");
    $("#stokSkincare").val("");
    loadData();
  });

  // === Hapus Produk ===
  $("#daftarSkincare").on("click", ".delete-btn", function() {
    const index = $(this).data("index");
    let data = JSON.parse(localStorage.getItem("skincareList")) || [];

    data.splice(index, 1);
    saveData(data);
    loadData();
  });

  // === Tampilkan data saat halaman dibuka ===
  loadData();
});
