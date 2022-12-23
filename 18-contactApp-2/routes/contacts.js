const fs = require("fs");

// membuat folder data jika belum ada = bikin                        I
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}
// membuat file contacts.json jika belum ada = bikin
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

// ambil semua data kontak di json
const loadContact = () => {
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

// cari kontak berdasarkan data nama
const findContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
  return contact;
};

// menuliskan data tambah kontak / menimpa file contacts.json dengan data baru
const saveKontaks = (kontaks) => {
  fs.writeFileSync('data/contacts.json', JSON.stringify(kontaks))
}

// menambahkan data kontak baru
const addKontak = (kontak) => {
  const kontaks = loadContact()
  kontaks.push(kontak)
  saveKontaks(kontaks)
}

// cek nama yang sudah ada validasi
const cekDuplikat = (nama) => {
  const contacts = loadContact()
  return contacts.find((contact) => contact.nama === nama)
}

module.exports = { loadContact, findContact, addKontak, cekDuplikat };
