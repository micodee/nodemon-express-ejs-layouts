const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { loadContact, findContact } = require("./routes/contacts");



const app = express();

// gunakan ejs
app.set("view engine", "ejs");

//built-in static middleware
app.use(express.static('public'))

// express-ejs-layouts
app.use(expressLayouts);


app.get("/", (req, res) => {
  res.render("index", {
    nama: "micode",
    title: "Halaman Home",
    layout: 'layouts/main-layouts'
  });
});
app.get("/food", (req, res) => {
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
  res.render("food", {
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
  const contacts = loadContact()
  // console.log(contacts)


  res.render("contact", {
    title: "Halaman Contact",
    layout: "layouts/main-layouts",
    kontak : contacts,
    
  });
});
app.get("/kontak/:nama", (req, res) => {
  const kontak = findContact(req.params.nama)
//   // console.log(contacts)


  res.render("detail", {
    title: "Halaman Detail Contact",
    layout: "layouts/main-layouts",
    kontak,
    
  });
  });

app.use("/", (req, res) => {
  res.status(404);
  res.send(`halaman tidak ditemukan`);
});

const port = 3000;
app.listen(port, () => console.log(`running on http://localhost:${port}`));
