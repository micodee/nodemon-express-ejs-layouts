const express = require("express");
const app = express();

// gunakan ejs
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", {
    nama : 'micode',
    title : 'Halaman Home',
  });
});
app.get("/tentang", (req, res) => {
  // membuat data array
  const makanan = [
    // {
    //   makan: 'bakso',
    //   harga: 'Rp.15.000',
    // },
    // {
    //   makan: 'soto ayam',
    //   harga: 'Rp.6.000',
    // },
    // {
    //   makan: 'siomay',
    //   harga: 'Rp.10.000',
    // },
  ]
  res.render("abouts", {
    namaMakanan : makanan,
  });
});
app.get("/about", (req, res) => {
  res.render("about", {title : 'Halaman About'});
});
app.get("/kontak", (req, res) => {
  res.render("contact", {title : 'Halaman Contact'});
});

app.get("/product/:id", (req, res) => {
  res.send(
    `Product ID :  ${req.params.id} <br> Category: ${req.query.category}`
  );
});

app.use("/", (req, res) => {
  res.status(404);
  res.send(`halaman tidak ditemukan`);
});

const port = 3000;
app.listen(port, () => console.log(`running on http://localhost:${port}`));
