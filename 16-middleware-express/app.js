const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();

// gunakan ejs
app.set("view engine", "ejs");

// express-ejs-layouts
app.use(expressLayouts);

// built in middleware
app.use(express.static('public'))

// aplication level middleware
app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})


app.get("/", (req, res) => {
  res.render("index", {
    nama: "micode",
    title: "Halaman Home",
    layout: 'layouts/main-layouts'
  });
});
app.get("/tentang", (req, res) => {
  // membuat data array
  const makanan = [
    {
      makan: 'bakso',
      harga: 'Rp.15.000',
    },
    {
      makan: 'soto ayam',
      harga: 'Rp.6.000',
    },
    {
      makan: 'siomay',
      harga: 'Rp.10.000',
    },
  ];
  res.render("abouts", {
    namaMakanan: makanan,
    title: "Halaman Makanan",
    layout: "layouts/main-layouts",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "Halaman About",
    layout: "layouts/main-layouts",
  });
});
app.get("/kontak", (req, res) => {
  res.render("contact", {
    title: "Halaman Contact",
    layout: "layouts/main-layouts",
  });
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
