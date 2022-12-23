const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { loadContact, findContact, addKontak, cekDuplikat } = require("./routes/contacts");
const { body, validationResult, check } = require('express-validator');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const connectFlash = require('connect-flash')



const app = express();

// gunakan ejs
app.set("view engine", "ejs");

//built-in static middleware
app.use(express.static('public'))

// express-ejs-layouts
app.use(expressLayouts);

// pharsing untuk tambah data
app.use(express.urlencoded({extended:true}))



// konfigurasi flash
app.use(cookieParser('secret'))
app.use(session({
  cookie: {maxAge: 6000},
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))
// kasih middleware utk flash
app.use(connectFlash())



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
    msg: req.flash('message'),
  });
});

// halaman from tambah data kontak
app.get('/kontak/add', (req, res) => {
  res.render('add-kontak', {
    title: 'form tambah data kontak',
    layout: 'layouts/main-layouts',
  })
})

// proses kirim data kontak
app.post('/kontak', 
body('nama').custom((value) => {
  const duplikat = cekDuplikat(value)
  if(duplikat) {
    throw new Error('Nama kontak sudah ada')
  }
  return true
}),
check('email', 'email tidak valid').isEmail(), 
check('nohp', 'nomor hp tidak valid').isMobilePhone('id-ID'), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(400).json({ errors: errors.array() });
    res.render('add-kontak.ejs', {
      title: "form tambah data kontak",
      layout:'layouts/main-layouts',
      errors: errors.array()
    })
  } else {
    addKontak(req.body)
    // kirimkan flash message
    req.flash('message', 'Data Kontak Berhasil Ditambahkan')
    res.redirect('/kontak')
  }
})

// halaman detail kontak
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
