const express = require("express");

const app = express();
app.get("/", (req, res) => {
//   res.send(`<h1>Welcome</h1>`);
//   res.json({
//     nama: "micode",
//     email: "marcelino@gmail.com",
//     noHp: "0851255521",
//   });
res.sendFile('./index.html', {root: __dirname})

});
app.get("/about", (req, res) => {
  res.send(`<h1>Halaman About</h1>`);
});
app.get("/contact", (req, res) => {
  res.send(`<h1>Halaman Contact</h1>`);
});


// app.get('/product/:id', (req, res) => {
//     res.send('Product ID : ' + req.params.id)
// })
app.get('/product/:id', (req, res) => {
    res.send(`Product ID :  ${req.params.id} <br> Category: ${req.query.category}`)
})

app.use("/", (req, res) => {
  res.status(404);
  res.send(`halaman tidak ditemukan`);
});

const port = 3000;
app.listen(port, () => console.log(`running on http://localhost:${port}`));
